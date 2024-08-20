ARG NODE_VERSION=20.16.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY . .

RUN yarn install

# Expose the port that the application listens on.
EXPOSE 5173

# Run the application.
CMD yarn dev
