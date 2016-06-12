<?php
namespace WPPrimartCategory\WPPrimary_Category\Admin;

use WPPrimartCategory\WPPrimary_Category\Helper as helper;

/**
 * Admin setup
 *
 * @uses add_action()
 *
 * @return void
 */
function init(){
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'submitpost_box', $n( 'add_admin_views' ), 10, 1 );
	add_action( 'admin_enqueue_scripts', $n( 'admin_scripts' ), 10, 1 );
	add_action( 'save_post', $n( 'set_primary_taxonomy' ), 10, 3 );
}

/**
 * include js view templates and nonce.
 *
 * @param $post
 *
 * @uses wp_nonce_field()
 */
function add_admin_views( $post ) {
	// Load js templates to be used by wp.template
	admin_js_templates();

	// Add nonce field for security prupose
	wp_nonce_field( 'wpc_set_primary_nonce', 'wpc_set_primary_nonce' );
}

/**
 * Enqueue admin js and css files
 *
 * @param $hook
 *
 * @uses get_post()
 * @uses wp_enqueue_style()
 * @uses wp_enqueue_script()
 * @uses wp_localize_script()
 */
function admin_scripts( $hook ) {
	if ( 'post.php' == $hook ) {

		// get current post
		$post_obj = get_post();

		if ( ! empty( $post_obj ) ) {

			// get hierarchical taxonomy of current post
			$taxonomies = helper\get_post_primary_taxonomies( $post_obj );

			$l10n = array(
				'taxonomies' => $taxonomies,
			);

			if ( ! empty( $taxonomies ) ) {
				// enqueue css file
				wp_enqueue_style( 'wpc-admin', WPC_URL . 'assets/css/wpc-admin.min.css', array(), WPC_VERSION );

				$min = '';
				if( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ){
					$min = '.min';
				}
				// enqueue js file and dependent js vars
				wp_enqueue_script( 'wpc-admin', WPC_URL . "assets/js/wpc-admin{$min}.js", array( 'jquery' ), WPC_VERSION, true );
				// Localise required js variables to be used by script.
				wp_localize_script( 'wpc-admin', 'wpcl10n', $l10n );
			}
		}
	}
}

/**
 * Set post's primary category
 *
 * @param $post_id
 * @param $post
 * @param $update
 *
 * @uses filter_input()
 * @uses wp_verify_nonce()
 * @uses update_post_meta()
 * @uses delete_post_meta()
 * @uses do_action()
 *
 * @return void
 */
function set_primary_taxonomy( $post_id, $post, $update ) {

	$nonce = filter_input( INPUT_POST, 'wpc_set_primary_nonce' );

	// Proceed only if valid request
	if ( ! empty( $nonce ) && wp_verify_nonce( $nonce, 'wpc_set_primary_nonce' ) ) {

		// get hierarchical taxonomy of current post
		$taxonomies = helper\get_post_primary_taxonomies( $post );

		if ( ! empty( $taxonomies ) && is_array( $taxonomies ) ) {
			foreach ( $taxonomies as $taxonomy ) {

				$tax_primary = filter_input( INPUT_POST, 'wpc_' . $taxonomy['taxonomy'] . '_primary', FILTER_SANITIZE_NUMBER_INT );

				// If primary term is not exist than delete post meta for that taxonomy
				if ( $tax_primary > 0 && has_term( $tax_primary, $taxonomy['taxonomy'], $post ) ) {
					update_post_meta( $post_id, '_wpc_' . $taxonomy['taxonomy'] . '_primary', $tax_primary );
					$action = 'update';
				} else {
					delete_post_meta( $post_id, '_wpc_' . $taxonomy['taxonomy'] . '_primary' );
					$action = 'delete';
				}

				// Do action on updating/delete of primary taxonomy term
				do_action( 'wpc_set_primary_term', $post, $taxonomy['taxonomy'], $tax_primary, $action );
			}
		}
	}
}

/**
 * Print js templates to be use by wp.template
 *
 * @return void
 */
function admin_js_templates(){
?>
	<script type="text/html" id="tmpl-wpc-set-admin-views">
		<a href="#" class="wpc-set-primary" data-tax="{{data.taxonomy}}"><?php esc_html_e( 'Set Primary', 'wpc' ) ?></a>
	</script>
	<script type="text/html" id="tmpl-wpc-unset-admin-views">
		<a href="#" class="wpc-unset-primary" data-tax="{{data.taxonomy}}"><?php esc_html_e( 'Unset Primary', 'wpc' ) ?></a>
	</script>
	<?php
}