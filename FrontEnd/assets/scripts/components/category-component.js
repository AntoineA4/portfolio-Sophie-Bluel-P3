import { findAllCategories } from "../services/category-service.js";

export const createCategoriesContainer= async () => {
    const categoriesContainer = document.createElement("ul");
    const worksSection = document.getElementById("portfolio");
    console.log(categoriesContainer, worksSection);
    const categories = await findAllCategories();
    console.log(categories);
}