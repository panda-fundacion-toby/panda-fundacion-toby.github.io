export async function hideModal(modalElement) {
    return new Promise((resolve) => {
        $(modalElement).on('hidden.bs.modal', (e) => {
            resolve(e);
        });
        modalElement.dataset.ignoreHidenEvent = true;
        $(modalElement).modal('hide');
    });
}

export async function hideParentModal(element) {
    if (!element) {
        return null;
    }
    if (element.classList?.contains('modal')) {
        return element;
    }
    const modalParent = await hideParentModal(element.parentElement);
    if (modalParent) {
        await hideModal(modalParent);
    }
}