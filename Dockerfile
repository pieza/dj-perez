FROM node:lts

WORKDIR /usr/src/app

RUN apt-get update || : && apt-get install python -y
RUN apt-get install ffmpeg -y

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . .

CMD [ "node", "src/index.js" ]