import { processNavigationLinks } from './navigation.js';
import { getLocationHashComponents } from './navigationUtils.js';
import { loadViewComponent, loadDataViewComponents } from './components/viewComponentLoader.js';
import { pushViewHistory } from './navigation/polar.js';
import { WindowNavigationController } from './navigation/windowNavigationController.js';

/**
 * Main entry point of panda application.
 */
class Main {
    constructor() {
        this.visitedDataViewComponents = new Map();
        this.beforeNavigationCallbacks = [];
        // const navigation = new Navigation();
        this.windowNavigationController = new WindowNavigationController('viewContainer');
        // this.loadCentralView(navigation.viewName, false);
        // window.addEventListener('popstate', event => {
        //     if (event.state) {
        //         this.loadCentralView(event.state.viewName, false);
        //     }
        // });
        // this.allDataViewComponents(document);
        // this.wire();
    }

    async loadCentralView(viewName, pushState = true) {
        this.beforeNavigationCallbacks.forEach(callback => {
            callback();
        });
        if (pushState) {
            pushViewHistory(viewName);
            // history.pushState({ viewName }, '', viewName);
        }
        this.updateCentralView(viewName);
    }

    async replaceCentralView(viewName) {
        history.replaceState({ moduleName: viewName }, '', viewName);
        this.updateCentralView(viewName);
    }

    async updateCentralView(viewName) {
        const locationHashComponents = getLocationHashComponents(viewName);
        this.tenebrito = locationHashComponents;
        const { moduleName: relativePath } = locationHashComponents;
        const viewContainer = document.getElementById('viewContainer');
        await loadViewComponent(relativePath, viewContainer);
        this.wire('#viewContainer a');
        this.allDataViewComponents(viewContainer);
    }

    allDataViewComponents(rootElement) {
        if (this.visitedDataViewComponents.get(rootElement)) {
            throw Error('Data view component already visited. Verify that you are have not cycles in your data view component dependencies.', this.visitedDataViewComponents);
        }
        loadDataViewComponents(rootElement, (element) => {
            processNavigationLinks((viewName) => {
                this.loadCentralView(viewName);
            }, element);
            this.allDataViewComponents(element);
        });
    }

    onBeforeWindowPushView(callback) {
        this.windowNavigationController.onBeforePushView.push(callback);
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
                element.onclick = () => {
                    const viewName = element.getAttribute('href');
                    this.loadCentralView(viewName);
                    return false;
                };
            }
        });
    }

    registerComponent() {
    }
}

export const conejito = new Main();
