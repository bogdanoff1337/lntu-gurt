#!/usr/bin/env bash
echo "Running composer"
composer install --working-dir=/var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force
php artisan db:seed --force

echo "Build frontend..."
cd resources/main
npm install
npm run build:vite:without:check
