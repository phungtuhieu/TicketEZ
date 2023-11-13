module.exports = {
    content: [
        './src/pages/User/**/*.{js,jsx,ts,tsx}',
        //  loại bỏ thư mục Admin
        '!./src/pages/Admin/**/*.{js,jsx,ts,tsx}',
        '!./src/components/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
