import { createCategoriesContainer } from "./components/category-component.js";
import { createWorksContainer } from "./components/category-component.js";
import {sendLoginRequest} from "./services/category-service.js";
createCategoriesContainer();
createWorksContainer();
document.addEventListener("DOMContentLoaded", createWorksContainer);
sendLoginRequest();


