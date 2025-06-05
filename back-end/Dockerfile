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

# Create necessary directories with proper permissions
RUN mkdir -p /tmp/static && \
    mkdir -p /tmp/static/uploads && \
    mkdir -p /tmp/static/translations && \
    mkdir -p /tmp/static/news && \
    mkdir -p /tmp/static/introductions && \
    mkdir -p /tmp/static/capabilities && \
    mkdir -p /tmp/static/certifications && \
    mkdir -p /tmp/static/projects && \
    mkdir -p /tmp/static/investments && \
    mkdir -p /tmp/static/fields && \
    mkdir -p /tmp/static/products && \
    mkdir -p /tmp/static/recruitments && \
    chmod -R 777 /tmp/static

# Set permissions for entrypoint script
RUN chmod +x /app/entrypoint.sh

# Create a non-root user
RUN useradd -m -u 1000 appuser && \
    chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Run the application
CMD ["/app/entrypoint.sh"]
