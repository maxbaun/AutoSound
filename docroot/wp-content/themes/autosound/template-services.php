<?php
/*
* Template Name: Services Template
*/

$data = Timber::get_context();

$services = new Timber\PostQuery(array(
	'post_type' => 'service'
));

$data['services'] = $services;

$data['post'] = new Timber\Post();

Timber::render('services.twig', $data);
