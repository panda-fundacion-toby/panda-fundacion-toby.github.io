import { agua } from './agua.js';
import { getRelativePath, parseViewComponentName } from './viewComponentNameParser.js';
import { templatesFinder } from './templatesFinder.js';

export class ViewComponentLoader {

    constructor(rootElement) {
        this.rootElement = rootElement;
    }

    removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    async loadTemplates(viewTemplateRelativePath, viewRootElement) {
        const template = await agua.getTemplate(`${viewTemplateRelativePath}.html`);
        this.removeAllChildNodes(viewRootElement);
        viewRootElement.innerHTML = template;
        const templates = templatesFinder.findTemplates(viewRootElement);
        for (const template of templates) {
            const nextUrl = template.dataset.template;
            const urlSplit = nextUrl.split('?');
            const [viewName] = urlSplit;
            const relativePath = getRelativePath(viewName);
            await this.loadTemplates(relativePath, template);
        }
    }

    /**
     * 
     * @param {string} url String with format '#/relative-path-to-view/view-name?param=value'
     */
    async load(url) {
        const urlSplit = url.split('?');
        const [viewName, queryString] = urlSplit;
        const viewTemplateRelativePath = getRelativePath(viewName);
        await this.loadTemplates(viewTemplateRelativePath, this.rootElement);
        const viewModelScriptId = 'view-model-script';
        let viewModelScript = document.getElementById(viewModelScriptId);
        if (viewModelScript) {
            viewModelScript.remove();
        }
        viewModelScript = document.createElement('script');
        viewModelScript.setAttribute('id', viewModelScriptId);
        viewModelScript.setAttribute('type', 'module');
        viewModelScript.setAttribute('src', `app/view/${viewTemplateRelativePath}.js?t=${Date.now()}`);
        document.body.appendChild(viewModelScript);
        return {
            queryString,
            rootElement: this.rootElement,
            viewName,
        };
    }
}