<?php

namespace Autosound;

require_once(__DIR__ . '/vendor/autoload.php');

use Timber;
// Initialize Timber
new Timber\Timber();
\Timber\Timber::$dirname = array('templates');

require_once(__DIR__ . '/inc/manifest.php');
require_once(__DIR__ . '/inc/helpers.php');
require_once(__DIR__ . '/inc/setup.php');
require_once(__DIR__ . '/inc/stores.php');
require_once(__DIR__ . '/inc/menu.php');
require_once(__DIR__ . '/inc/options.php');
require_once(__DIR__ . '/inc/rest-filter.php');
require_once(__DIR__ . '/inc/editor.php');
require_once(__DIR__ . '/inc/breadcrumbs.php');
require_once(__DIR__ . '/inc/categories.php');
require_once(__DIR__ . '/inc/shop/component.php');
require_once(__DIR__ . '/inc/form.php');
require_once(__DIR__ . '/inc/forms/wholesale.php');
require_once(__DIR__ . '/inc/forms/quote.php');

Helpers::init();
new Setup();
new Stores();
new Menu();
new Options();
new Editor();
new Breadcrumbs();
new Categories();
new ShopComponent();
new WholesaleForm();
new QuoteForm();

/* Start wp customization */
define('DISALLOW_FILE_EDIT', true); // Don't allow file edtiting
define('DISALLOW_FILE_MODS', true); // Don't allow plugin uploads

add_filter('wpcf7_load_css', '__return_false');
