#!/bin/zsh

# Add .env in local
sed -e 's/APP_NAME=Laravel/APP_NAME=CashRegister/' .env.example > .env

# Installing Composer Dependencies
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs

# Start Sail
./vendor/bin/sail up -d

# Generate APP_KEY
./vendor/bin/sail artisan key:generate

# Create the storage Link
./vendor/bin/sail artisan storage:link

# Migrate the BDD
./vendor/bin/sail artisan migrate

# Install Node Dependencies
./vendor/bin/sail npm install

# Configuring a shell alias
echo "\nAdd a shell alias to your shell configuration file in your home directory, such as ~/.zshrc or ~/.bashrc: "
echo "alias sail='sh \$([ -f sail ] && echo sail || echo vendor/bin/sail)'"

# Start Vite
echo "\nExecute Vite in dev with :"
echo "sail npm run dev or ./vendor/bin/sail run dev"
