<?php

namespace Autosound;

use Timber;
/**
 * Menu
 */
class Menu
{
	public function __construct() {
		add_filter('timber_context', array($this, 'addMenuToContext'));
	}

	public function addMenuToContext($context) {
		$context['mainMenu'] = new Timber\Menu('Main Nav');
		$context['footerMenu'] = new Timber\Menu('Footer Nav');

		return $context;
	}
}
