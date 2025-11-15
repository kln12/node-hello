FROM node:18-alpine

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Add --host to expose the server
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]