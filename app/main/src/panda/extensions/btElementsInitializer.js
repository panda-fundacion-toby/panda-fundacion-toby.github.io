import { hideModal } from "./bt.js";

export class BTElementsInitializer {

    constructor(navigationController, navigationElementsFinder) {
        this.navigationController = navigationController;
        this.navigationElementsFinder = navigationElementsFinder;
    }

    findParentModal(element) {
        if (!element) {
            return null;
        }
        if (element.classList.contains('modal')) {
            return element;
        }
        return this.findParentModal(element.parentElement);
    }

    init(rootElement) {
        const links = this.navigationElementsFinder.find(rootElement);
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#/')) {
                link.addEventListener('click', async (event) => {
                    event.preventDefault();
                    const modalParent = this.findParentModal(link);
                    if (modalParent) {
                        await hideModal(modalParent);
                    }
                    const viewComponent = await this.navigationController.pushView(href);
                    this.init(viewComponent.rootElement);
                    return false;
                });
            }
        });
    }
}