from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from django.shortcuts import get_object_or_404

from .models import Product, CartItem, Order, OrderItem
from .serializers import ProductSerializer, CartItemSerializer, OrderSerializer


class ProductListView(APIView):
    def get(self, request):
        qs = Product.objects.select_related("category").all()

        category = request.query_params.get("category")
        q = request.query_params.get("q")
        min_price = request.query_params.get("minPrice")
        max_price = request.query_params.get("maxPrice")
        sort = request.query_params.get("sort")

        if category:
            qs = qs.filter(category__slug=category)
        if q:
            qs = qs.filter(title__icontains=q)
        if min_price:
            qs = qs.filter(price__gte=float(min_price))
        if max_price:
            qs = qs.filter(price__lte=float(max_price))

        if sort == "price_asc":
            qs = qs.order_by("price")
        elif sort == "price_desc":
            qs = qs.order_by("-price")

        return Response(ProductSerializer(qs, many=True).data)


class BestProductsView(APIView):
    def get(self, request):
        qs = Product.objects.select_related("category").filter(isBestSeller=True)[:8]
        return Response(ProductSerializer(qs, many=True).data)


class ProductDetailView(APIView):
    def get(self, request, pk):
        product = get_object_or_404(Product, pk=pk)
        return Response(ProductSerializer(product).data)


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        items = CartItem.objects.select_related("product").filter(user=request.user)
        return Response(CartItemSerializer(items, many=True).data)

    def post(self, request):
        product_id = request.data.get("productId")
        quantity = int(request.data.get("quantity", 1))

        if not product_id:
            return Response({"error": "productId required"}, status=400)

        product = get_object_or_404(Product, pk=product_id)
        item, created = CartItem.objects.get_or_create(
            user=request.user,
            product=product,
            defaults={"quantity": quantity},
        )
        if not created:
            item.quantity += quantity
            item.save()

        return Response(CartItemSerializer(item).data)


class CartItemView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        item = get_object_or_404(CartItem, pk=pk, user=request.user)
        quantity = int(request.data.get("quantity", item.quantity))
        if quantity < 1:
            item.delete()
            return Response({"ok": True})
        item.quantity = quantity
        item.save()
        return Response(CartItemSerializer(item).data)

    def delete(self, request, pk):
        item = get_object_or_404(CartItem, pk=pk, user=request.user)
        item.delete()
        return Response({"ok": True})


class OrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).prefetch_related(
            "items__product__category"
        )
        return Response(OrderSerializer(orders, many=True).data)

    def post(self, request):
        address = (request.data.get("address") or "").strip()
        phone = (request.data.get("phone") or "").strip()

        if not address or not phone:
            return Response({"error": "Address and phone are required"}, status=400)

        cart = CartItem.objects.select_related("product").filter(user=request.user)
        if not cart.exists():
            return Response({"error": "Cart is empty"}, status=400)

        total = sum(item.product.price * item.quantity for item in cart)

        with transaction.atomic():
            order = Order.objects.create(
                user=request.user,
                totalPrice=total,
                address=address,
                phone=phone,
            )
            for item in cart:
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    priceAtPurchase=item.product.price,
                )
                Product.objects.filter(pk=item.product.pk).update(
                    stockQuantity=item.product.stockQuantity - item.quantity
                )
            cart.delete()

        order.refresh_from_db()
        return Response(OrderSerializer(order).data)