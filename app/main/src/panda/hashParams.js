import { conejito } from "./conejito.js";

class HashParams {

    constructor() {
        this.map = new Map();
        this.loadFromUrl();
        conejito.onAfterPushView(() => {
            this.loadFromUrl();
        });
    }

    loadFromUrl() {
        this.map.clear();
        if (window.location.hash.indexOf('?') < 0) {
            return;
        }
        const query = window.location.hash.substring(window.location.hash.indexOf('?') + 1);
        const split = query.split('&');
        for (const token of split) {
            const keyValue = token.split('=');
            const key = keyValue[0];
            if (key) {
                this.map.set(key, keyValue[1]);
            }
        }
    }

    get(paramName) {
        return this.map.get(paramName);
    }

    set(paramName, value) {
        this.map.set(paramName, value);
    }

    updateUrl() {
        const cleanHash = this.cleanHashFromUrl();
        const params = [];
        for (const [key, value] of this.map) {
            params.push(`${key}=${value}`);
        }
        const updatedHash = `${cleanHash}?${params.join('')}`
        window.location.hash = updatedHash;
    }

    cleanHashFromUrl() {
        let hash = window.location.hash;
        if (hash.indexOf('?') >= 0) {
            hash = hash.substring(0, hash.indexOf('?'));
        }
        return hash;
    }
}

export const hashParams = new HashParams();