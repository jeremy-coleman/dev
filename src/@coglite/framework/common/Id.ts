interface ISequence {
    next() : string;
    reset() : void;
}

class Sequence implements ISequence {
    private _prefix : string;
    private _id : number;
    constructor(prefix : string = "") {
        this._prefix = prefix;
    }
    next() : string {
        if(this._id === undefined) {
            this._id = 0;
        } else {
            this._id ++;
        }
        return this._prefix + this._id;
    }
    reset() {
        this._id === undefined;
    }
}

interface ISequenceInstances {
    [k : string] : ISequence
}

const instances : ISequenceInstances = {}; 
const defaultInstance = new Sequence();

const getSequence = (name? : string) : ISequence => {
    if(name !== undefined) {
        let instance = instances[name];
        if(!instance) {
            instance = new Sequence(name);
            instances[name] = instance;
        }
        return instance;
    }
    return defaultInstance;
};

const next = function(name? : string) : string {
    return getSequence(name).next();
};

export { ISequence, Sequence, getSequence, next };