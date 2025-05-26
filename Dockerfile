FROM node:20.17.0 as node

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM richarvey/nginx-php-fpm:3.1.6

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV SKIP_COMPOSER=1
ENV WEBROOT=/var/www/html/public
ENV PHP_ERRORS_STDERR=1
ENV RUN_SCRIPTS=1
ENV REAL_IP_HEADER=1

COPY . /var/www/html

COPY --from=node /app/public /var/www/html/public

# Expose port for Render
EXPOSE 80

CMD ["/start.sh"]
