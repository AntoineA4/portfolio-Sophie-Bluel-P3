import { bindLoginForm } from "./components/auth-component.js";
import { createCategoriesContainer} from "./components/category-component.js";
import { createWorksContainer } from "./components/work-component.js";
createCategoriesContainer();
createWorksContainer();
document.addEventListener("DOMContentLoaded", createWorksContainer);
bindLoginForm();



