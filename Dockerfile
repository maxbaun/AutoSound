FROM wordpress

COPY docroot/wp-content/themes/autosound /usr/src/wordpress/wp-content/themes/autosound
COPY docroot/wp-content/plugins /usr/src/wordpress/wp-content/plugins

RUN a2enmod headers && \
	chown -R www-data:www-data /usr/src/wordpress
