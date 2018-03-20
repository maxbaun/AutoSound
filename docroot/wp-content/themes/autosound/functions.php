<?php

require_once(__DIR__ . '/vendor/autoload.php');

// Initialize Timber
new Timber\Timber();
\Timber\Timber::$dirname = array('templates');

/* Start wp customization */
define('DISALLOW_FILE_EDIT', true); // Don't allow file edtiting
define('DISALLOW_FILE_MODS', true); // Don't allow plugin uploads

define('WPMDB_LICENCE', 'b6fef406-3d49-4d5a-b7b0-098b1914b2f3');
define('AS3CFPRO_LICENCE', 'bad1437c-d20d-49c8-8767-f1695926cc39');
