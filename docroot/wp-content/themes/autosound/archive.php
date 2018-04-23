<?php

$term = get_queried_object();

$data = Timber::get_context();

$posts = new Timber\PostQuery();

$heroTitle = get_field('heroTitleTitle', $term);

$data['pageTitle'] = !empty($heroTitle) ? $heroTitle : $term->name;

$data['posts'] = $posts;

Timber::render('blog.twig', $data);
