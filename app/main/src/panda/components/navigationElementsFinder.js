export class NavigationElementsFinder {
    find(rootElement) {
        return rootElement.querySelectorAll('a[href]');
    }
}