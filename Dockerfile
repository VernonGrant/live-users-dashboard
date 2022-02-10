FROM php:7.4-apache

# Requirements

RUN apt-get update
RUN apt install -y zip

# Apache configuration

RUN a2enmod rewrite

# PHP Unit

RUN cd ~/ && curl -LO https://phar.phpunit.de/phpunit-9.5.phar
RUN cd ~/ && chmod +x phpunit-9.5.phar
RUN cd ~/ && mv phpunit-9.5.phar /usr/local/bin/phpunit
RUN phpunit --version

# Composer

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
