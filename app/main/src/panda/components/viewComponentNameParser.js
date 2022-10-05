
export const VIEW_NAME_INITIAL_TOKEN = '#/';

function cleanViewComponent(viewComponentName) {
    if (viewComponentName.indexOf(VIEW_NAME_INITIAL_TOKEN) === 0) {
        viewComponentName = viewComponentName.substring(VIEW_NAME_INITIAL_TOKEN.length);
    }
    return viewComponentName;
}

export function parseViewComponentName(viewComponentName) {
    const trimed = cleanViewComponent(viewComponentName);
    return {
        relativePath: trimed,
    };;
}