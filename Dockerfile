# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:18-alpine 
ARG http_proxy
ARG https_proxy
ARG no_proxy
# Set the working directory to /app inside the container
WORKDIR /canel2-front
# Copy app files
COPY . .
# ==== BUILD =====
RUN npm config set http-proxy ${http_proxy}
RUN npm config set https-proxy ${https_proxy}
RUN npm config set noproxy ${no_proxy}
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "build" ]
