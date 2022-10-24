export function processNavigationLinks(callback, rootElement = document, selector = 'a') {
    const links = Array.from(rootElement.querySelectorAll(selector));
    links.forEach(element => {
        const href = element.getAttribute('href');
        if (href?.startsWith('#/')) {
            element.onclick = () => {
                const viewName = element.getAttribute('href');
                callback(viewName);
                return false;
            };
        }
    });
}