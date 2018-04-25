<?php

namespace Autosound;

class Manifest
{
	private $files;

	public function __construct() {
		$this->files = json_decode(file_get_contents(get_template_directory() . '/build/manifest.json'), true);

		add_filter('timber_context', array($this, 'addManifestToContext'));
	}

	public function getFile($file) {
		return $this->files[$file];
	}

	public function addManifestToContext($context) {
		$context['manifest'] = $this->files;

		return $context;
	}
}
