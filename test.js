import { ViewComponentLoader } from "./app/main/src/panda/components/viewComponentLoader.js";
import { WindowNavigationController } from "./app/main/src/panda/navigation/WindowNavigationController.js";

const container = document.getElementById('container');
const compLoader = new ViewComponentLoader(container);
const navController = new WindowNavigationController(compLoader);

function pushView(event) {
    navController.pushView('#another-view');
    console.log(event);
}

// window.addEventListener('popstate', event => {
//     console.log(`event.state =`, event.state);
//     // if (event.state) {
//     //     this.viewComponentLoader.load(event.state.url);
//     // }
// });

document.getElementById('push-history-button').addEventListener("click", (event) => {
    pushView(event);
});