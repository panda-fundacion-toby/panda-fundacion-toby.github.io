
export const VIEW_NAME_INITIAL_TOKEN = '#/';

export function getRelativePath(viewComponentName) {
    if (viewComponentName.indexOf(VIEW_NAME_INITIAL_TOKEN) === 0) {
        viewComponentName = viewComponentName.substring(VIEW_NAME_INITIAL_TOKEN.length);
    }
    return viewComponentName;
}

export function parseViewComponentName(viewComponentName) {
    const trimed = getRelativePath(viewComponentName);
    return {
        relativePath: trimed,
    };;
}