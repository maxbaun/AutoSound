<?php
$data = Timber::get_context();

$data['post'] = new Timber\Post();

Timber::render('shop.twig', $data);
