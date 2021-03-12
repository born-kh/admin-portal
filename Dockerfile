FROM node as builder

WORKDIR /app
COPY package.json .
RUN npm install
RUN npm update
COPY . .
RUN npm run build


FROM node:alpine
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 80
CMD ["serve", "-p", "80", "-s", "."]
