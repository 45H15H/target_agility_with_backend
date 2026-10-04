"""Database configuration and SQLAlchemy session management.

Uses SQLite for local development by default and supports a ``DATABASE_URL``
environment variable for production (e.g. a managed Postgres instance on Render).
"""

import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Local SQLite fallback used when no DATABASE_URL is provided.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./dev_database.db")

# Render (and some other providers) expose Postgres URLs with the legacy
# "postgres://" scheme, which SQLAlchemy no longer recognises. Normalise it.
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# SQLite needs check_same_thread disabled when used across FastAPI's threads.
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI dependency that yields a database session and closes it afterwards."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
