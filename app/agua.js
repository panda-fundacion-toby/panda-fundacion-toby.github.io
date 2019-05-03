define(['knockout'], function (ko) {
    function Agua() {
        var self = this;

        function getTemplate(templateName) {
            var prefix = "app/";
            templateName = prefix + templateName;
            return new Promise(function (accept) {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        accept(xhttp.responseText);
                    }
                };
                xhttp.open("GET", templateName, true);
                xhttp.send();
            });
        }

        function loadComponent(path, element, parameters) {
                if (path.length > 0 && path.substring(0, 1) === "#") {
                path = path.substring(1, path.length);
            }
            var prefix = "./";
            var template = getTemplate(prefix + "view/" + path + ".html");
            var element = element;
            var parameters = parameters;
            template.then(function (templateContent) {
                var node = document.createElement("div");
                node.innerHTML = templateContent;
                while (element.hasChildNodes()) {
                    element.removeChild(element.firstChild);
                }
                element.appendChild(node);
                require([prefix + "viewModel/" + path], function (model) {
                    ko.applyBindings(model, node);
                    if (model && model.afterApplyBidings) {
                        model.afterApplyBidings();
                    }
                });
            });
        }

        ko.bindingHandlers.component = {
            init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                // This will be called when the binding is first applied to an element
                // Set up any initial state, event handlers, etc. here
            },
            update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var value = valueAccessor();
                var componentName = ko.unwrap(value);
                var parameters = allBindings.get('params') || {};
                loadComponent(componentName, element, parameters);
            }
        };
    }

    return new Agua();
});