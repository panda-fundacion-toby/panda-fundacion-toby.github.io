export class Navigation {
    constructor(initialView = '#home') {
        if (window.location.hash && window.location.hash.length > 0) {
            initialView = window.location.hash;
        }
        this.viewName = initialView;
    }
}