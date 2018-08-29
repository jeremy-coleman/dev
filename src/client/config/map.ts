const mock = (env : any) => {
    return import("./mock").then(m => m.mock(env));
};

const localOzone = (env : any) => {
    return import("./localOzone").then(m => m.localOzone(env));
};

export {
    localOzone,
    mock,
    mock as default
}