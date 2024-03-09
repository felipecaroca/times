# BUILD

FROM node:hydrogen-alpine3.19 AS build

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .

RUN yarn

COPY --chown=node:node . .

RUN yarn build

USER node

#PRODUCTION

FROM node:hydrogen-alpine3.19 AS production

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID

ARG PORT
ENV PORT=$PORT

WORKDIR /app

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/prisma ./prisma
COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .

RUN yarn install --prod && yarn cache clean
RUN yarn prisma:generate

CMD [ "node", "dist/main.js" ]