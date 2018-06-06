<?php

namespace Autosound;

use Autosound\Form;

/**
 * WholesaleForm
 */
class WholesaleForm
{
	public function __construct() {
		add_action('rest_api_init', array($this, 'setupEndpoint'));
	}

	public function setupEndpoint() {
		register_rest_route('autosound/v1', '/wholesaleForm', array(
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
				'label' => 'Company',
				'value' => $params->company
			),
			array(
				'label' => 'Email',
				'value' => $params->email
			),
			array(
				'label' => 'Title',
				'value' => $params->title
			),
			array(
				'label' => 'Message',
				'value' => $params->message
			)
		);

		$form = new Form('Autosound Wholesale Dealer Form', $formParams, $params->to, '6_messages/wholesale.twig');

		$form->setSender($params->name, $params->email);

		$res = $form->sendMessage();

		if ($res) {
			wp_send_json_success();
		} else {
			wp_send_json_error();
		}
	}
}
