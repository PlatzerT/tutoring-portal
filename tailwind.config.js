module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: ['Open Sans', 'sans-serif'],
		},
		extend: {
			colors: {
				primary: 'var(--primary)',
				dark: 'var(--dark)',
				light: 'var(--light)',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
