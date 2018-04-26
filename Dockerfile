FROM wordpress

WORKDIR /var/www/html

RUN a2enmod headers \
	sudo chown -R www-data:www-data /var/www/html/wp-content

COPY docroot .
