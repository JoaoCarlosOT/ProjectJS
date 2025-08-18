/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background:'var(--background)',
        texto:'var(--texto)',
        card:'var(--card)',
        button:'var(--button)',
        outborder:'var(--outborder)',
      },
      screens: {
        'xs': '400px',      
        'sm': '640px',      
        'md': '768px',      
        'lg': '1024px',     
        'lg-custom': '1050px', 
        'xl': '1280px',     
        '2xl': '1536px',    
      },
    },
  },
  plugins: [],
}
