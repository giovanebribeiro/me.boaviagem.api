FROM node:12

RUN apt update
RUN apt install dumb-init
RUN npm install pino-sentry -g # our logger transport

RUN groupadd -r nodejs && useradd -m -r -g nodejs -s /bin/bash nodejs

USER nodejs

ARG SENTRY_DSN

WORKDIR /home/nodejs

COPY package.json .

RUN npm install --production

COPY locales ./locales
COPY modules ./modules
COPY index.js .
COPY .env .

ENV NODE_ENV production
EXPOSE 8051

ENTRYPOINT ["/usr/bin/dumb-init", "--"] # finds the PID 1 process
#CMD [ "node" , "index.js", "|", "pino-sentry --dsn=$SENTRY_DSN" ]
CMD [ "node" , "index.js" ]

