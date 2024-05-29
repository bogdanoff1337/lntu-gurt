#!/usr/bin/env bash
echo "Running composer"
composer update

echo "Running migrations..."
php artisan migrate --force --seed

