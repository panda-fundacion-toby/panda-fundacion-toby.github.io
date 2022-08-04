class Agua {

    getTemplate(templateName) {
        return new Promise(function (accept) {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    accept(xhttp.responseText);
                }
            };
            xhttp.open("GET", `app/view/${templateName}?t=${Date.now()}`, true);
            xhttp.send();
        });
    }
}

export const agua = new Agua();