import { pushViewHistory, replaceViewHistory } from "./polar.js";

export class WindowNavigationController {

    constructor(viewComponentLoader, navigationElementsFinder) {
        this.viewComponentLoader = viewComponentLoader;
        this.navigationElementsFinder = navigationElementsFinder;
        this.beforePushViewListeners = [];
    }

    async init() {
        const url = window.location.hash || '#/home';
        replaceViewHistory(url);
        return await this.viewComponentLoader.load(url);
    }

    onBeforePushView(callback) {
        this.beforePushViewListeners.push(callback);
    }

    async pushView(url) {
        pushViewHistory(url);
        this.beforePushViewListeners.forEach(cb => cb(url));
        return await this.viewComponentLoader.load(url);
    }

}