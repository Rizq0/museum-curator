FROM node:23-slim
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
EXPOSE 9090
CMD ["npm", "run", "dev:no-seed"]

