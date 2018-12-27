declare module "file-loader?!*" {
    const value : string;
    export default value;
}

declare module "url-loader?!*" {
    const value : string;
    export default value;
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "package.json" {
    const value: any;
    export default value;
}