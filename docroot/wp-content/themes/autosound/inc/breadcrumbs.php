<?php

namespace Autosound;

use Timber;
/**
 * Stores
 */
class Breadcrumbs
{
	public function __construct() {
		add_filter('timber_context', array($this, 'addBreadcrumbsToContext'));
	}

	public function addBreadcrumbsToContext($context) {
		global $post;
		global $wp_query;

		// Add the home breadcrumb
		$breadcrumbs = array(
			$this->createBreadcrumb('', get_home_url())
		);

		if (is_home()) {
			$postId = get_option('page_for_posts');
			$post = get_post($postId);

			$breadcrumbs[] = $this->createBreadcrumb($post->post_title, get_permalink($post));
		} elseif (is_archive()) {
			$term = get_queried_object();
			$termId = $term->term_id;

			$breadcrumbs[] = $this->createBreadcrumb($term->name, get_category_link($termId));
		} elseif (is_search()) {
			$search = get_search_query(false);
			$breadcrumbs[] = $this->createBreadcrumb('Search: ' . get_search_query(), get_search_link($search));
		} elseif (!empty($post) && is_single()) {
			$parents = get_post_ancestors($post->ID);

			foreach ($parents as $parent) {
				$breadcrumbs[] = $this->createBreadcrumb(get_the_title($parent), get_permalink($parent));
			}

			$breadcrumbs[] = $this->createBreadcrumb($post->post_title, get_permalink($post));
		}

		$context['breadcrumbs'] = $breadcrumbs;

		return $context;
	}

	private function createBreadcrumb($title, $url) {
		return array(
			'title' => $title,
			'url' => $url
		);
	}
}
