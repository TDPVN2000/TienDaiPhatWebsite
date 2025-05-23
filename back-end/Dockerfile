FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Create necessary directories
RUN mkdir -p /app/static/uploads
RUN mkdir -p /app/static/translations

# Set permissions for entrypoint script
RUN chmod +x /app/entrypoint.sh

# Set permissions for the app directory
RUN chown -R www-data:www-data /app
USER www-data

# Run the application
CMD ["/app/entrypoint.sh"]
