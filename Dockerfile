FROM wordpress:latest

RUN apt-get update && \
	apt-get install --yes git

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

COPY src /usr/src/wordpress/wp-content/themes/tagprints-2015
COPY plugins /usr/src/wordpress/wp-content/plugins
RUN chown -R www-data:www-data /usr/src/wordpress/

COPY src/uploads.ini /usr/local/etc/php/conf.d/uploads.ini

WORKDIR /app

COPY . .

RUN composer install --no-dev --no-interaction -o

RUN mv dist /usr/src/wordpress/wp-content/themes/tagprints-2015/dist && \
    mv vendor /usr/src/wordpress/vendor && \
    chown -R www-data:www-data /usr/src/wordpress/

RUN rm -rf /app

RUN a2enmod rewrite
RUN a2enmod expires
RUN a2enmod headers

WORKDIR /var/www/html
