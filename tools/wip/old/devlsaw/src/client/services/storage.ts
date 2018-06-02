const getItem = (key, type) => {
    const value = JSON.parse(localStorage.getItem(key));
    if(type === 'array') {
        return value ? value : [];
    }

    return value ? value : null;
};

const setItem = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
};

export default {
    getItem,
    setItem
};

