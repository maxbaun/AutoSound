<?php
/*
* Template Name: Contact Template
*/

$data = Timber::get_context();

$data['post'] = new Timber\Post();

Timber::render('contact.twig', $data);
