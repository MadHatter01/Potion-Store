from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = 'sqlite:///./potions.db'

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread":False})
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Potion(Base):
    __tablename__="potions"

    id=Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Integer)
    quantity = Column(Integer)
    effect = Column(String)


Base.metadata.create_all(bind=engine)

def initialize_db():
    db = sessionLocal()
    if db.query(Potion).count() == 0:
        potions = [
            Potion(id=1, name="Healing Tonic", price=50, quantity=5, effect="Restores Health"),
            Potion(id=2, name="Turbo Force", price=150, quantity=10, effect="Grants Turbo boost"),
            Potion(id=3, name="Invisibility Shake", price=40, quantity=2, effect="Grants Invisibility Cloak"),
        ]
        db.add_all(potions)
        db.commit()
    db.close()


initialize_db()