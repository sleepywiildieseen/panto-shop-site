import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "panto.settings")
django.setup()

from shop.models import Category, Product


def run():
    Product.objects.all().delete()
    Category.objects.all().delete()

    chair = Category.objects.create(name="Chair", slug="chair")
    sofa = Category.objects.create(name="Sofa", slug="sofa")
    beds = Category.objects.create(name="Beds", slug="beds")
    lamp = Category.objects.create(name="Lamp", slug="lamp")

    products = [
        ("Sakarias Armchair", "Comfortable armchair for your living room", 392,
         "/images/chair1.jpg", 10, 4.5, True, chair),
        ("Baltsar Chair", "Modern minimalistic chair", 299,
         "/images/chair2.jpg", 8, 4.2, True, chair),
        ("Anjay Chair", "Elegant chair with premium finish", 519,
         "/images/chair3.jpg", 5, 4.8, True, chair),
        ("Nyantuy Chair", "Comfortable chair with pillows", 921,
         "/images/chair4.jpg", 3, 4.9, True, chair),
        ("Modern Sofa", "Cozy modern sofa for three", 1200,
         "/images/sofa1.jpg", 4, 4.7, True, sofa),
        ("Minimal Bed", "Minimalistic wooden bed", 800,
         "/images/bed1.jpg", 6, 4.4, False, beds),
        ("Nordic Lamp", "Nordic style table lamp", 120,
         "/images/lamp1.jpg", 20, 4.6, False, lamp),
        ("Loft Sofa", "Loft style sofa for living room", 990,
         "/images/sofa2.jpg", 2, 4.3, False, sofa),
    ]

    for title, desc, price, img, stock, rating, best, cat in products:
        Product.objects.create(
            title=title, description=desc, price=price, imageUrl=img,
            stockQuantity=stock, rating=rating, isBestSeller=best, category=cat,
        )

    print("Seed done:", Product.objects.count(), "products")


if __name__ == "__main__":
    run()