import { Navigation } from './navigation.js';
import { parseHash } from './navigationUtils.js';
import { loadViewComponent, loadViewComponents } from './components/viewComponentLoader.js';

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
        loadViewComponents();
    }

    async navigateTo(hash, pushState) {
        this.beforeNavigationCallbacks.forEach(callback => {
            callback();
        });
        if (pushState) {
            history.pushState({ moduleName: hash }, '', hash);
        }
        const tenebrito = parseHash(hash);
        this.tenebrito = tenebrito;
        const { moduleName: viewName } = tenebrito;
        const viewContainer = document.getElementById('viewContainer');
        await loadViewComponent(viewName, viewContainer);
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
