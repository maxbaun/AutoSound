<?php
/*
* Template Name: Home Template
*/

$data = Timber::get_context();
Timber::render('home.twig', $data);
