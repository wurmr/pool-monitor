FROM node:lts
WORKDIR /usr/local/monitor
COPY package*.json ./
RUN npm ci
COPY * ./
RUN npm run build
EXPOSE 4000
ENTRYPOINT ["node", "dist/index.js"]
