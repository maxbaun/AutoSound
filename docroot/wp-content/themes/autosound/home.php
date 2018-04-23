<?php

$data = Timber::get_context();

$postId = get_option('page_for_posts');
$heroTitle = get_field('heroTitleTitle', $postId);
$post = get_post($postId);

$data['pageTitle'] = !empty($heroTitle) ? $heroTitle : $post->post_title;

$posts = new Timber\PostQuery();

$data['posts'] = $posts;

Timber::render('blog.twig', $data);
