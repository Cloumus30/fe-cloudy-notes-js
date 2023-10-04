FROM node:16-alpine as builder

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY . .

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

RUN npm run build

# nginx state for serving content
FROM nginx:1.17-alpine
# Set working directory to nginx asset directory
WORKDIR /usr/src/app

RUN apk add --no-cache bash \
    git

# Remove default nginx static assets
# RUN rm -rf ./*
COPY ./docker-compose/nginx/fe-note.conf /etc/nginx/conf.d/fe-note.conf
# Copy static assets from builder stage
COPY --from=builder /usr/src/app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]