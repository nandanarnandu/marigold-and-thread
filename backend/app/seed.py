from app.core.database import SessionLocal
from app.models.product import Product

db = SessionLocal()

products_data = [
    {
        "name": "Vintage Slip Dress",
        "description": "A delicately restored 1970s-style slip dress in soft blush silk. One-of-a-kind, hand-finished seams.",
        "price": 2400,
        "image_url": "https://placehold.co/600x800/E8C4C4/3D3229?text=Slip+Dress",
        "category": "Dresses",
        "stock": 3,
    },
    {
        "name": "Antique Lace Blouse",
        "description": "Hand-me-down lace detailing on a breathable cotton base. Pairs beautifully with high-waisted trousers.",
        "price": 1800,
        "image_url": "https://placehold.co/600x800/C9BFA5/3D3229?text=Lace+Blouse",
        "category": "Tops",
        "stock": 5,
    },
    {
        "name": "Wide-Leg Linen Trousers",
        "description": "Airy, high-waisted linen trousers with vintage-inspired pleating. A timeless silhouette.",
        "price": 2100,
        "image_url": "https://placehold.co/600x800/FAF6F0/3D3229?text=Linen+Trousers",
        "category": "Bottoms",
        "stock": 4,
    },
    {
        "name": "Floral Midi Wrap Dress",
        "description": "A soft floral print wrap dress with a flattering vintage cut, perfect for warm afternoons.",
        "price": 2600,
        "image_url": "https://placehold.co/600x800/E8C4C4/3D3229?text=Wrap+Dress",
        "category": "Dresses",
        "stock": 2,
    },
    {
        "name": "Embroidered Denim Jacket",
        "description": "A reworked vintage denim jacket with hand-embroidered floral detailing on the back.",
        "price": 3200,
        "image_url": "https://placehold.co/600x800/8B6F5C/FAF6F0?text=Denim+Jacket",
        "category": "Outerwear",
        "stock": 2,
    },
    {
        "name": "Pearl Button Cardigan",
        "description": "A soft knit cardigan with delicate pearl buttons, sourced from an estate sale in the 1960s.",
        "price": 1900,
        "image_url": "https://placehold.co/600x800/C9BFA5/3D3229?text=Cardigan",
        "category": "Tops",
        "stock": 6,
    },
    {
        "name": "Pleated Tea-Length Skirt",
        "description": "A classic pleated skirt in dusty rose, falling gracefully at tea-length.",
        "price": 1700,
        "image_url": "https://placehold.co/600x800/E8C4C4/3D3229?text=Tea+Skirt",
        "category": "Bottoms",
        "stock": 4,
    },
    {
        "name": "Vintage Velvet Headband",
        "description": "A small, elegant velvet headband in deep terracotta — the perfect finishing touch.",
        "price": 450,
        "image_url": "https://placehold.co/600x800/8B6F5C/FAF6F0?text=Headband",
        "category": "Accessories",
        "stock": 10,
    },
    {
        "name": "Antique Gold Locket Necklace",
        "description": "A restored antique-style locket necklace, hand-polished and ready for a new story.",
        "price": 1200,
        "image_url": "https://placehold.co/600x800/C9BFA5/3D3229?text=Locket",
        "category": "Accessories",
        "stock": 5,
    },
]

for item in products_data:
    product = Product(**item)
    db.add(product)

db.commit()
db.close()

print(f"Seeded {len(products_data)} products successfully.")