export class Navigation {
    constructor(initialViewName = '#/home') {
        if (window.location.hash && window.location.hash.length > 0) {
            initialViewName = window.location.hash;
        }
        this.viewName = initialViewName;
    }
}