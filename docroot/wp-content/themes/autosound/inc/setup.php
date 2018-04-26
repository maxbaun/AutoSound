<?php

namespace Autosound;

use Autosound\Helpers;

/**
 * Setup
 */
class Setup
{
	public function __construct() {
		add_action('wp_enqueue_scripts', array($this, 'enqueueScripts'));
		add_action('wp_footer', array($this, 'deregisterJunk'));
		add_action('init', array($this, 'disableEmojis'));
		add_action('after_setup_theme', array($this, 'addThemeSupport'));
		add_action('after_setup_theme', array($this, 'addImageSizes'));
		add_action('script_loader_tag', array($this, 'addAsyncScrits'), 10, 3);
	}

	public function addAsyncScrits($tag, $handle, $src) {
		$asynScripts = array('google-maps');

		if (in_array($handle, $asynScripts)) {
			return '<script type="text/javascript" src="' . $src . '" async="async"></script>' . "\n";
		}

		return $tag;
	}

	public function enqueueScripts() {
		wp_enqueue_style('autosound/css', Helpers::getThemeAsset('screen.css'), null, null, 'screen');
		wp_enqueue_script('vendor/js', Helpers::getThemeAsset('vendor.js'), null, null, true);
		wp_enqueue_script('autosound/js', Helpers::getThemeAsset('app.js'), array('vendor/js'), null, true);

		wp_localize_script('autosound/js', 'AutosoundGlobalConstants', $this->getGlobalConstants());
	}

	private function getGlobalConstants() {
		$shopBase = get_field('shopBase', 'option');
		$constants = array(
			'shopBase' => Helpers::getPathname(get_permalink($shopBase)),
			'perPage' => get_option('posts_per_page'),
			'homeUrl' => get_home_url()
		);

		return $constants;
	}

	public function deregisterJunk() {
		if (is_admin()) {
			return;
		}

		wp_deregister_script('wp-embed');
	}

	public function disableEmojis() {
		if (is_admin()) {
			return;
		}
		// all actions related to emojis
		remove_action('admin_print_styles', 'print_emoji_styles');
		remove_action('wp_head', 'print_emoji_detection_script', 7);
		remove_action('admin_print_scripts', 'print_emoji_detection_script');
		remove_action('wp_print_styles', 'print_emoji_styles');
		remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
		remove_filter('the_content_feed', 'wp_staticize_emoji');
		remove_filter('comment_text_rss', 'wp_staticize_emoji');

		// filter to remove TinyMCE emojis
		add_filter('tiny_mce_plugins', array($this, 'disableEmojis'));
	}

	public function addThemeSupport() {
		add_theme_support('post-thumbnails');
		add_theme_support('menus');
	}

	public function addImageSizes() {
		add_image_size('medium-thumbnail', 300, 300, true);
	}
}
