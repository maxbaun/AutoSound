<?php

namespace Autosound;

use Timber;
/**
 * Stores
 */
class Stores
{
	public function __construct() {
		add_filter('timber_context', array($this, 'addStoresToContext'));
	}

	public function addStoresToContext($context) {
		$args = array(
			'post_type' => 'location'
		);

		$locations = get_posts($args);
		$storeLocations = array();

		foreach ($locations as $location) {
			$locationId = $location->ID;

			$storeLocations[] = array(
				'id' => $location->ID,
				'title' => $location->post_title,
				'phone' => get_field('phone', $locationId),
				'email' => get_field('email', $locationId),
				'directions' => get_field('directions', $locationId),
				'address' => get_field('address', $locationId),
				'phoneDetail' => get_field('phoneDetail', $locationId),
				'hours' => get_field('hours', $locationId),
				'coordinates' => array(
					'lat' => get_field('latitude', $locationId),
					'lng' => get_field('longitude', $locationId)
				)
			);
		}

		$context['storeLocations'] = $storeLocations;

		return $context;
	}
}
