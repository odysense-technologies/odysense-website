<?php
/**
 * Plugin Name: Odysense credit
 * Description: A one-line "built by Odysense" credit for sites Odysense built. Use the [odysense_credit] shortcode in the footer, or switch on ODYSENSE_CREDIT_AUTO below.
 * Version: 1.0.0
 * Author: Odysense
 * Author URI: https://odysense.com/
 *
 * Install: upload this file to wp-content/mu-plugins/ (create the folder if needed). It loads automatically.
 *
 * Shortcode: [odysense_credit type="store|website|app|software|branding" lang="en|ar"]
 *   type defaults to "store"; lang defaults to the page language (WPML / Polylang / site locale).
 *
 * Rules: only the word "Odysense" is linked, one visible credit per page, no tracking parameters.
 * See docs/offsite/client-site-credit.md in the odysense-website repository.
 */

if (!defined('ABSPATH')) {
	exit;
}

/** Set to true to print the credit at the end of every page when the theme has no editable footer. */
if (!defined('ODYSENSE_CREDIT_AUTO')) {
	define('ODYSENSE_CREDIT_AUTO', false);
}

/** Default project type for the automatic credit. */
if (!defined('ODYSENSE_CREDIT_TYPE')) {
	define('ODYSENSE_CREDIT_TYPE', 'store');
}

function odysense_credit_is_arabic() {
	if (defined('ICL_LANGUAGE_CODE')) {
		return ICL_LANGUAGE_CODE === 'ar'; // WPML
	}
	if (function_exists('pll_current_language')) {
		return pll_current_language() === 'ar'; // Polylang
	}
	return strpos(determine_locale(), 'ar') === 0;
}

function odysense_credit_html($type = 'store', $lang = '') {
	$pages = array(
		'store'    => array('ecommerce-development-company-qatar/', 'E-commerce development by', 'تطوير المتجر:'),
		'website'  => array('website-design-company-in-qatar/', 'Website by', 'تصميم وتطوير الموقع:'),
		'app'      => array('mobile-app-development-company-qatar/', 'App by', 'تطوير التطبيق:'),
		'software' => array('software-development-company-qatar/', 'Built by', 'تطوير:'),
		'branding' => array('branding-agency-qatar/', 'Brand and website by', 'الهوية والموقع:'),
	);
	$page = isset($pages[$type]) ? $pages[$type] : $pages['store'];
	$ar   = $lang === 'ar' || ($lang === '' && odysense_credit_is_arabic());
	$href = 'https://odysense.com/' . ($ar ? 'ar/' : '') . $page[0];
	$text = $ar ? $page[2] : $page[1];

	return sprintf(
		'<p class="odysense-credit"%s style="margin:0;font-size:12px;opacity:.75">%s <a href="%s" style="color:inherit;text-decoration:underline">Odysense</a></p>',
		$ar ? ' dir="rtl" lang="ar"' : '',
		esc_html($text),
		esc_url($href)
	);
}

add_shortcode('odysense_credit', function ($atts) {
	$atts = shortcode_atts(array('type' => 'store', 'lang' => ''), $atts, 'odysense_credit');
	return odysense_credit_html(sanitize_key($atts['type']), sanitize_key($atts['lang']));
});

if (ODYSENSE_CREDIT_AUTO) {
	add_action('wp_footer', function () {
		echo '<div class="odysense-credit-wrap" style="text-align:center;padding:12px 16px">' . odysense_credit_html(ODYSENSE_CREDIT_TYPE) . '</div>';
	});
}
