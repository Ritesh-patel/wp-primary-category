/*! WP Primary Category - v0.1.0
 * https://github.com/ritesh-patel/wp-primary-category
 * Copyright (c) 2016; * Licensed GPL-2.0+ */
( function( window ) {
	'use strict';

	// WP template for "Set Primary" UI
	var setWpcTmpl = wp.template( 'wpc-set-admin-views' );

	// WP template for "Unset Primary" UI
	var unSetWpcTmpl = wp.template( 'wpc-unset-admin-views' );

	/**
	 * Closure which contains all the functions and vars.
	 *
	 * @type {{setPrimaryViewUI, setPrimary, unSetPrimary}}
	 */
	var wpPc = ( function(){
		var termEl, tmplData, parentEl, parentParentEl, childEls, i, pcEl, tmplCnt;

		// Get elements taxonomy details from data attr
		function getElTmplData( el ){
			return {
				taxonomy : el.dataset.tax
			};
		}

		// Set primary term id into post's taxonomy hidden field
		function setPrimaryVal( el, val ){
			termEl = jQuery( parentEl ).find( 'input[type=checkbox]' )[0];
			termEl.checked = true;

			if( "undefined" === typeof val ){
				val = 0;
			} else {
				val = termEl.value;
			}
			document.getElementsByName( 'wpc_' + el.dataset.tax + '_primary' )[0].value = val;
		}

		// replace Set/Unset Primary element
		function replaceItem( el, is_set ){
			el.parentNode.removeChild( el );
			tmplData = getElTmplData( el );
			if( "undefined" === typeof is_set ){
				parentEl.innerHTML = parentEl.innerHTML + setWpcTmpl( tmplData );
			} else {
				parentEl.innerHTML = parentEl.innerHTML + unSetWpcTmpl( tmplData );
			}
		}

		return {
			// Init and render the UI which will show "Set/Unset Primary" links.
			setPrimaryViewUI : function( taxonomy ){
				parentEl = document.getElementById( taxonomy.taxonomy + 'checklist' );
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
								tmplCnt = unSetWpcTmpl( tmplData );
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
			},

			// Set primary term of a taxonomy
			setPrimary : function( el ){
				parentEl = el.parentNode;

				// build wp template data
				tmplData = getElTmplData( el );

				// replace already "unset primary" element to "set primary" if any
				var ex_el = parentEl.parentNode.getElementsByClassName( 'wpc-unset-primary' );
				if( ex_el.length > 0 ){
					parentParentEl = ex_el[0].parentNode;
					parentParentEl.removeChild( ex_el[0] );
					parentParentEl.innerHTML = parentParentEl.innerHTML + setWpcTmpl( tmplData );
				}

				replaceItem( el, true);
				setPrimaryVal( el, true );
			},

			// reset primary term of a taxonomy
			unSetPrimary : function( el ){
				replaceItem( el );
				setPrimaryVal( el );
			}
		};
	})();

	jQuery( '.categorydiv' ).click( function( e ){
		var el = e.target;

		// check if clicked element is to "Set Primary"
		if( el.className.indexOf( 'wpc-set-primary' ) > -1 ){
			wpPc.setPrimary( el );
			e.preventDefault();

		// check if clicked element is to "Unset Primary"
		} else if( el.className.indexOf( 'wpc-unset-primary' ) > -1 ){
			wpPc.unSetPrimary( el );
			e.preventDefault();
		}
	});

	// Start the magic.
	if( "object" === typeof wpcl10n && wpcl10n.taxonomies.length > 0 ){
		// Init primary term UI for each taxonomy box
		for( var i=0; i<wpcl10n.taxonomies.length; i++ ){
			wpPc.setPrimaryViewUI( wpcl10n.taxonomies[i] );
		}
	}

} )( this );
