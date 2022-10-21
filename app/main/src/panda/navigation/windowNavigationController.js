import { pushViewHistory, replaceViewHistory } from "./polar.js";

export class WindowNavigationController {

    constructor(viewComponentLoader) {
        this.viewComponentLoader = viewComponentLoader;
        this.beforePushViewListeners = [];
        window.addEventListener('popstate', event => {
            if (event.state) {
                this.loadView(event.state.url);
            }
        });
    }

    // Views
    onBeforePushView(asyncCallBack) {
        this.beforePushViewListeners.push(asyncCallBack);
    }

    async loadView(url) {
        replaceViewHistory(url);
        const viewComponent = await this.viewComponentLoader.load(url);
        this.bindLinks(viewComponent.rootElement);
    }

    async pushView(params) {
        const { url } = params;
        for (const listener of this.beforePushViewListeners) {
            await listener(params);
        }
        pushViewHistory(url);
        this.beforePushViewListeners.forEach(cb => cb(url));
        const viewComponent = await this.viewComponentLoader.load(url);
        this.bindLinks(viewComponent.rootElement);
    }

    // Links
    bindLinks(rootElement) {
        const links = this.findLinks(rootElement);
        links.forEach(link => {
            const url = link.getAttribute('href');
            if (url.startsWith('#/')) {
                link.addEventListener('click', async (event) => {
                    event.preventDefault();
                    await this.pushView({ event, link, url });
                    return false;
                });
            }
        });
    }

    findLinks(rootElement) {
        return rootElement.querySelectorAll('a[href]');
    }

}