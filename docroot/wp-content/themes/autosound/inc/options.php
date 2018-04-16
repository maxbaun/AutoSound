<?php

namespace Autosound;

use TimberPost;

/**
 * Options
 */
class Options
{

	public function __construct() {
		if (function_exists('acf_add_options_page')) {
			acf_add_options_page(array(
				'page_title' 	=> 'Theme General Settings',
				'menu_title'	=> 'Theme Settings',
				'menu_slug' 	=> 'theme-general-settings',
				'capability'	=> 'edit_posts',
				'redirect'		=> false
			));

			acf_add_options_sub_page(array(
				'page_title' 	=> 'Shop Settings',
				'menu_title'	=> 'Shop Settings',
				'parent_slug'	=> 'theme-general-settings',
			));
		}

		add_filter('timber_context', array($this, 'addOptionsToContext'));
	}

	public function addOptionsToContext($context) {
		$context['options'] = array();



		return $context;
	}

	public static function getThemeOptions() {
		return array(
			'shop' => array(
				'base' => get_field('shopBase', 'option')
			)
		);
	}
}
