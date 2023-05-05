
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
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production

FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/default.conf
COPY --from=build /canel2-front/build /usr/share/nginx/html

#no root
RUN touch /var/run/nginx.pid && \
 chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

CMD ["nginx", "-g", "daemon off;"]