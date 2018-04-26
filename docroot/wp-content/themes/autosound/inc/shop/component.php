<?php

namespace Autosound;

use Autosound\Helpers;

class ShopComponent
{
	public function __construct() {
		add_filter('template_include', array($this, 'checkRouteForShop'), 99);
	}

	public function checkRouteForShop($template) {
		if ($this->isShop()) {
			return locate_template(array('template-shop.php'));
		}

		return $template;
	}

	public function isShop() {
		$shopBase = get_field('shopBase', 'option');
		$shopPath = Helpers::getPathname(get_permalink($shopBase->ID));

		$url_path = trim(parse_url(add_query_arg(array()), PHP_URL_PATH), '/');
		$url_path = explode('/', $url_path);

		if ($url_path[0] === $shopPath) {
			return true;
		}

		return false;
	}
}
