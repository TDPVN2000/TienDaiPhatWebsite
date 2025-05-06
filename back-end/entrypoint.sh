#!/bin/sh

# Wait for database to be ready
echo "Waiting for database to be ready..."
while ! nc -z db 5432; do
  sleep 1
done
echo "Database is ready!"

# Run database migrations
echo "Running database migrations..."
flask db upgrade

# Seed admin user
echo "Seeding admin user..."
python seed.py

# Start the Flask application
echo "Starting Flask application..."
flask run --host=0.0.0.0 --port=5000 
 