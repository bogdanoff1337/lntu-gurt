#!/usr/bin/env bash
echo "Running composer"
composer update --no-dev --working-dir=/var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force --seed

echo "Running front"
cd ./resources/main
npm install
npm run start:vite
