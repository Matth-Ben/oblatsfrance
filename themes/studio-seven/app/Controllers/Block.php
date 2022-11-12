<?php

namespace App\Controllers;

use Sober\Controller\Controller;

class Block extends Controller {
  // public static function example($data) {
  //     return [
  //         'title' => Element::title($data),
  //         'image' => Element::image($data['image'], '1920px')
  //     ];
  // }

  public static function flexibleContent($data) {
    $fields = get_field($data['_blocks']);
    $index = 0;
    $components = [];

    foreach($fields as $block) {
      $component_function = toCamelCase($block['acf_fc_layout']);
      $components[$block['acf_fc_layout'] . '_' . $index] = Component::$component_function($block);
      $components[$block['acf_fc_layout'] . '_' . $index]['name'] = $block['acf_fc_layout'];
      $index++;
    }

    return [
      'components' => $components
    ];
  }

  public static function form($data) {
    return [
      'id' => $data['id-form']
    ];
  }

  public static function coverSlider($data) {
    $return = [
        'slides' => []
    ];

    for ($i = 0; $i < $data['slides'] ; $i++) {
        $return['slides'][] = array(
            'image' => Element::image($data['slides_' . $i . '_image'], '1920px', null, true),
            'title' => $data['slides_' . $i . '_title'],
            'content' => $data['slides_' . $i . '_content'],
            'button' => $data['slides_' . $i . '_button']
        );
    }
    return $return;
  }
  // generated function here
}
