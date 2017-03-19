FROM node:7-alpine

WORKDIR /data
ADD package.json /data/package.json
RUN npm install

ADD main.js /data/main.js

CMD sh -c "unlink /run/docker/plugins/kekruauth.sock; true" \
 && node main.js

EXPOSE 80