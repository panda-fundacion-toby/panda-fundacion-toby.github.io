export async function hideModal(modalElement) {
    return new Promise((resolve) => {
        $(modalElement).on('hidden.bs.modal', (e) => {
            resolve(e);
        });
        $(modalElement).modal('hide');
    });
}
