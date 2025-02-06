# Stage 1: Build the Angular app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the project files and build the app
COPY . .
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output to Nginx’s default public folder
COPY --from=build /app/dist/prrs6-frontend/browser /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the container
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]