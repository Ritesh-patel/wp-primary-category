<?php
namespace WPPrimartCategory\WPPrimary_Category\Helper;

/**
 * Get hierarchical taxonomies and primary term of a post.
 *
 * @param $post
 *
 * @uses get_post()
 * @uses apply_filters()
 * @uses get_object_taxonomies()
 * @uses get_post_meta()
 *
 * @return array
 */
function get_post_primary_taxonomies( $post ) {

	if ( ! is_a( $post, 'WP_Post' ) ) {
		$post = get_post( $post );
	}

	$taxonomies = array();

	if ( ! empty( $post ) ) {

		// Filter to add support for custom taxonomies
		if ( apply_filters( 'wpc_allow_custom_taxonomies', false ) ) {
			$post_type_taxonomies = get_object_taxonomies( $post->post_type, 'objects' );
			if ( ! empty( $post_type_taxonomies ) && is_array( $post_type_taxonomies ) ) {
				foreach ( $post_type_taxonomies as $taxonomy ) {
					if ( $taxonomy->hierarchical ) {
						$taxonomies[] = array(
							'taxonomy' => $taxonomy->name,
							'primary' => intval( get_post_meta( $post->ID, '_wpc_' . $taxonomy->name . '_primary', true ) ),
						);
					}
				}
			}
		} else {
			$post_type_taxonomies = get_object_taxonomies( $post->post_type, 'names' );
			if ( in_array( 'category', $post_type_taxonomies ) ) {
				$taxonomies[] = array(
					'taxonomy' => 'category',
					'primary' => intval( get_post_meta( $post->ID, '_wpc_category_primary', true ) ),
				);
			}
		}
	}

	return $taxonomies;
}