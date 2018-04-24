<?php

namespace Autosound;

use Timber;

class Form
{
	private $params;
	private $subject;
	private $template;
	private $to;
	private $fromEmail;
	private $fromName;

	public function __construct($subject, $params, $template) {
		$this->subject = $subject;
		$this->params = $params;
		$this->template = $template;

		$this->to = 'maxbaun@gmail.com';
	}

	public function setSender($name, $email) {
		$this->fromName = $name;
		$this->fromEmail = $email;
	}

	public function getMessage() {
		$data = array(
			'params' => $this->params,
			'title' => $this->subject
		);

		return Timber\Timber::compile($this->template, $data);
	}

	public function sendMessage() {
		return wp_mail($this->to, $this->subject, $this->getMessage(), implode('\r\n', $this->getHeaders()));
	}

	public function getHeaders() {
		return array(
			'Content-Type: text/html; charset=UTF-8',
			'Reply-To: ' . $this->fromEmail,
			'From: ' . $this->fromName
		);
	}
}
