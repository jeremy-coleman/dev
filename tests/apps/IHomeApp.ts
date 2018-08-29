interface IHomeApp {
    key: string;
    title: string;
    moduleLoader?: () => Promise<any>;
    moduleComponent?: string;
    path?: string;
    items?: IHomeApp[];
}

export { IHomeApp }