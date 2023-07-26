FROM node:16-alpine

WORKDIR /user/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk add --no-cache bash \
    git

# RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY . .

# RUN npm run build

# EXPOSE ${APP_PORT}