FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev --legacy-peer-deps # Avoid installing dev dependencies.
COPY . .

CMD ["npm", "run", "dev"]
