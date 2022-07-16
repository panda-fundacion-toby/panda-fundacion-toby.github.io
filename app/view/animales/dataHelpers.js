/**
 * https://dev.to/temmietope/embedding-a-google-drive-image-in-html-3mm9
 * @param {*} url
 * @returns 
 */
export function getPictureIdFrom(url) {
    url = url.trim();
    const path = url.substring('https://'.length);
    return path.split('/')[3];
}

export function getPicturesFromCellValue(pictures) {
    return pictures === null ? [] : pictures.split('\n');
}

export function getImageFromDriveId(pictureId) {
    return `https://drive.google.com/uc?export=view&id=${pictureId}`
}