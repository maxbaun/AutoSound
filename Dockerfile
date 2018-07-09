FROM wordpress

COPY docroot/wp-content/themes/autosound /usr/src/wordpress/wp-content/themes/autosound
COPY docroot/wp-content/plugins /usr/src/wordpress/wp-content/plugins
COPY docroot/google023cd8d1feaca489.html /usr/src/wordpress/google023cd8d1feaca489.html

RUN a2enmod headers && \
	chown -R www-data:www-data /usr/src/wordpress
