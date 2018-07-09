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
				'label' => 'Vehicle',
				'value' => $params->vehicle
			),
			array(
				'label' => 'Services',
				'value' => $params->services
			)
		);

		$locationEmail = $this->getLocationEmail($params->location);

		$to = array($params->to, $locationEmail);

		$form = new Form('Autosound Custom Quote Form', $formParams, $to, '6_messages/quote.twig');

		$form->setSender($params->name, $params->email);

		$res = $form->sendMessage();

		if ($res) {
			wp_send_json_success();
		} else {
			wp_send_json_error();
		}
	}

	private function getLocationEmail($name) {
		$defaultEmail = 'asussman@autosound.com';

		$locations = get_posts(array(
			'post_type' => 'location',
			's' => $name
		));

		if (empty($locations)) {
			return $defaultEmail;
		}

		$foundLocation = null;

		foreach ($locations as $location) {
			if (strpos($location->post_title, $name) !== false) {
				$foundLocation = $location;
			}
		}

		if (empty($foundLocation)) {
			return $defaultEmail;
		}

		$email = get_field('email', $foundLocation->ID);

		return $email;
	}
}
