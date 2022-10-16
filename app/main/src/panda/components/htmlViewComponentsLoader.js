import { ViewComponentLoader } from "./viewComponentLoader.js";

export function findViewComponents(rootElement) {
    const root = rootElement;
    return root.querySelectorAll('[data-load-view-component]');
}

export class HtmlViewComponentsLoader {
    init() {
        const viewComponentsElements = findViewComponents(document);
        viewComponentsElements.forEach((element) => {
            const viewComponentLoader = new ViewComponentLoader(element);
            const viewComponentName = element.dataset.loadViewComponent;
            viewComponentLoader.load(viewComponentName);
        });
    }
}