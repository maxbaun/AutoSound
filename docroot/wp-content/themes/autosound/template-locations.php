<?php
/*
* Template Name: Locations Template
*/

$data = Timber::get_context();

$data['post'] = new Timber\Post();

Timber::render('locations.twig', $data);
