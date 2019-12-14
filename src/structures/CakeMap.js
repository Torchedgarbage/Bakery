class CakeMap extends Map {
    constructor() {
        super()
    }

    filter(fn, thisArg) {
        if (thisArg) fn = fn.bind(thisArg);
        const results = new FancyMap();
        for (const [key, val] of this) {
            if (fn(val, key, this)) results.set(key, val);
        }
        return results;

    }

    map(fn, thisArg) {
        if (thisArg) fn = fn.bind(thisArg);
        const arr = new Array(this.size);
        let i = 0;
        for (const [key, val] of this) arr[i++] = fn(val, key, this);
        return arr;
    }
}

module.exports = CakeMap;