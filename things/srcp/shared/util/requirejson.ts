import * as path from "path";
import * as fs from "fs";

/**
 * require json file relative to route
 */
export const requirejson = (_path: string) => {
    return JSON.parse(
        fs.readFileSync(
            path.join(
                process.cwd(),
                /\.[a-z-A-Z]+$/.test(_path) ? _path : `${_path}.json`
            ),
            "utf-8"
        )
    );
};