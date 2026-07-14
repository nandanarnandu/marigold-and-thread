from app.core.database import SessionLocal
from app.models.user import User

db = SessionLocal()
user = db.query(User).filter(User.email == "YOUR_EMAIL_HERE").first()
if user:
    user.is_admin = True
    db.commit()
    print(f"{user.email} is now an admin.")
else:
    print("User not found.")
db.close()
