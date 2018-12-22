

class SequenceId {
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


const instances: {[k : string] : SequenceId} = {}; 

//const defaultInstance = new SequenceId();

const getSequenceId = (name? : string): SequenceId => {
    if(name !== undefined) {
        let instance = instances[name];
        if(!instance) {
            instance = new SequenceId(name);
            instances[name] = instance;
        }
        return instance;
    }
    return new SequenceId();
};

const generateSequentialId = function(name? : string) : string {
    return getSequenceId(name).next();
};

export { SequenceId, getSequenceId, generateSequentialId };