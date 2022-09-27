
const startToken = '#!';

function trimHash(hash) {
    if (hash.indexOf(startToken) === 0) {
        hash = hash.substring(startToken.length);
    }
    return hash;
}

function parseHash(hash) {
    if (hash.indexOf('/') === 0) {
        hash = hash.substring(1);
    }
    return {
        fullPath: hash,
    };
}

export function getViewComponents(hash) {
    const trimed = trimHash(hash);
    return parseHash(trimed);
}