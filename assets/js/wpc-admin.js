/*! WP Primary Category - v0.1.0
 * https://github.com/ritesh-patel/wp-primary-category
 * Copyright (c) 2016; * Licensed GPL-2.0+ */
/*! WP Primary Category - v0.1.0
 * https://github.com/ritesh-patel/wp-primary-category
 * Copyright (c) 2016; * Licensed GPL-2.0+ */
/*! WP Primary Category - v0.1.0
 * https://github.com/ritesh-patel/wp-primary-category
 * Copyright (c) 2016; * Licensed GPL-2.0+ */
( function( window, undefined ) {
	'use strict';

	// WP template for "Set Primary" UI
	var setWpcTmpl = wp.template( 'wpc-set-admin-views' );

	// WP template for "Unset Primary" UI
	var unsetWpcTmpl = wp.template( 'wpc-unset-admin-views' );

	/**
	 * Init and render the UI which will show "Set/Unset Primary" links.
	 *
	 * @param taxonomy
	 */
	var setPrimaryViewUI = function( taxonomy ){
		var parentEl = document.getElementById( taxonomy.taxonomy + 'checklist' );
		var childEls, i, pcEl, tmplData, tmplCnt;

		if( null !== parentEl ){

			childEls = parentEl.getElementsByTagName('li');

			if( childEls.length > 0 ){

				// Build WP Template data
				tmplData = {
					taxonomy : taxonomy.taxonomy
				};
				for( i=0; i<childEls.length; i++ ){

					// If is primary than render "Unset" link other wise "Set" link.
					if( jQuery( childEls[i]).find( 'input[type=checkbox]').val() == taxonomy.primary ){
						tmplCnt = unsetWpcTmpl( tmplData );
					} else {
						tmplCnt = setWpcTmpl( tmplData );
					}

					// Append the html markup
					childEls[i].innerHTML = childEls[i].innerHTML + tmplCnt;
				}
			}

			// Taxonomy wise hidden field which will hold the primary term id.
			pcEl = document.createElement( 'input' );
			pcEl.name = 'wpc_' + taxonomy.taxonomy + '_primary';
			pcEl.type = 'hidden';
			pcEl.value = taxonomy.primary;
			parentEl.parentNode.appendChild( pcEl );
		}
	};

	jQuery( '.categorydiv' ).click( function( e ){
		var el = e.target;
		var termEl, tmplData, parentEl, parentParentEl;
		if( el.className.indexOf( 'wpc-set-primary' ) > -1 ){
			parentEl = el.parentNode;

			// build wp template data
			tmplData = {
				taxonomy : el.dataset.tax
			};

			// replace already "unset primary" element to "set primary" if any
			var ex_el = parentEl.parentNode.getElementsByClassName( 'wpc-unset-primary' );
			if( ex_el.length > 0 ){
				parentParentEl = ex_el[0].parentNode;
				parentParentEl.removeChild( ex_el[0] );
				parentParentEl.innerHTML = parentParentEl.innerHTML + setWpcTmpl( tmplData );
			}

			// replace "set primary" element to "unset primary"
			el.parentNode.removeChild( el );
			parentEl.innerHTML = parentEl.innerHTML + unsetWpcTmpl( tmplData );

			// set primary value in hidden field and check the term
			termEl = jQuery( parentEl ).find( 'input[type=checkbox]' )[0];
			document.getElementsByName( 'wpc_' + el.dataset.tax + '_primary' )[0].value = termEl.value;
			termEl.checked = true;

			e.preventDefault();
		} else if( el.className.indexOf( 'wpc-unset-primary' ) > -1 ){
			parentEl = el.parentNode;

			// build wp template data
			tmplData = {
				taxonomy : el.dataset.tax
			};

			// replace "unset primary" element to "set primary"
			el.parentNode.removeChild( el );
			parentEl.innerHTML = parentEl.innerHTML + setWpcTmpl( tmplData );

			// reset primary value in hidden field and check the term
			document.getElementsByName( 'wpc_' + el.dataset.tax + '_primary' )[0].value = 0;
			termEl = jQuery( parentEl ).find( 'input[type=checkbox]' )[0];
			termEl.checked = true;

			e.preventDefault();
		}
	});

	// Start the magic.
	if( "object" === typeof wpcl10n && wpcl10n.taxonomies.length > 0 ){
		// Init primary term UI for each taxonomy box
		for( var i=0; i<wpcl10n.taxonomies.length; i++ ){
			setPrimaryViewUI( wpcl10n.taxonomies[i] );
		}
	}

} )( this );
