import { createCategoriesContainer } from "./components/category-component.js";
import { createWorksContainer } from "./components/category-component.js";
createCategoriesContainer();
createWorksContainer();
document.addEventListener("DOMContentLoaded", createWorksContainer);

