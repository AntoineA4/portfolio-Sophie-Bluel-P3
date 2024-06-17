import { findAllCategories } from "../services/category-service.js";
import { findAllWorks } from "../services/work-service.js";
import { createWorksContainer } from "./work-component.js";

// fonction pour ajouter les filtres//

export const createCategoriesContainer= async () => {
    const categoriesContainer = document.createElement("ul");
    categoriesContainer.classList.add("listeFilter");
    const worksSection = document.getElementById("portfolio");
    if (!worksSection) return;
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
    
    // Ajout btn "Tous" //
    const btnAll = document.createElement("li");
    btnAll.textContent = "Tous";
    btnAll.classList.add("btnFilter");
    categoriesContainer.insertBefore(btnAll, categoriesContainer.firstChild); 
    bindCategoryButton();
};

 const bindCategoryButton = () => {
    const buttons = document.querySelectorAll(".btnFilter");
    if (buttons) {
        for (const button of buttons) {
            button.addEventListener("click", async () => {
                // Retirer la classe active de tous les boutons
                buttons.forEach(btn => btn.classList.remove("active"));
                // Ajouter la classe active au bouton sélectionné
                button.classList.add("active");
                let works = await findAllWorks (); 
                if (button.textContent !== "Tous") {
                    works = works.filter (work => work.category.name === button.textContent);
                }
                createWorksContainer (works); 
            })
        };
    };

};

