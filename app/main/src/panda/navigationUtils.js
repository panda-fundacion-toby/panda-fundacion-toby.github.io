import { VIEW_NAME_INITIAL_TOKEN } from "./components/viewComponentNameParser.js";

let searchParams = new URLSearchParams(window.location.hash);

export function getParamValue(paramName) {
    return searchParams.get(paramName);
}

function splitLocationComponents(hash) {
    return hash.substring(VIEW_NAME_INITIAL_TOKEN.length).split('/');
}

export function getLocationHashComponents(locationHash) {
    const components = splitLocationComponents(locationHash);
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