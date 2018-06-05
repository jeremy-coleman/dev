const { spawn } = require('child_process');
const { CSSResourcePlugin, LESSPlugin, CSSPlugin, EnvPlugin, FuseBox, QuantumPlugin, SassPlugin,
    Sparky, CopyPlugin, SVGPlugin, ImageBase64Plugin, JSONPlugin } = require('fuse-box');


//let isProduction = false;

let VENDOR_CSS = [
  "node_modules/@blueprintjs/core/lib/css/blueprint.css",
  "node_modules/antd/dist/antd.css",
  "node_modules/react-mosaic-component/react-mosaic-component.css",
  "node_modules/material-components-web/dist/material-components-web.min.css"
]

Sparky.task("copy-html", () => Sparky.src("src/app/index.html").dest("dist/app/$name"));
Sparky.task("copy-external-css", () => Sparky.src(VENDOR_CSS).dest("dist/app/assets/css/$name"));
Sparky.task("copy-fonts", () => Sparky.src("**/*.ttf", { base: "src/app/assets" }).dest("dist/app/assets"));

const ASSETS = ["*.jpg", "*.png", "*.jpeg", "*.gif", "*.svg"]

Sparky.task("build:app", ["copy-html", "copy-external-css", "copy-fonts"], () => {
    const fuse = FuseBox.init({
        homeDir: "src/app",
        output: "dist/app/$name.js",
        target: "electron",
        cache: true,
        plugins: [
            [SassPlugin({importer: true}), CSSResourcePlugin(), CSSPlugin()],
            [LESSPlugin(), CSSPlugin()],
            CSSPlugin(),
            SVGPlugin(),
            ImageBase64Plugin(),
            JSONPlugin(),
            CopyPlugin({ useDefault: false, files: ASSETS, dest: "assets", resolve: "assets/" }),
            EnvPlugin({ NODE_ENV: "development" })

        ],
    });

    fuse.dev({port: 9696, httpServer: false})

    const bundle = fuse
        .bundle("app")
        .target("electron")
        .instructions("> [index.tsx] + fuse-box-css")
        .watch()
        .hmr();
    


    return fuse.run();
});

Sparky.task("build:desktop", () => {
        const fuse = FuseBox.init({
            homeDir: "src/desktop",
            output: "dist/desktop/$name.js",
            target: "server",
            cache: true,
            plugins: [
                EnvPlugin({ NODE_ENV: "development" })
            ],
        });

        const bundle = fuse
            .bundle("desktop")
            .target("server")
            .instructions("> [main.ts]")
            .watch();

            return fuse.run().then(() => {
                spawn("node", [`${__dirname}/node_modules/electron/cli.js`, __dirname], {stdio: "inherit"})
                .on("exit", () => process.exit(0))
            });
        

        //return fuse.run();
    });


// clean
Sparky.task("clean:dist", () => Sparky.src("dist/*").clean("dist/"));
Sparky.task("clean:cache", () => Sparky.src(".fusebox/*").clean(".fusebox/"));
Sparky.task("clean:all", ["clean:dist", "clean:cache"]);


Sparky.task("clean:cache", () => Sparky.src(".fusebox/*").clean(".fusebox/"));
Sparky.task("default", ["clean:dist", "clean:cache", "build:app", "build:desktop"], () => { });

//Sparky.task("set-prod-env", () => isProduction = true);
//Sparky.task("build:production", ["set-prod-env", "default"], () => { });
