version: '3'

services:
  app:
    build: .
    ports:
      - "3000:3000"  # Expose app port 3000
    volumes:
      - .:/app       # Mount the current directory to /app inside the container
    depends_on:
      - mongo        # Ensure MongoDB starts before the app
    environment:
      - MONGODB_URL=mongodb://mongo:27017/mern  # MongoDB connection URL

  mongo:
    image: mongo
    ports:
      - "27017:27017"  # Expose MongoDB on port 27017
