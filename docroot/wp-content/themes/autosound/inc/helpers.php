<?php

namespace Autosound;

class Helpers
{
	public static function getThemeAsset($name) {
		return get_template_directory_uri() . "/build/$name";
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
