import { hideModal } from "./bt.js";

export class NavigationElementsInitializer {

    constructor(navigationController) {
        this.navigationController = navigationController;
    }

    findModalParent(element) {
        if (!element) {
            return null;
        }
        if (element.classList.contains('modal')) {
            return element;
        }
        return this.findModalParent(element.parentElement);
    }

    initialize(links) {
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#/')) {
                link.addEventListener('click', async (event) => {
                    event.preventDefault();
                    const modalParent = this.findModalParent(link);
                    if (modalParent) {
                        await hideModal(modalParent);
                    }
                    this.navigationController.pushView(href);
                    return false;
                });
            }
        });
    }
}