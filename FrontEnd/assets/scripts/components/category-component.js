// fonction pour ajouter tous les travaux//

import { findAllWorks } from "../services/category-service.js";

export async function createWorksContainer(){
    try {
        const works = await findAllWorks();
        console.log(works);
        const worksSection = document.getElementById("portfolio");
        const gallery = worksSection.querySelector(".gallery");
        worksSection.appendChild(gallery);

        gallery.innerHTML = '';

        works.forEach(({title, imageUrl}) => {
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        imageElement.alt = title;
        const titleElement = document.createElement("h3");
        titleElement.textContent = title;
    

        figureElement.appendChild(imageElement);
        figureElement.appendChild(titleElement);
        gallery.appendChild(figureElement);
        })
    }
    catch (error) {
        console.error("Error fetching or displaying works:", error);
    
    };
};


// fonction pour ajouter les filtres//


import { findAllCategories } from "../services/category-service.js";

export const createCategoriesContainer= async () => {
    const categoriesContainer = document.createElement("ul");
    categoriesContainer.classList.add("listeFilter");
    const worksSection = document.getElementById("portfolio");
    
    console.log(categoriesContainer, worksSection);
    const categories = await findAllCategories();
    console.log(categories);
    worksSection.appendChild(categoriesContainer);
    //ajout du li//
    categories.forEach(category => {
        const btnFilter = document.createElement("li");
        btnFilter.textContent = category.name;
        btnFilter.classList.add("btnFilter");
        categoriesContainer.appendChild(btnFilter);
    });
    btnFilter.addEventListener("click", () => {
        const picsFilter = pics.findAllCategories(function (categories) {
            return categories.category
        })
        });
    
    // Ajout btn "Tous" //
    const btnAll = document.createElement("li");
    btnAll.textContent = "Tous";
    btnAll.classList.add("btnFilter");
    categoriesContainer.insertBefore(btnAll, categoriesContainer.firstChild); 
};
