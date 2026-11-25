from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    firstName = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.email or self.username


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.name


class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.FloatField()
    imageUrl = models.URLField(max_length=500)
    stockQuantity = models.IntegerField(default=0)
    rating = models.FloatField(default=0)
    isBestSeller = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.title


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="cart_items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    class Meta:
        unique_together = ("user", "product")

    def __str__(self):
        return f"{self.user_id} -> {self.product_id} x{self.quantity}"


class Order(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("shipped", "Shipped"),
        ("delivered", "Delivered"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    totalPrice = models.FloatField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    address = models.TextField()
    phone = models.CharField(max_length=30)
    createdAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-createdAt"]


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    priceAtPurchase = models.FloatField()