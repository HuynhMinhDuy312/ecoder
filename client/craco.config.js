/**
 * Author: Nam Dinh
 * Created At: Sat Apr 16 2022
 * File name: craco.config.js
 */

const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@controllers': path.resolve(
                __dirname,
                'src',
                'controllers'
            ),
            '@services': path.resolve(__dirname, 'src', 'services'),
            '@screens': path.resolve(__dirname, 'src', 'screens'),
            '@hooks': path.resolve(__dirname, 'src', 'hooks'),
            '@components': path.resolve(
                __dirname,
                'src',
                'components'
            ),
            '@assets': path.resolve(__dirname, 'src', 'assets'),
        },
    },
};
