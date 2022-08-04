import { Navigation } from './navigation.js';
import { agua } from './agua.js';
import { parseHash } from './navigationUtils.js';

/**
 * Main entry point of panda application.
 */
class Main {
    constructor() {
        this.beforeNavigationCallbacks = [];
        const navigation = new Navigation();
        this.wire();
        this.navigateTo(navigation.viewName, true);
        window.addEventListener('popstate', event => {
            if (event.state) {
                this.navigateTo(event.state.moduleName, false);
            }
        });
    }

    navigateTo(hash, pushState) {
        this.beforeNavigationCallbacks.forEach(callback => {
            callback();
        });
        if (pushState) {
            history.pushState({ moduleName: hash }, '', hash);
        }
        const tenebrito = parseHash(hash);
        this.tenebrito = tenebrito;
        const { moduleName } = tenebrito;
        agua.getTemplate(`${moduleName}.html`).then(template => {
            const viewContainer = document.getElementById('viewContainer');
            const view = document.getElementById('view');
            viewContainer.removeChild(view);
            const newView = document.createElement('div');
            newView.setAttribute('id', 'view');
            newView.innerHTML = template;
            viewContainer.appendChild(newView);
            this.wire('#viewContainer a');
            const viewModelScriptId = 'view-model-script';
            let viewModelScript = document.getElementById(viewModelScriptId);
            if (viewModelScript) {
                viewModelScript.remove();
            }
            viewModelScript = document.createElement('script');
            viewModelScript.setAttribute('id', viewModelScriptId);
            viewModelScript.setAttribute('type', 'module');
            viewModelScript.setAttribute('src', `app/view/${moduleName}.js?t=${Date.now()}`);
            document.body.appendChild(viewModelScript);
        });
    }

    onBeforeNavigate(callback) {
        this.beforeNavigationCallbacks.push(callback);
    }

    pushNavigationPath(path) {
        history.pushState({ moduleName: path }, '', path);
    }

    /**
     * Select a group of elements in html and 
     * @param {string} selector 
     */
     wire(selector = 'a') {
        const links = Array.from(document.querySelectorAll(selector));
        links.forEach(element => {
            const href = element.getAttribute('href');
            if (href?.startsWith('#')) {
                element.onclick = (e) => {
                    const moduleNameWithHash = e.target.getAttribute('href');
                    this.navigateTo(moduleNameWithHash, true);
                    return false;
                };
            }
        });
    }

}

export const conejito = new Main();
