import { VIEW_NAME_INITIAL_TOKEN } from "./components/viewComponentNameParser.js";

let searchParams = new URLSearchParams(window.location.hash);

export function getParamValue(variable) {
    var query = window.location.hash.substring(window.location.hash.indexOf('?') + 1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
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