/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dbz-orange': '#FF9900',
                'dbz-blue': '#003366',
                'dbz-gold': '#FFCC00',
                'radar-green': '#00FF41',
            },
        },
    },
    plugins: [],
}
