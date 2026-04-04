FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=5000
EXPOSE 5000
# BACKEND COMMAND
CMD ["node", "server.js"]
