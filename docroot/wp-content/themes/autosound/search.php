<?php

$data = Timber::get_context();
$data['pageTitle'] = 'Search: <span class="is-red">' . get_search_query(false) . '</span>';
$data['posts'] = new Timber\PostQuery();

Timber::render('blog.twig', $data);
