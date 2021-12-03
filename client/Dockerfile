FROM node:14.5.0-alpine
RUN apk add --no-cache python3 make g++
RUN mkdir -p /usr/src/app/admin/web
EXPOSE 3000:3000
WORKDIR /usr/src/app/admin/web
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]