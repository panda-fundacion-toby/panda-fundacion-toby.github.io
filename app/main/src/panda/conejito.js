import { ViewComponentLoader } from './components/viewComponentLoader.js';
import { WindowNavigationController } from './navigation/windowNavigationController.js';
import { HtmlViewComponentsLoader } from './components/htmlViewComponentsLoader.js';
import { hideParentModal } from './extensions/bt.js';

/**
 * Main entry point of panda application.
 */
class Main {

    constructor() {
        this.visitedDataViewComponents = new Map();
        this.beforeNavigationCallbacks = [];
        const centralViewContainer = document.getElementById('viewContainer');
        this.centralViewComponentLoader = new ViewComponentLoader(centralViewContainer);
        this.windowNavigationController = new WindowNavigationController(
            this.centralViewComponentLoader
        );
        this.windowNavigationController.onBeforePushView(async ({ link }) => {
            await hideParentModal(link);
        });
        this.windowNavigationController.bindLinks(document);
        this.htmlViewComponentsLoader = new HtmlViewComponentsLoader(this.windowNavigationController);
        this.htmlViewComponentsLoader.loadDataViewComponents();
        // Central view.
        const initialUrl = window.location.hash || '#/home';
        this.windowNavigationController.loadView(initialUrl);
    }

    onBeforePushView(asyncCall) {
        this.windowNavigationController.onBeforePushView(asyncCall);
    }

    bindLinks(rootElement) {
        this.windowNavigationController.bindLinks(rootElement);
    }
}

export const conejito = new Main();
