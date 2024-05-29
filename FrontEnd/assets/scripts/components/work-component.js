import { findAllWorks } from "../services/work-service.js";


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
        console.log("Error fetching or displaying works:", error);
    
    };
};