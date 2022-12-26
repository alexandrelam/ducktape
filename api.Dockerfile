FROM node:18-alpine3.15

WORKDIR /usr/src/app

# Configure pnpm
RUN npm install -g pnpm
RUN pnpm config set auto-install-peers true

COPY ./pnpm-workspace.yaml .
COPY ./package.json .
COPY ./pnpm-lock.yaml .
COPY ./packages/api ./packages/api
COPY ./packages/models ./packages/models

RUN pnpm install

EXPOSE 8825 

CMD ["pnpm", "dev:back"]
