FROM node:20-bullseye

RUN apt-get update && apt-get install -y poppler-utils && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]