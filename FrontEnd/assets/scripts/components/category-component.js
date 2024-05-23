import { findAllCategories } from "../services/category-service.js";

export const createCategoriesContainer= async () => {
    const categoriesContainer = document.createElement("ul");
    const worksSection = document.getElementById("portfolio");
    console.log(categoriesContainer, worksSection);
    const categories = await findAllCategories();
    console.log(categories);
    //ajout du li//
    categories.forEach(category => {
        const listItem = document.createElement("li");
        listItem.textContent = category.name;
        categoriesContainer.appendChild(listItem);
    });
    
    worksSection.appendChild(categoriesContainer);
};
import { findAllWorks } from "../services/category-service.js";

export async function createWorksContainer(){
    try {
        const works = await findAllWorks();
        console.log(works);
        const worksSection = document.getElementById("portfolio");
        const gallery = worksSection.querySelector(".gallery");

        gallery.innerHTML = '';

        works.forEach(({title, imageUrl}) => {
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.alt = title;
        const titleElement = document.createElement("h3");
        titleElement.textContent = title;
        const figure = document.querySelector(".gallery");

        figureElement.appendChild(imageElement);
        figureElement.appendChild(titleElement);
        gallery.appendChild(figureElement);
        })
    }
    catch (error) {
        console.error("Error fetching or displaying works:", error);
    
    };
};
