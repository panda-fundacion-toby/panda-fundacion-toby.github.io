import { pushViewHistory, replaceViewHistory } from "./polar.js";

export class WindowNavigationController {

    constructor(viewComponentLoader) {
        this.viewComponentLoader = viewComponentLoader;
        this.beforePushViewListeners = [];
        window.addEventListener('popstate', event => {
            if (event.state) {
                this.loadViewComponentFromUrl(event.state.url);
            }
        });
    }

    async loadViewComponentFromUrl(url) {
        const urlSplit = url.split('?');
        const [viewName] = urlSplit;
        await this.viewComponentLoader.load(viewName);
    }

    async mount() {
        const url = window.location.hash || '#/home';
        replaceViewHistory(url);
        await this.loadViewComponentFromUrl(url);
    }

    onBeforePushView(callback) {
        this.beforePushViewListeners.push(callback);
    }

    async pushView(url) {
        this.beforePushViewListeners.forEach(cb => cb(url));
        pushViewHistory(url);
        await this.loadViewComponentFromUrl(url);
    }
}