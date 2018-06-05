const {FuseBox,SassPlugin,CSSPlugin,WebIndexPlugin,Sparky,UglifyJSPlugin,QuantumPlugin,EnvPlugin, CopyPlugin, LESSPlugin} = require("fuse-box");
const express = require("express");
const path = require("path");
const {spawn} = require("child_process");

let producer
const production = process.env.NODE_ENV === "production" || false

let VENDOR_CSS = [
    "node_modules/@blueprintjs/core/lib/css/blueprint.css",
    "node_modules/antd/dist/antd.css",
    "node_modules/react-mosaic-component/react-mosaic-component.css",
    "node_modules/material-components-web/dist/material-components-web.min.css"
  ]
  

Sparky.task("copy-external-css", () => Sparky.src(VENDOR_CSS).dest("dist/app/assets/css/$name"));

const OUTPUT_DIR = "dist"
const ASSETS = ["*.jpg", "*.png", "*.jpeg", "*.gif", "*.svg"]

Sparky.task("build:app", ["copy-external-css"], () => {
    const fuse = FuseBox.init({
        homeDir: "src/app",
        output: "dist/app/$name.js",
        hash: production,
        target: "electron",
        cache: !production,
        plugins: [
            EnvPlugin({ NODE_ENV: production ? "production" : "development" }),
            [SassPlugin(), CSSPlugin()],
            [LESSPlugin(), CSSPlugin()],
            WebIndexPlugin({
                title: "Coglite Desktop",
                template: "src/app/index.html",
                path: production ? "." : "/app/"
            }),
            production && QuantumPlugin({
                bakeApiIntoBundle : 'app',
                target : 'electron',
                treeshake: true,
                removeExportsInterop: false,
                uglify: true
            })
        ]
    });

    if (!production) {
        fuse.dev({ root: false }, server => {
            const dist = path.join(__dirname, "dist");
            const app = server.httpServer.app;
            app.use("/app/", express.static(path.join(dist, 'app')));
            app.get("*", function(req, res) {
                res.sendFile(path.join(dist, "app/index.html"));
            });
        })
    }

    const app = fuse.bundle("app")
        .instructions('> [index.tsx] + fuse-box-css')
        .plugin(CSSPlugin())
        .plugin(CopyPlugin({ useDefault: false, files: ASSETS, dest: "assets", resolve: "assets/" }))

    if (!production) {
        app.hmr().watch()
    }

    return fuse.run()
});

Sparky.task("build:desktop", () => {
    const fuse = FuseBox.init({
        homeDir: "src/desktop",
        output: "dist/desktop/$name.js",
        target: "server",
        cache: !production,
        plugins: [
            EnvPlugin({ NODE_ENV: production ? "production" : "development" }),
            production && QuantumPlugin({
                bakeApiIntoBundle : 'desktop',
                target : 'server',
                treeshake: true,
                removeExportsInterop: false,
                uglify: true
            })
        ]
    });

    const app = fuse.bundle("desktop")
        .instructions('> [main.ts]')

    if (!production) {
        app.watch()

        return fuse.run().then(() => {
            spawn("node", [`${__dirname}/node_modules/electron/cli.js`, __dirname], {stdio: "inherit"})
            .on("exit", () => process.exit(0))
        });
    }

    return fuse.run()
});


// dev
Sparky.task("default", ["clean:dist", "clean:cache", "build:app", "build:desktop"], () => {});

// clean
Sparky.task("clean:dist", () => Sparky.src("dist/*").clean("dist/"));
Sparky.task("clean:cache", () => Sparky.src(".fusebox/*").clean(".fusebox/"));
Sparky.task("clean:all", ["clean:dist", "clean:cache"]);

// prod
Sparky.task("set-production-env", () => production = true);
Sparky.task("dist", ["clean:dist", "clean:cache", "set-production-env", "build:desktop", "build:app"], () => {})