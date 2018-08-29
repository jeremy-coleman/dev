 
 ```js
 
            [StylusPlugin(), PostCSSPlugin(POSTCSS_PLUGINS),CSSResourcePlugin(), 
                CSSPlugin({
                    outFile: (file) => `./dist/${file}`
                    inject: (file) => `${file}`
                })
            ],
```


```js
      ['.styl',
        StylusPlugin({
          compress: isProduction,
          paths: [
            path.join(__dirname, 'app/styles/common/'),
            path.join(__dirname, 'app/styles/components/'),
            path.join(__dirname, 'app/styles/fonts/')
          ]
        }),
        CSSResourcePlugin({
          resolve: file => `/static/${file}`,
          macros: {
            static: `${__dirname}/app/`
          },
          dist: `${__dirname}/.dist/app/static`
        }),
        CSSPlugin()
      ],
 ```