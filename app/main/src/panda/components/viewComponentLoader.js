import { agua } from '../agua.js';
import { getViewComponents } from './hashParser.js';

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export async function loadViewComponent(viewName, viewContainer) {
    const template = await agua.getTemplate(`${viewName}.html`);
    removeAllChildNodes(viewContainer);
    const newView = document.createElement('div');
    newView.innerHTML = template;
    viewContainer.appendChild(newView);
    const viewModelScriptId = 'view-model-script';
    let viewModelScript = document.getElementById(viewModelScriptId);
    if (viewModelScript) {
        viewModelScript.remove();
    }
    viewModelScript = document.createElement('script');
    viewModelScript.setAttribute('id', viewModelScriptId);
    viewModelScript.setAttribute('type', 'module');
    viewModelScript.setAttribute('src', `app/view/${viewName}.js?t=${Date.now()}`);
    document.body.appendChild(viewModelScript);
}

export function findViewComponents() {
    return document.querySelectorAll('[data-load-view-component]');
}

export function loadViewComponents() {
    const viewComponents = findViewComponents();
    viewComponents.forEach((element) => {
        const hash = element.dataset.loadViewComponent;
        const viewComponents = getViewComponents(hash);
        loadViewComponent(viewComponents.fullPath, element);
    });
}