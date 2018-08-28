var purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
    plugins: [
        require('postcss-easy-import')(),
        require('postcss-preset-env')({ browsers: 'last 2 Chrome versions' }),
        require('postcss-inline-svg')(),
        require('postcss-svgo')(),
        purgecss({content: ['src/**/*.html', 'src/**/*.tsx', 'src/**/*.ts', 'src/**/*.hbs', 'src/**/*.js']}),
        require('postcss-discard-duplicates'),
        //require('postcss-csso')({ restructure: false }),
    ]
};