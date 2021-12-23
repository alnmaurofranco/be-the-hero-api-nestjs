FROM node:lts-alpine

WORKDIR /usr/app

COPY package.json yarn.* ./

RUN yarn install --production=false --frozen-lockfile

COPY . .

EXPOSE 3333

CMD ["yarn", "start:dev"]