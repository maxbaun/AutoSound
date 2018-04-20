<?php
/*
* Template Name: Home Template
*/

$data = Timber::get_context();

$data['post'] = new Timber\Post();

Timber::render('home.twig', $data);
