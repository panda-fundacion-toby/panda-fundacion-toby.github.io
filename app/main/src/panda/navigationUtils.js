let searchParams = new URLSearchParams(window.location.hash);

export function getParamValue(paramName) {
    return searchParams.get(paramName);
}

export function parseHash(hash) {
    const components = hash.substring(1).split('/');
    let moduleName = [components[0], components[1] || ''].join('/');
    if (moduleName.lastIndexOf('/') === moduleName.length - 1) {
        moduleName = moduleName.substring(0, moduleName.length - 1);
    }
    const queryString = components.slice(2).join('');
    return {
        moduleName,
        queryString
    };
}