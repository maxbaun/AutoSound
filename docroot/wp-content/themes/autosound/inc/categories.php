<?php

namespace Autosound;

use Timber;
/**
 * Categories
 */
class Categories
{
	public function __construct() {
		add_filter('timber_context', array($this, 'addCategoriesToContext'));
	}

	public function addCategoriesToContext($context) {
		global $post;

		if ((!empty($post) && is_single($post->ID)) || is_archive() || is_search() || is_home()) {
			$wpCats = get_categories(array(
				'hide_empty' => 0
			));

			$categories = array();

			foreach ($wpCats as $cat) {
				$categories[] = new Timber\Term($cat->term_id);
			}

			$wpTags = get_tags(array(
				'hide_empty' => 0
			));

			$tags = array();

			foreach ($wpTags as $tag) {
				$tags[] = new Timber\Term($tag->term_id);
			}

			$context['categories'] = $categories;
			$context['tags'] = $tags;
		}

		return $context;
	}

	private function createBreadcrumb($title, $url) {
		return array(
			'title' => $title,
			'url' => $url
		);
	}
}
