import { findAllWorks } from "../services/work-service.js";

export async function createWorksContainer(works){
    try {
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
        console.log("Error fetching or displaying works:", error);
    
    };
};

export const bindCreateWorkModal = () => {
    const modalButton = document.getElementById ("openModal");
    if (modalButton) {
        modalButton.addEventListener ("click", () => {
            const modal = document.createElement ("div")
            modal.style.position = "fixed"
            modal.style.top = "0" 
            modal.style.left = "0" 
            modal.style.background = "red"
            modal.style.height = "100%"
            modal.style.width = "100%"
            document.body.appendChild (modal)
        })
    }
}