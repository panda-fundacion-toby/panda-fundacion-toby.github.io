

export class NavigationElementsFinder {
    constructor(rootElement) {
        this.rootElement = rootElement;
    }

    find() {
        return this.rootElement.querySelectorAll('a[href]');
    }
}