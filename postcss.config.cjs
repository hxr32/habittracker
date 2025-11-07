module.exports = {
  plugins: [
    // Use the separate PostCSS plugin package for Tailwind
    require('@tailwindcss/postcss'),
    require('autoprefixer')
  ]
}
