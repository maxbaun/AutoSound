<?php

namespace Autosound;

use Autosound\Helpers;

class ShopComponent
{
	public function __construct() {
		add_action('init', array($this, 'initShopRouting'));
	}

	public function initShopRouting() {
		$shopBase = get_field('shopBase', 'option');
		$shopPath = Helpers::getPathname(get_permalink($shopBase->ID));

		$url_path = trim(parse_url(add_query_arg(array()), PHP_URL_PATH), '/');
		$url_path = explode('/', $url_path);

		if ($url_path[0] === $shopPath) {
			$load = locate_template('template-shop.php', true);
			if ($load) {
				exit(); // just exit if template was found and loaded
			}
		}
	}
}
