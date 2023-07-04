FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --omit=dev

COPY server/package*.json server/
RUN npm run install-server --omit=dev

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

ENV MONGO_URL="mongodb+srv://server:pm6VsBBoIzVuky5V@cluster0.dzoamsn.mongodb.net/Blueprint_Barbers_DB?retryWrites=true&w=majority"

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 8000