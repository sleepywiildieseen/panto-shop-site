from django.urls import path
from . import auth, views

urlpatterns = [
    path("auth/register", auth.RegisterView.as_view()),
    path("auth/login", auth.LoginView.as_view()),
    path("products", views.ProductListView.as_view()),
    path("products/best", views.BestProductsView.as_view()),
    path("products/<int:pk>", views.ProductDetailView.as_view()),
    path("cart", views.CartView.as_view()),
    path("cart/<int:pk>", views.CartItemView.as_view()),
    path("orders", views.OrderView.as_view()),
]