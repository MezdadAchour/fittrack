const {nextui} = require('@nextui-org/theme');
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(calendar|button|ripple|spinner).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [nextui()],
};
