import { ViewComponentLoader } from "./viewComponentLoader.js";

export function findViewComponents(rootElement) {
    const root = rootElement;
    return root.querySelectorAll('[data-load-view-component]');
}

export class HtmlViewComponentsLoader {

    constructor(navigationController) {
        this.navigationController = navigationController;
    }

    async loadDataViewComponents() {
        const viewComponentsElements = findViewComponents(document);
        for (const element of viewComponentsElements) {
            const viewComponentLoader = new ViewComponentLoader(element);
            const viewComponentName = element.dataset.loadViewComponent;
            const viewComponent = await viewComponentLoader.load(viewComponentName);
            this.navigationController.bindLinks(viewComponent.rootElement);
        }
    }
}