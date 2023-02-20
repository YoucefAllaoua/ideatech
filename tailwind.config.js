/** @type {import('tailwindcss').Config} */
module.exports = {
	plugins: [
		require("cssnano")({
			preset: "default",
		}),
	],
	theme: {
		screens: {
			"2xl": { max: "1535px" },
			// => @media (max-width: 1535px) { ... }

			xl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }

			lg: { max: "1023px" },
			// => @media (max-width: 1023px) { ... }

			md: { max: "768px" },
			// => @media (max-width: 767px) { ... }

			sm: { max: "639px" },
			// => @media (max-width: 639px) { ... }
		},
	},

	mode: "jit",

	// These paths are just examples, customize them to match your project structure
	content: ["./**/*.{html,css,js}"],
	...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
};
