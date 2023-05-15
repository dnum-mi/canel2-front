
# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:18-alpine as build

ARG http_proxy
ARG https_proxy
ARG npm_registry
ARG no_proxy

# Set the working directory to /canel2-front inside the container
WORKDIR /canel2-front

# use proxy & private npm registry
# With internal npm repo (autosigned) disable strict ssl : strict-ssl false
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo "Europe/Paris" > /etc/timezone ; \
    if [ ! -z "$http_proxy" ] ; then \
    npm config delete proxy; \
    npm config set proxy $http_proxy; \
    npm config set https-proxy $https_proxy ; \
    npm config set noproxy $no_proxy; \
    fi ; \
    [ -z "$npm_registry" ] || npm config set registry=$npm_registry ; \
    [ -z "$npm_registry" ] || npm config set strict-ssl false


# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm install

# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
ENV REACT_APP_API_BASE_URL ${REACT_APP_API_BASE_URL}
ENV REACT_APP_API_BASE_URL2 ${REACT_APP_API_BASE_URL2}

# Build the app
RUN npm run build


FROM bitnami/nginx:latest   

# COPY  ./nginx/nginx.conf /opt/bitnami/nginx/conf/server.conf
# COPY  --from=front /canel2-front/build /opt/bitnami/nginx/html
COPY --from=build /canel2-front/build /app
# RUN touch /var/run/nginx.pid
# RUN chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
# # RUN chgrp -R root /usr/share/nginx/html /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
# RUN    chmod -R 775 /usr/share/nginx/html /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
# USER 101
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]