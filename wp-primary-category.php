<?php
/**
 * Plugin Name: WP Primary Category
 * Plugin URI:  https://github.com/ritesh-patel/wp-primary-category
 * Description: WP Primary Category allows post authors to set primary category for a post which have multiple categories.
 * Version:     0.1.0
 * Author:      Ritesh Patel
 * Author URI:  http://riteshpatel.me/
 * Text Domain: wpc
 * Domain Path: /languages
 * License:     GPL-2.0+
 */

/**
 * Copyright (c) 2016 Ritesh Patel
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

/**
 * Built using yo wp-make:plugin
 * Copyright (c) 2016 10up, LLC
 * https://github.com/10up/generator-wp-make
 */

// Useful global constants
define( 'WPC_VERSION', '0.1.0' );
define( 'WPC_URL',     plugin_dir_url( __FILE__ ) );
define( 'WPC_PATH',    dirname( __FILE__ ) . '/' );
define( 'WPC_INC',     WPC_PATH . 'includes/' );

// Include files
require_once WPC_INC . 'functions/core.php';
require_once WPC_INC . 'functions/helper.php';
require_once WPC_INC . 'admin/admin.php';

// Bootstrap
WPPrimartCategory\WPPrimary_Category\Core\setup();