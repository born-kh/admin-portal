FROM node:11-alpine as builder

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn run build

FROM node:11-alpine
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 80
CMD ["serve", "-p", "80", "-s", "."]
