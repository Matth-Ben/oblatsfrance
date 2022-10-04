<?php

if (is_admin()) {
    include "admin/tinymce-insert-li/insert-lorem-ipsum.php";
}

if (function_exists('acf_add_options_page')) {
  acf_add_options_page();
}

if (function_exists('acf_add_local_field_group')) {
    acf_add_local_field_group(array(
        'key' => 'tracking',
        'title' => 'Tracking',
        'fields' => [
            [
                'key' => 'google_tag_manager',
                'label' => 'Code Google Tag Manager',
                'name' => 'google_tag_manager',
                'type' => 'text'
            ],
            [
                'key' => 'google_analytics_key',
                'label' => 'Code Google Analytics : UA-XXXXXXXXX-X',
                'name' => 'google_analytics_key',
                'type' => 'text'
            ]
        ],
        'location' => [
            [
                [
                'param' => 'options_page',
                'operator' => '==',
                'value' => 'acf-options',
                ]
            ]
        ]
    ));
}

require_once dirname(__DIR__) . '/resources/blocs-setup.php';
require_once dirname(__DIR__) . '/resources/sync-acf.php';

function remove_gutenberg_styles() {
  wp_dequeue_style( 'wp-block-library' );
}

add_action( 'wp_enqueue_scripts', 'remove_gutenberg_styles', 100 );

/**
 * Display svg function
 */
function display_svg($svg, $getUrl = false) {
  $uri = $getUrl ? get_template_directory_uri() . "/assets/images/svg" : get_template_directory() . "/assets/images/svg";
  $path = "$uri/$svg.svg";

  if ($getUrl) return $path;
  else if (file_exists($path)) include($path);
  else throw new Exception("SVG name doesn't exist in /images/svg folder", 1);
}

/**
 * Create all image sizes
 */
add_image_size('xs', 240, 0, true);
add_image_size('sm', 480, 0, true);
add_image_size('md', 768, 0, true);
add_image_size('lg', 1024, 0, true);
add_image_size('xl', 1200, 0, true);
add_image_size('xxl', 1400, 0, true);
add_image_size('xxxl', 1600, 0, true);
add_image_size('hd', 1920, 1080, true);

remove_image_size('1536x1536');
remove_image_size('2048x2048');
update_option('medium_large_size_w', '0');

/**
 * Populate ACF select field options with Gravity Forms forms
 */
function acf_populate_gf_forms_ids( $field ) {
	if ( class_exists( 'GFFormsModel' ) ) {
		$choices = [];

		foreach ( \GFFormsModel::get_forms() as $form ) {
			$choices[ $form->id ] = $form->title;
		}

		$field['choices'] = $choices;
	}

	return $field;
}
add_filter( 'acf/load_field/name=id-form', 'acf_populate_gf_forms_ids' );

/**
 * Hide unwanted Gutenberg Blocks
 */
function dc_allowed_block_types ($allowed_block_types, $editor_context) {
    $acf_blocks = array_column(acf_get_block_types(), 'name');
    $allowed_core_blocks = [
        'core/paragraph',
        'core/heading',
        'core/list',
        'core/image',
        'core/columns'
    ];

    return array_merge($allowed_core_blocks, $acf_blocks);
}
add_filter( 'allowed_block_types_all', 'dc_allowed_block_types', 10, 2 );

/**
* Change slug to camel case
*/
function toCamelCase($string) {
  return preg_replace_callback(
    '/[-_](.)/',
    function($matches) {
      return strtoupper($matches[1]);
    }, $string);
}

/**
* Add a custom endpoint to access TwitterFeed data
*/
// require_once dirname(__DIR__) . '/resources/TwitterFeed.php';

// add_action( 'rest_api_init', function () {
//     register_rest_route( 'studio-seven/v1', '/twitterfeed', array(
//         'methods' => 'GET',
//         'callback' => array('TwitterFeed', 'getTweets'),
//     ));
// });

/**
* Add menu location
*/
function wpb_custom_new_menu() {
    register_nav_menu('footer_navigation',__( 'Footer' ));
}
add_action( 'init', 'wpb_custom_new_menu' );


/**
* Replace the input submit button in a form by a button element
*/
function input_to_button( $button, $form ) {
    $dom = new DOMDocument();
    $dom->loadHTML( '<?xml encoding="utf-8" ?>' . $button );
    $input = $dom->getElementsByTagName( 'input' )->item(0);
    $new_button = $dom->createElement( 'button' );
    $val = $dom->createElement( 'div', $input->getAttribute( 'value' ));
    $wrapper = $dom->createElement( 'div' );
    $wrapper->setAttribute('class', 'wrapper');
    $wrapper->appendChild( $val );
    $new_button->appendChild( $wrapper );
    $input->removeAttribute( 'value' );

    foreach( $input->attributes as $attribute ) {
        $new_button->setAttribute( $attribute->name, $attribute->value );
    }

    $new_button->setAttribute('class', $new_button->getAttribute('class'));
    $val->setAttribute('data-label', $new_button->textContent);

    $input->parentNode->replaceChild( $new_button, $input );

    return $dom->saveHtml( $new_button );
  }

  /* CHANGE SUBMIT BUTTON */
  add_filter( 'gform_next_button', 'input_to_button', 10, 2 );
  add_filter( 'gform_previous_button', 'input_to_button', 10, 2 );
  add_filter( 'gform_submit_button', 'input_to_button', 10, 2 );


function dc_enable_gutenberg_post_ids($can_edit, $post) {
    if (get_option('page_for_posts') === $post->ID) return true;

    return $can_edit;
}

add_filter('use_block_editor_for_post', 'dc_enable_gutenberg_post_ids', 10, 2);
