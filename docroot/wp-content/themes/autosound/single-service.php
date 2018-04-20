<?php
$data = Timber::get_context();

$data['post'] = new Timber\Post();

$data['otherServices'] = new Timber\PostQuery(array(
	'post_type' => 'service',
	'posts_per_page' => 3,
	'post__not_in' => array($data['post']->ID)
));

Timber::render('service.twig', $data);
