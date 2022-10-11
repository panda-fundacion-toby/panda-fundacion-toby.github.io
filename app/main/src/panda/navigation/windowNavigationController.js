import { ViewComponentLoader } from "../components/viewComponentLoader.js";
import { pushViewHistory, replaceViewHistory } from "./polar.js";

function pushUrlView(viewComponentLoader, url) {
    const urlComponents = url.split('?');
    const [viewName] = urlComponents;
    viewComponentLoader.load(viewName);
}

export class WindowNavigationController {
    constructor(viewContainerId) {
        this.viewComponentLoader = new ViewComponentLoader(viewContainerId);
        this.beforePushViewListeners = [];
        const url = window.location.hash || '#/home';
        pushUrlView(this.viewComponentLoader, url);
        replaceViewHistory(url);
        window.addEventListener('popstate', event => {
            if (event.state) {
                this.viewComponentLoader.load(viewName);
            }
        });
    }

    onBeforePushView(callback) {
        this.beforePushViewListeners.push(callback);
    }

    pushView(url) {
        this.beforePushViewListeners.forEach(cb => cb(url));
        pushUrlView(this.viewComponentLoader, url);
        pushViewHistory(url);
    }
}