<?php
/*
* Template Name: Wholesale Template
*/

$data = Timber::get_context();

$data['post'] = new Timber\Post();

Timber::render('wholesale.twig', $data);
