<?php
/*
* Template Name: Gallery Template
*/

$data = Timber::get_context();

$data['post'] = new Timber\Post();

Timber::render('gallery.twig', $data);
