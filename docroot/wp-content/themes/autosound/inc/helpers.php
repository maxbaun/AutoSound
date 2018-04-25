<?php

namespace Autosound;

use Autosound\Manifest;

class Helpers
{
	private static $manifest;
	public static function init() {
		self::$manifest = new Manifest();
	}

	public static function getThemeAsset($name) {
		return get_template_directory_uri() . '/build/' . self::$manifest->getFile($name);
	}

	public static function getPathname($slug) {
		$siteUrl = get_home_url();

		$pathname = str_replace($siteUrl, '', $slug);
		$parts = explode('/', $pathname);

		if (!isset($parts[1])) {
			return;
		}

		return $parts[1];
	}
}
