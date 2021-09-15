FROM node:16.3
# TODO Use 16.3 is for an issue that building image on m1 mac cannot be done on 
# other versions. Review later.
# See https://github.com/docker/for-mac/issues/5831

WORKDIR /usr/src/app

RUN mkdir /data
COPY ./ ./
RUN npm install && npm run build

CMD [ "npm", "run", "start"]