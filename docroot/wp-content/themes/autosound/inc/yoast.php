<?php

namespace AutoSound;

use AutoSound\ShopComponent;

class Yoast
{
	private $keys;
	private $shopComponent;
	public function __construct() {
		$this->keys = array(
	        'yoast_wpseo_focuskw',
	        'yoast_wpseo_title',
	        'yoast_wpseo_metadesc',
	        'yoast_wpseo_linkdex',
	        'yoast_wpseo_metakeywords',
	        'yoast_wpseo_meta-robots-noindex',
	        'yoast_wpseo_meta-robots-nofollow',
	        'yoast_wpseo_meta-robots-adv',
	        'yoast_wpseo_canonical',
	        'yoast_wpseo_redirect',
	        'yoast_wpseo_opengraph-title',
	        'yoast_wpseo_opengraph-description',
	        'yoast_wpseo_opengraph-image',
	        'yoast_wpseo_twitter-title',
	        'yoast_wpseo_twitter-description',
	        'yoast_wpseo_twitter-image'
	    );

		$this->shopComponent = new ShopComponent();

		add_filter('rest_prepare_page', array($this, 'addYoastToPageApi'), 10, 3);
		add_filter('rest_prepare_product', array($this, 'addYoastToPageApi'), 10, 3);
		add_filter('rest_prepare_product_category', array($this, 'addYoastToTaxApi'), 10, 3);
		add_action('timber_context', array($this, 'addYoastToContext'));
	}

	public function addYoastToContext($context) {
		if (!$this->shopComponent->isShop()) {
			return $context;
		}

		global $post;

		$yoastMeta = array();

		if (is_home()) {
			$postId = get_option('page_for_posts');
			$yoastMeta = $this->getMetaForPost($postId);
		} elseif (is_archive()) {
			$term = get_queried_object();
			$termId = $term->term_id;
			$taxonomy = $term->taxonomy;

			$yoastMeta = $this->getMetaForTerm($termId, $taxonomy);
		} elseif (!empty($post) && is_singular()) {
			$postId = $post->ID;
			$yoastMeta = $this->getMetaForPost($postId);
		}

		$context['yoastMeta'] = $yoastMeta;

		return $context;
	}

	private function getMetaTitleForPost($postId) {
		$title = '';

		if (!empty(get_post_meta($postId, "_yoast_wpseo_title", true))) {
			$title = get_post_meta($postId, "_yoast_wpseo_title", true);
		} elseif (!empty(get_the_title($postId))) {
			$title = get_the_title($postId);
		} else {
			$title = wp_title();
		}

		return $title;
	}

	private function getMetaDescriptionForPost($postId) {
		$description = '';

		if (!empty(get_post_meta($postId, "_yoast_wpseo_metadesc", true))) {
			$description = get_post_meta($postId, "_yoast_wpseo_metadesc", true);
		} elseif (has_excerpt($postId))) {
			$description = get_the_excerpt($postId);
		} else {
			$description = get_bloginfo('description');
		}

		return $description;
	}

	private function getMetaKeywordsForPost($postId) {
		$keywords = '';

		if (!empty(get_post_meta($postId, "_yoast_wpseo_focuskw", true))) {
			$keywords = get_post_meta($postId, "_yoast_wpseo_focuskw", true);
		}

		return $keywords;
	}

	private function getMetaForPost($postId) {
		$yoastMeta = array(
			'title' => $this->getMetaTitleForPost($postId),
			'description' => $this->getMetaDescriptionForPost($postId),
			'keywords' => $this->getMetaKeywordsForPost($postId),
			'sitename' => get_bloginfo('name')
		);

		return $yoastMeta;
	}

	private function getMetaForTerm($termId, $taxonomy) {
		$term = get_term($termId, $taxonomy);

		$yoastMeta = array(
			'title' => $term->name,
			'description' => get_bloginfo('description'),
			'keywords' => '',
			'sitename' => get_bloginfo('name')
		);

		$meta = get_option('wpseo_taxonomy_meta');

		if (empty($meta[$taxonomy]) || empty($meta[$taxonomy][$termId])) {
			return $yoastMeta;
		}

		$termMeta = $meta[$taxonomy][$termId];

		if (!empty($termMeta['wpseo_title'])) {
			$yoastMeta['title'] = $termMeta['wpseo_title'];
		} else {
			$yoastMeta['title'] = $term->name;
		}

		$yoastMeta['title'] .= ' - ' . get_bloginfo('name');

		if (!empty($termMeta['_yoast_wpseo_metadesc'])) {
			$yoastMeta['description'] = $termMeta['wpseo_metadesc'];
		} else {
			$yoastMeta['description'] = get_bloginfo('description');
		}

		if (!empty($termMeta['wpseo_focuskw'])) {
			$yoastMeta['keywords'] = $termMeta['wpseo_focuskw'];
		}

		return $yoastMeta;
	}

	public function addYoastToPageApi($data, $post, $context) {
		$meta = $this->getMetaForPost($post->ID);

		$data->data['yoastMeta'] = $meta;
		return $data;
	}

	public function addYoastToTaxApi($data, $term, $context) {
		$meta = $this->getMetaForTerm($term->term_id, $term->taxonomy);

		$data->data['yoastMeta'] = $meta;
		return $data;
	}
}
