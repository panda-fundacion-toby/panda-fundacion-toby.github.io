import { processNavigationLinks } from './navigation/navigation.js';
import { getLocationHashComponents } from './navigationUtils.js';
import { loadViewComponent, loadDataViewComponents, ViewComponentLoader } from './components/viewComponentLoader.js';
import { pushViewHistory } from './navigation/polar.js';
import { WindowNavigationController } from './navigation/windowNavigationController.js';
import { HtmlViewComponentsLoader } from './components/htmlViewComponentsLoader.js';
import { NavigationElementsFinder } from './components/navigationElementsFinder.js';
import { BTElementsInitializer } from './extensions/btElementsInitializer.js';

/**
 * Main entry point of panda application.
 */
class Main {
    constructor() {
        this.visitedDataViewComponents = new Map();
        this.beforeNavigationCallbacks = [];
        const centralViewContainer = document.getElementById('viewContainer');
        this.centralViewComponentLoader = new ViewComponentLoader(centralViewContainer);
        // Navigation elements.
        this.navigationElementsFinder = new NavigationElementsFinder();
        this.windowNavigationController = new WindowNavigationController(
            this.centralViewComponentLoader,
            this.navigationElementsFinder
        );
        this.navigationElementsInitializer = new BTElementsInitializer(
            this.windowNavigationController,
            this.navigationElementsFinder
        );
        this.navigationElementsInitializer.init(document);
        // HTML view elements.
        this.htmlViewComponentsLoader = new HtmlViewComponentsLoader();
        this.htmlViewComponentsLoader.init();
        // Central view.
        (async () => {
            const viewComponent = await this.windowNavigationController.init();
            this.navigationElementsInitializer.init(viewComponent.rootElement);
            window.addEventListener('popstate', async event => {
                if (event.state) {
                    const viewComponent = await this.centralViewComponentLoader.load(event.state.url);
                    this.navigationElementsInitializer.init(viewComponent.rootElement);
                }
            });
        })();
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
}

export const conejito = new Main();
