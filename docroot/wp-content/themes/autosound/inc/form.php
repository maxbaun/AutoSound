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

	public function __construct($subject, $params, $to, $template) {
		$this->subject = $subject;
		$this->params = $params;
		$this->template = $template;

		$this->to = $to;
	}

	public function setSender($name, $email) {
		$this->fromName = $name;
		$this->fromEmail = $email;

		add_filter('wp_mail_from_name', function () {
			return $this->fromName;
		});

		add_filter('wp_mail_from', function () {
			return $this->fromEmail;
		});
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
			'Reply-To: ' . $this->fromName . ' <' . $this->fromEmail . '>',
			'From: ' . $this->fromName
		);
	}
}
