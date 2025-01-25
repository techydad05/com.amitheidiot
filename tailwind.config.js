import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [
		import('@tailwindcss/typography'),
		daisyui
	],

	daisyui: {
		themes: ["light", "dark"],
		darkTheme: "dark",
	}
};
