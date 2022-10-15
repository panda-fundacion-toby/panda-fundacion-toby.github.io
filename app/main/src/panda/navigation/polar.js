/**
 * Push a new view in the navigation history.
 * @param {string} url Url of the view to navigate to.
 * e.g. '#/home/landing'
 */
export function pushViewHistory(url) {
    history.pushState({ url }, '', url)
}

export function replaceViewHistory(url) {
    history.replaceState({ url }, '', url);
}
