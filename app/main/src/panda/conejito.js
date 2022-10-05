import { Navigation } from './navigation.js';
import { getLocationHashComponents } from './navigationUtils.js';
import { loadViewComponent, loadViewComponents } from './components/viewComponentLoader.js';

/**
 * Main entry point of panda application.
 */
class Main {
    constructor() {
        this.beforeNavigationCallbacks = [];
        const navigation = new Navigation();
        this.loadCentralView(navigation.viewName, true);
        window.addEventListener('popstate', event => {
            if (event.state) {
                this.loadCentralView(event.state.moduleName, false);
            }
        });
        loadViewComponents((element) => {
            const links = Array.from(element.querySelectorAll('a'));
            this.wireNavigationLinks(links);
        });
        this.wire();
    }

    async loadCentralView(viewName, pushState) {
        this.beforeNavigationCallbacks.forEach(callback => {
            callback();
        });
        if (pushState) {
            history.pushState({ moduleName: viewName }, '', viewName);
        }
        const locationHashComponents = getLocationHashComponents(viewName);
        this.tenebrito = locationHashComponents;
        const { moduleName: relativePath } = locationHashComponents;
        const viewContainer = document.getElementById('viewContainer');
        await loadViewComponent(relativePath, viewContainer);
        this.wire('#viewContainer a');
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
        this.wireNavigationLinks(links);
    }

    wireNavigationLinks(links) {
        links.forEach(element => {
            const href = element.getAttribute('href');
            if (href?.startsWith('#/')) {
                element.onclick = (e) => {
                    const viewName = e.target.getAttribute('href');
                    this.loadCentralView(viewName, true);
                    return false;
                };
            }
        });
    }
}

export const conejito = new Main();
