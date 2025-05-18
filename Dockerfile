FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    nginx \
    zip unzip \
    libzip-dev \
    curl \
    git \
    && docker-php-ext-install zip

WORKDIR /var/www/html
COPY . .

COPY ./docker/nginx.conf /etc/nginx/nginx.conf

CMD sh -c "php-fpm -D && nginx -g 'daemon off;'"
