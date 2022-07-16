let searchParams = new URLSearchParams(window.location.hash);

export function getParamValue(paramName) {
    return searchParams.get(paramName);
}

export function parseHash(hash) {
    const components = hash.substring(1).split('?');
    let moduleName = components[0];
    // trim trailing '/'
    if (moduleName.lastIndexOf('/') === moduleName.length - 1) {
        moduleName = moduleName.substring(0, moduleName.length - 1);
    }
    const queryString = components[1];
    return {
        moduleName,
        queryString
    };
}