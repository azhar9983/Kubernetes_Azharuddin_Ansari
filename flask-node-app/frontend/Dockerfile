# dockerfile for frontend
# Use a lightweight Node.js base image
FROM node

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY package.json /app
RUN npm install

# Copy the rest of the application
COPY . /app

# Expose node.js/express port
EXPOSE 3000

# Run the application
CMD ["node","server.js"]