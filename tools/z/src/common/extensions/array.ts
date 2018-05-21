
interface Array<T> {
    first(): T;
    last(): T;
    flatten(): any[];
    sortBy(attr: (item: T) => any);
}

// First, checks if it isn't implemented yet.
if (!Array.prototype.first) {
    Array.prototype.first = function <T>(this: T[]) {
        return this[0];
    };
}
if (!Array.prototype.last) {
    Array.prototype.last = function <T>(this: T[]) {
        return this[this.length - 1];
    };
}

if (!Array.prototype.flatten) {
    Array.prototype.flatten = function <T>(this: T[]) {
        return [].concat(...this);
    };
}

if (!Array.prototype.sortBy) {
    Array.prototype.sortBy = function <T>(this: T[], attr: (item: T) => any) {
        return this.sort((a, b) => {
            const aAttr = attr(a);
            const bAttr = attr(b);

            if (aAttr < bAttr) {
                return -1;
            } else if (aAttr > bAttr) {
                return 1;
            } else {
                return 0;
            }
        });
    };
}
