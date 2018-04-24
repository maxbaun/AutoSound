<?php

namespace Autosound;

use Autosound\Form;

/**
 * QuoteForm
 */
class QuoteForm
{
	public function __construct() {
		add_action('rest_api_init', array($this, 'setupEndpoint'));
	}

	public function setupEndpoint() {
		register_rest_route('autosound/v1', '/quoteForm', array(
			'methods' => 'POST',
			'callback' => array($this, 'submitForm')
		));
	}

	public function submitForm($request) {
		$params = (object) $request->get_json_params();

		$formParams = array(
			array(
				'label' => 'Name',
				'value' => $params->name
			),
			array(
				'label' =>  'Email',
				'value' => $params->email
			),
			array(
				'label' => 'Location',
				'value' => $params->location
			),
			array(
				'label' => 'Services',
				'value' => $params->services
			)
		);

		$form = new Form('Autosound Custom Quote Form', $formParams, '6_messages/quote.twig');

		$form->setSender($params->name, $params->email);

		$res = $form->sendMessage();

		if ($res) {
			wp_send_json_success();
		} else {
			wp_send_json_error();
		}
	}
}
