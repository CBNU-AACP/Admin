FROM node:14.5.0-alpine
RUN mkdir -p /usr/src/admin/server
WORKDIR /usr/src/app/admin/server
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "start"]