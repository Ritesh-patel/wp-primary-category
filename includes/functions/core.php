<?php
namespace WPPrimartCategory\WPPrimary_Category\Core;

use WPPrimartCategory\WPPrimary_Category\Admin as admin;

/**
 * Default setup routine
 *
 * @uses add_action()
 * @uses do_action()
 *
 * @return void
 */
function setup() {
	$n = function( $function ) {
		return __NAMESPACE__ . "\\$function";
	};

	add_action( 'init', $n( 'i18n' ) );
	add_action( 'init', $n( 'init' ) );
	add_action( 'admin_init', $n( 'admin_init' ) );

	do_action( 'wpc_loaded' );
}

/**
 * Registers the default textdomain.
 *
 * @uses apply_filters()
 * @uses get_locale()
 * @uses load_textdomain()
 * @uses load_plugin_textdomain()
 * @uses plugin_basename()
 *
 * @return void
 */
function i18n() {
	$locale = apply_filters( 'plugin_locale', get_locale(), 'wpc' );
	load_textdomain( 'wpc', WP_LANG_DIR . '/wpc/wpc-' . $locale . '.mo' );
	load_plugin_textdomain( 'wpc', false, plugin_basename( WPC_PATH ) . '/languages/' );
}

/**
 * Initializes the plugin and fires an action other plugins can hook into.
 *
 * @uses do_action()
 *
 * @return void
 */
function init() {
	do_action( 'wpc_init' );
}

/**
 * Initialize admin section.
 *
 * @return void
 */
function admin_init(){
	admin\init();
}
