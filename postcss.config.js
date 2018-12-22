var purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
    plugins: [
        require('postcss-easy-import')(),
        require('postcss-preset-env')({ browsers: 'last 2 Chrome versions' }),
        //require('postcss-advanced-variables')(),
        require('postcss-svg')(),
        require('postcss-svgo')(),
        purgecss({content: ['./src/client/**/*.html', './src/client/**/*.tsx', './src/client/**/*.ts', './src/client/**/*.hbs', './src/client/**/*.js']}),
        require('postcss-csso')({ restructure: true }),
        require('postcss-discard-duplicates'),
    ]
};


        // require('postcss-custom-url')([
        //       //['inline', { maxSize: 10 }],
        //       ['copy', {
        //         assetOutFolder: __dirname + 'dist/client/assets',
        //         baseUrl: 'assets',
        //         name: '[name].[hash]',
        //       }],
        // ]),
        //require("postcss-url")(({url: 'inline'})),