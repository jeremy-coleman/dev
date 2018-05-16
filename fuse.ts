import { spawn } from 'child_process';
import { CSSPlugin, EnvPlugin, FuseBox, QuantumPlugin, SassPlugin, Sparky } from 'fuse-box';


let isProduction = false;

let VENDOR_CSS = [
  "node_modules/@blueprintjs/core/lib/css/blueprint.css",
  "node_modules/antd/dist/antd.css"
]

Sparky.task("copy-html", () => Sparky
    .src("src/client/index.html")
    .dest("build/client/$name"));

Sparky.task("copy-external-css", () => Sparky
    .src(VENDOR_CSS)
    .dest("build/client/assets/css/$name"));

Sparky.task("copy-desktop-assets", () => Sparky
    .src("**/*.ttf", { base: "src/desktop/assets" })
    .dest("build/desktop/assets"));

Sparky.task("copy-client-assets", () => Sparky
    .src("**/*.ttf", { base: "src/client/assets" })
    .dest("build/client/assets"));

Sparky.task(
    "build:desktop",
    ["copy-desktop-assets"],
    () => {
        const fuse = FuseBox.init({
            homeDir: "src/desktop",
            output: "build/desktop/$name.js",
            target: "server",
            cache: !isProduction,
            plugins: [
                EnvPlugin({ NODE_ENV: isProduction ? "production" : "development" }),
                isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "desktop",
                    target: "server",
                    treeshake: true,
                    uglify: true,
                }),
            ],
        });

        const bundle = fuse
            .bundle("desktop")
            .target("server")
            .instructions("> [main.ts]");

        if (!isProduction) {
            bundle.watch();

            return fuse.run().then(() => {
                spawn('electron',[".", "--colors"],{ shell: true, stdio: "inherit" })
                .on('exit', () => process.exit(0))
            });
        }

        return fuse.run();
    });

Sparky.task(
    "build:client",
    ["copy-html", "copy-external-css", "copy-client-assets"],
    () => {
        const fuse = FuseBox.init({
            homeDir: "src/client",
            output: "build/client/$name.js",
            target: "electron",
            cache: !isProduction,
            plugins: [
                EnvPlugin({ NODE_ENV: isProduction ? "production" : "development" }),
                isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "client",
                    target: "electron",
                    treeshake: true,
                    uglify: true,
                }),
            ],
        });

        if (!isProduction) {
            fuse.dev({port: 9696,httpServer: false,});
        }

        const bundle = fuse
            .bundle("client")
            .target("electron")
            .instructions("> [client.tsx] + fuse-box-css");

        if (!isProduction) {
            bundle
            .plugin([SassPlugin({importer: true, macros: { "$home": "src/client/styles/" }}),CSSPlugin()])
            .watch()
            .hmr();
        }

        bundle.plugin([
            SassPlugin({importer: true,macros: { "$home": "src/client/styles/" }}),
            CSSPlugin({group: "styles.css", outFile: "build/client/styles.css"})]);

        return fuse.run();
    });

Sparky.task("clean:build", () => Sparky.src("build/*").clean("build/"));
Sparky.task("clean:cache", () => Sparky.src(".fusebox/*").clean(".fusebox/"));
Sparky.task("default", ["clean:build", "clean:cache", "build:client", "build:desktop"], () => { });

Sparky.task("set-prod-env", () => isProduction = true);
Sparky.task("build:production", ["set-prod-env", "default"], () => { });
