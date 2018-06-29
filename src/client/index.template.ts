const createTemplate = (params) => {
    const options = params.htmlWebpackPlugin.options;
    const AppConfig = options.AppConfig;
    return (
        `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${options.title}</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/pure.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/grids-responsive.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/react-select.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/react-virtualized.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/react-virtualized-select.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/codemirror.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/cm-pastel-on-dark.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/cm-elegant.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/dragula.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/react-mosaic-component.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/blueprint.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/blueprint-datetime.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/blueprint-table.css" />
                <link rel="stylesheet" href="${AppConfig.publicPath}css/antd.css" />
                <link href="app.min.css" rel="stylesheet">
                <script type="text/javascript">
                    window["AppConfig"] = ${JSON.stringify(AppConfig)};
                    window["FabricConfig"] = {
                        fontBaseUrl: "${AppConfig.env.fabricFontBasePath}"
                    }
                </script>
            </head>
            <body>
                <div id="coglite-app-root"></div>
            </body>
            
        </html>`
    );
};

export { createTemplate as default, createTemplate }