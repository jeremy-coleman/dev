const { spawn } = require('child_process');
const { CSSResourcePlugin, LESSPlugin, CSSPlugin, EnvPlugin, FuseBox, QuantumPlugin, SassPlugin,
    Sparky, CopyPlugin, SVGPlugin, ImageBase64Plugin, JSONPlugin ,PostCSSPlugin, StylusPlugin, WebIndexPlugin} = require('fuse-box');


//let isProduction = false;


//-------------------------------asset configs -----------------------------------//

let VENDOR_CSS = [
  "node_modules/@blueprintjs/core/lib/css/blueprint.css",
]

const ASSETS = ["*.jpg", "*.png", "*.jpeg", "*.gif", "*.svg"]

//--------------------------postcss setup----------------------------------//
var purgecss = require('@fullhuman/postcss-purgecss')
//var tailwindcss = require('tailwindcss');
//require("postcss-url")(({url: 'rebase'})),

const POSTCSS_PLUGINS = [
        require('postcss-omit-import-tilde')(),
        require('postcss-easy-import')(),
        require('postcss-preset-env')({ browsers: 'last 2 Chrome versions' }),
        require('postcss-inline-svg')(),
        require('postcss-svgo')(),
        require('postcss-font-smoothing')(),
        purgecss({
          content: ['src/**/*.html', 'src/**/*.tsx', 'src/**/*.ts', 'src/**/*.hbs', 'src/**/*.js', 'static/**/*.html']
        }),
        require('postcss-csso')({ restructure: true })
 ]


//---------------------------client client-------------------------------------------//

Sparky.task("build:client", () => {
    const fuse = FuseBox.init({
        log: false,
        debug: false,
        homeDir: "src",
        output: "dist/client/$name.js",
        target: "electron",
        useTypescriptCompiler: true,
        cache: true,
        plugins: [
            //[SassPlugin({importer: true}), CSSResourcePlugin(), CSSPlugin()],
            [SassPlugin({importer: true}), PostCSSPlugin(POSTCSS_PLUGINS), CSSResourcePlugin(), 
                CSSPlugin({
                    group: "styles.min.css",
                    outFile: "dist/client/styles.min.css"
                })
            ],
            
            //[LESSPlugin(), CSSPlugin()],
            [LESSPlugin(), PostCSSPlugin(POSTCSS_PLUGINS), CSSResourcePlugin(), 
                CSSPlugin({
                    group: "styles.min.css",
                    outFile: "dist/client/styles.min.css"
                })
            ],
            
            [StylusPlugin(), PostCSSPlugin(POSTCSS_PLUGINS), CSSResourcePlugin(), 
                CSSPlugin({
                    group: "styles.min.css",
                    outFile: "dist/client/styles.min.css"
                })
            ],
            CSSPlugin(),
            SVGPlugin(),
            ImageBase64Plugin(),
            JSONPlugin(),
            CopyPlugin({ useDefault: false, files: ASSETS, dest: "assets", resolve: "assets/" }),
            EnvPlugin({ NODE_ENV: "development" }),
            //WebIndexPlugin({title: 'Coglite', template: 'src/client/index.html', path: "./"}),

        ],
    });

    fuse.dev({port: 9696, httpServer: false})

    fuse
        .bundle("client")
        .target("electron")
        .instructions("> [client/index.tsx] + fuse-box-css")
        .watch()
        .hmr();
    

    return fuse.run();
});


//-----------------------------electron desktop ---------------------------------------------------//

Sparky.task("build:desktop", () => {
        const fuse = FuseBox.init({
            log: false,
            debug: true,
            homeDir: "src",
            useTypescriptCompiler: true,
            output: "dist/desktop/$name.js",
            target: "server",
            cache: true,
            plugins: [
                EnvPlugin({ NODE_ENV: "development" })
            ],

        });

          fuse
            .bundle("main")
            .target("server")
            .instructions("> [desktop/main.ts]")
            .watch();

            return fuse.run().then(() => {
                spawn("node", [`${__dirname}/node_modules/electron/cli.js`, __dirname], {stdio: "inherit"})
                .on("exit", () => process.exit(0))
            });
        
    });
    
//-----------------------------electron desktop ---------------------------------------------------//

Sparky.task("build:server", () => {
        const fuse = FuseBox.init({
            log: false,
            debug: false,
            homeDir: "src",
            output: "dist/server/$name.js",
            target: "server",
            useTypescriptCompiler: true,
            cache: true,
            plugins: [
                EnvPlugin({ NODE_ENV: "development" })
            ],

        });

          fuse
            .bundle("main")
            .target("server")
            .instructions("> [server/main.ts]")
            .watch();

            return fuse.run().then(() => {
                spawn("node", ['dist/server/main.js'], {stdio: "inherit"})
                .on("exit", () => process.exit(0))
            });
        
    });


//--------------------------------------- final tasks ------------------------------------------//


// clean
Sparky.task("clean:dist", () => Sparky.src("dist/*").clean("dist/"));
Sparky.task("clean:cache", () => Sparky.src(".fusebox/*").clean(".fusebox/"));
Sparky.task("clean", ["clean:dist", "clean:cache"]);

//assets
Sparky.task("copy-html", () => Sparky.src("src/client/index.html").dest("dist/client/$name"));
Sparky.task("copy-external-css", () => Sparky.src(VENDOR_CSS).dest("dist/client/assets/css/$name"));
Sparky.task("copy-fonts", () => Sparky.src("**/*.ttf", { base: "src/client/assets" }).dest("dist/client/assets"));

//compile
Sparky.task("build:assets", ["copy-html", "copy-external-css", "copy-fonts"])

Sparky.task("build:fullstack", ["clean", "build:assets", "build:client", "build:desktop", "build:server"])
Sparky.task("build:platform:desktop", ["clean", "build:assets", "build:client", "build:desktop"]);

Sparky.task("default", ["clean", "build:assets", "build:client", "build:desktop"]);



//--------------------------unused tasks-------------------------------------//
//Sparky.task("build:client", ["bundle:client", "copy-html", "copy-external-css", "copy-fonts"])