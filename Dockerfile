FROM wordpress

WORKDIR /usr/src/wordpress

COPY docroot .

RUN a2enmod headers && \
	chown -R www-data:www-data /usr/src/wordpress
