from app.core.database import SessionLocal
from app.models.product import Product

db = SessionLocal()

products_data = [
    {
        "name": "Banarasi Silk Saree",
        "description": "A rich Banarasi silk saree with intricate zari border work, perfect for weddings and festive occasions.",
        "price": 4500,
        "image_url": "/static/products/silk-saree.jpg",
        "category": "Saree",
        "subcategory": "Silk",
        "stock": 3,
    },
    {
        "name": "Handloom Cotton Saree",
        "description": "A breathable handloom cotton saree with a simple woven border — ideal for everyday elegance.",
        "price": 1800,
        "image_url": "/static/products/cotton-saree.jpg",
        "category": "Saree",
        "subcategory": "Cotton",
        "stock": 5,
    },
    {
        "name": "Printed Churidar Set",
        "description": "A three-piece printed churidar set in soft cotton, with a matching dupatta.",
        "price": 2200,
        "image_url": "/static/products/printed-churidar.jpg",
        "category": "Churidars",
        "subcategory": "Printed",
        "stock": 4,
    },
    {
        "name": "Casual Cotton Top",
        "description": "A relaxed-fit cotton top with delicate embroidery detail at the neckline.",
        "price": 950,
        "image_url": "/static/products/casual-top.jpg",
        "category": "Tops",
        "subcategory": "Casual",
        "stock": 6,
    },
    {
        "name": "Sequin Party Top",
        "description": "A statement sequin top designed for evening occasions, with a flattering fitted silhouette.",
        "price": 1600,
        "image_url": "/static/products/party-top.jpg",
        "category": "Tops",
        "subcategory": "Party Wear",
        "stock": 3,
    },
    {
        "name": "Palazzo Pants",
        "description": "Flowy, high-waisted palazzo pants in a soft crepe fabric — comfortable and versatile.",
        "price": 1400,
        "image_url": "/static/products/palazzo-pants.jpg",
        "category": "Pants",
        "subcategory": "Palazzo",
        "stock": 5,
    },
    {
        "name": "Anarkali Kurti",
        "description": "A flowing floor-length Anarkali kurti with intricate thread embroidery on the yoke.",
        "price": 2800,
        "image_url": "/static/products/anarkali-kurti.jpg",
        "category": "Kurtis",
        "subcategory": "Anarkali",
        "stock": 3,
    },
    {
        "name": "A-Line Printed Kurti",
        "description": "A comfortable A-line kurti in a soft floral print, perfect for daily wear.",
        "price": 1300,
        "image_url": "/static/products/aline-kurti.jpg",
        "category": "Kurtis",
        "subcategory": "A-Line",
        "stock": 6,
    },
    {
        "name": "Statement Jewelry Set",
        "description": "A handcrafted necklace and earring set with antique gold finishing.",
        "price": 1100,
        "image_url": "/static/products/jewelry-set.jpg",
        "category": "Accessories",
        "subcategory": "Jewelry",
        "stock": 8,
    },
]

for item in products_data:
    product = Product(**item)
    db.add(product)

db.commit()
db.close()

print(f"Seeded {len(products_data)} products successfully.")