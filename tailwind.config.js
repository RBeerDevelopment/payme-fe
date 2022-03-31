
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./sections/**/*.{js,ts,jsx,tsx}",
        "./views/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "paypal": "#0079C1",
                "sepa": "#76B947"
            },
            keyframes: {
                "fadein-right": {
                    "0%": {
                        opacity: 0
                    },
                    "100%": {
                        opacity: 1
                    },
                }
            },
            animation: {
                wiggle: "fadein-right 1s ease-in-out",
            }
        }
    },
    variants: {
        extend: {
            backgroundColor: ["active"],
        },
    },
    plugins: [
        require("@tailwindcss/forms")
    ]
};
