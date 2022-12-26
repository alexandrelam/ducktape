FROM node:18-alpine3.15

WORKDIR /usr/src/app

# Configure pnpm
RUN npm install -g pnpm
RUN pnpm config set auto-install-peers true

COPY ./pnpm-workspace.yaml .
COPY ./package.json .
COPY ./pnpm-lock.yaml .
COPY ./packages/web/package.json ./packages/web/package.json
COPY ./packages/web ./packages/web
COPY ./packages/models ./packages/models

RUN pnpm install

RUN pnpm build:front

EXPOSE 8197

CMD ["pnpm", "start:front"]

