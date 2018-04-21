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

		// Add the home breadcrumb
		$breadcrumbs = array(
			$this->createBreadcrumb('', get_home_url())
		);

		$parents = get_post_ancestors($post->ID);

		foreach ($parents as $parent) {
			$breadcrumbs[] = $this->createBreadcrumb(get_the_title($parent), get_permalink($parent));
		}

		$breadcrumbs[] = $this->createBreadcrumb($post->post_title, get_permalink($post));

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
