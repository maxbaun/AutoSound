FROM wordpress

WORKDIR /var/www/html

RUN a2enmod headers

COPY docroot .
