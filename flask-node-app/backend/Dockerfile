# dockerfile for backend
# Use a lightweight Python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt /app
RUN pip install -r requirements.txt

# Copy the rest of the application
COPY . /app

# # Expose Flask port
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
