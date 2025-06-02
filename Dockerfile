# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose the port your app runs on
EXPOSE 3006

# Start the server
CMD ["node", "app.js"]
