<?php

namespace Autosound;

class Editor
{
	public function __construct() {
		add_filter('tiny_mce_before_init', array($this, 'addCustomColors'));
	}

	public function addCustomColors($init) {
		$custom_colours = '
			"D52027", "Red"
		';

		$init['textcolor_map'] = '['.$custom_colours.']';

	    // change the number of rows in the grid if the number of colors changes
	    // 8 swatches per row
	    $init['textcolor_rows'] = 1;

	    return $init;
	}
}
