# BUILD FOR LOCAL DEVELOPMENT

FROM node:hydrogen-alpine3.19 AS development

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY --chown=node:node package.json .

COPY --chown=node:node yarn.lock .

RUN yarn

COPY --chown=node:node . .

USER node

# BUILD FOR PRODUCTION

FROM node:hydrogen-alpine3.19 AS build

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY --chown=node:node package.json .
COPY --chown=node:node . .

RUN yarn --prod

RUN yarn build

ENV NODE_ENV production

USER node

# PRODUCTION

FROM node:hydrogen-alpine3.19 AS production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/.env .env

CMD [ "node", "dist/main.js" ]