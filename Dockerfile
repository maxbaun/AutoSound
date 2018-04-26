FROM wordpress

WORKDIR /var/www/html

COPY docroot .


RUN a2enmod headers && \
	chown -R www-data:www-data /var/www/html/wp-content
