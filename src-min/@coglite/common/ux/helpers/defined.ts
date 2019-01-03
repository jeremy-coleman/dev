

export let defined = (...args) => {
    for (let arg of args) {
        if (arg !== undefined) return arg
    }
};
