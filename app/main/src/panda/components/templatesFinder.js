
class TemplatesFinder {

    findTemplates(rootElement) {
        return rootElement.querySelectorAll('[data-template]');
    }

}

export const templatesFinder = new TemplatesFinder();