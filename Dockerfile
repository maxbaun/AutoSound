FROM wordpress

COPY docroot /usr/src/wordpress

RUN a2enmod headers && \
	chown -R www-data:www-data /usr/src/wordpress
