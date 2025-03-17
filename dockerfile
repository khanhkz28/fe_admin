# Stage 1: Build React App
FROM node:22 AS builderFE
WORKDIR /app1
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Nginx để chạy React App
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builderFE /app1/dist  /usr/share/nginx/html
