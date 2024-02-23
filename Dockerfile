FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app
COPY . /app
USER root
RUN chown -R pptruser:pptruser /app
USER pptruser
RUN npm install
CMD npm run test
