// export class Navigation {
//     constructor(initialViewName = '#/home') {
//         if (window.location.hash && window.location.hash.length > 0) {
//             initialViewName = window.location.hash;
//         }
//         this.viewName = initialViewName;
//     }
// }

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