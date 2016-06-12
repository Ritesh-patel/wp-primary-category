# WP Primary Category #
* **Contributors:**      Ritesh Patel
* **Tags:**              category, primary category
* **Requires at least:** 4.0
* **Tested up to:**      4.5.2
* **Stable tag:**        0.1.0
* **License:**           GPL-2.0+
* **License URI:**       [https://opensource.org/licenses/GPL-2.0](https://opensource.org/licenses/GPL-2.0)

A simple plugin to set primary category of a post.

## Description ##
WP Primary Category allows post authors to set primary category for a post which have multiple categories.

### How To Use ###
* Each post's primary category will be stored in post meta
* Meta key **_wpc_category_primary** will hold the category id of primary category

### Support For Custom Taxonomies ###
* Use **wpc_allow_custom_taxonomies** filter and return *true* to enable Custom Taxonomy support
* Meta key **_wpc_taxonomyname_primary** will hold term id of Custom Taxonomy. Replace **taxonomyname** with your Custom Taxonomy name
