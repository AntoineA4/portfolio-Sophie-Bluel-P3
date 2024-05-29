import { findAllCategories } from "../services/category-service.js";

// fonction pour ajouter les filtres//

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
        btnFilter.addEventListener("click", () => {
        
        });
        
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
            console.log(button.innerText)
        };
    };

};
