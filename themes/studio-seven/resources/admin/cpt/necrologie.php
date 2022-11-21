<?php
/*
* Creating a function to create our CPT
*/
  
function custom_post_type_necrologie() {
    $labels = array(
        'name'                => _x( 'Décès', 'Post Type General Name', 'studio-seven' ),
        'singular_name'       => _x( 'Décès', 'Post Type Singular Name', 'studio-seven' ),
        'menu_name'           => __( 'Décès', 'studio-seven' ),
        'parent_item_colon'   => __( 'Parent Décès', 'studio-seven' ),
        'all_items'           => __( 'Tous les décès', 'studio-seven' ),
        'view_item'           => __( 'Voir le décès', 'studio-seven' ),
        'add_new_item'        => __( 'Ajouter un décès', 'studio-seven' ),
        'add_new'             => __( 'Ajouter un nouveau', 'studio-seven' ),
        'edit_item'           => __( 'Éditer le décès', 'studio-seven' ),
        'update_item'         => __( 'Mettre à jour le décès', 'studio-seven' ),
        'search_items'        => __( 'Chercher un décès', 'studio-seven' ),
        'not_found'           => __( 'Pas trouvé', 'studio-seven' ),
        'not_found_in_trash'  => __( 'Pas trouvé dans la corbeille', 'studio-seven' ),
    );
      
    $args = array(
        'label'               => __( 'necrologie', 'studio-seven' ),
        'description'         => __( 'Décès news and reviews', 'studio-seven' ),
        'labels'              => $labels,
        'supports'            => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'comments', 'revisions', 'custom-fields', ),
        'taxonomies'          => array( 'genres' ),
        'hierarchical'        => false,
        'public'              => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_admin_bar'   => true,
        'menu_position'       => 5,
        'can_export'          => true,
        'has_archive'         => true,
        'exclude_from_search' => false,
        'publicly_queryable'  => true,
        'capability_type'     => 'post',
        'show_in_rest' => true,
  
    );
      
    register_post_type( 'Décès', $args );
  
}
  
add_action( 'init', 'custom_post_type_necrologie', 0 );
