import { processNavigationLinks } from './navigation/navigation.js';
import { getLocationHashComponents } from './navigationUtils.js';
import { loadViewComponent, loadDataViewComponents, ViewComponentLoader } from './components/viewComponentLoader.js';
import { pushViewHistory } from './navigation/polar.js';
import { WindowNavigationController } from './navigation/windowNavigationController.js';
import { HtmlViewComponentsLoader } from './components/htmlViewComponentsLoader.js';
import { NavigationElementsFinder } from './components/navigationElementsFinder.js';
import { NavigationElementsInitializer } from './extensions/navigationElementsInitializer.js';

/**
 * Main entry point of panda application.
 */
class Main {
    constructor() {
        this.visitedDataViewComponents = new Map();
        this.beforeNavigationCallbacks = [];
        const centralViewContainer = document.getElementById('viewContainer');
        this.centralViewComponentLoader = new ViewComponentLoader(centralViewContainer);
        this.windowNavigationController = new WindowNavigationController(this.centralViewComponentLoader);
        this.htmlViewComponentsLoader = new HtmlViewComponentsLoader();
        this.navigationElementsFinder = new NavigationElementsFinder(document);
        this.navigationElementsInitializer = new NavigationElementsInitializer(this.windowNavigationController);
        const navigationElements = this.navigationElementsFinder.find();
        this.navigationElementsInitializer.initialize(navigationElements);
        this.htmlViewComponentsLoader.load();
        this.windowNavigationController.mount();
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
