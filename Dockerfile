FROM node:12

RUN apt update
RUN apt install dumb-init

RUN groupadd -r nodejs && useradd -m -r -g nodejs -s /bin/bash nodejs

USER nodejs

WORKDIR /home/nodejs

COPY package.json .

RUN npm install --production

COPY locales .
COPY modules .
COPY index.js .

ENV NODE_ENV production
EXPOSE 8051

ENTRYPOINT ["/usr/bin/dumb-init", "--"] # finds the PID 1 process
CMD [ "node" , "index.js" ]

