import { findAllWorks } from "../services/work-service.js";

export async function createWorksContainer(works){
    try {
        const worksSection = document.getElementById("portfolio");
        if (!worksSection) return;
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

export async function editorModeDisplay () {
    // change loginto logout
    const loginBtn = document.querySelector(".btn-login")
    loginBtn.innerText = "Logout";
    //remove filter
    document.querySelector(".btnFilter").remove();
    //add black hearder
    const header = document.querySelector("header");
    header.style.marginTop = "100px";
    const blackHeader = document.createElement("div");
    blackHeader.classList.add("black-header");
    header.insertBefore (blackHeader, header.firstChild);
    const editBtn = document.createElement("div");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p>`;
    blackHeader.appendChild(editBtn);
    // edit btn to open modal
};

export const bindCreateWorkModal = () => {
    const modalButton = document.getElementById ("openModal");
    if (modalButton) {
        modalButton.addEventListener ("click", async () => {
            // create modal backdrop
            const backdrop = document.createElement("div");
            backdrop.classList.add("custom-modal-backdrop");
            document.body.appendChild(backdrop);
            // create modal box
            const modal = document.createElement ("div");
            modal.classList.add("modal-wrapper");
            backdrop.appendChild(modal);
            // logo close btn
            const closeModalBtn = document.createElement ("i");
            closeModalBtn.classList.add ("fa-solid", "fa-xmark", "cursor-pointer");
            modal.appendChild(closeModalBtn);
            // create title 
            const modalTitle = document.createElement("h2");
            modalTitle.textContent = "Galerie photo";
            modal.appendChild(modalTitle);
            // works
            const galleryWorks = document.createElement ("div");
            galleryWorks.classList.add("gallery-modal");
            modal.appendChild(galleryWorks);
            const works = await findAllWorks (); 
            works.forEach((work)=> {
                const worksId = work.id;
                const figure = document.createElement("figure");
                figure.classList.add ("figure");
                const img = document.createElement("img");
                const trashPic = document.createElement("i");
                trashPic.classList.add("fa-solid", "fa-trash-can");
                img.src = work.imageUrl;
                galleryWorks.appendChild(figure);
                figure.appendChild(img);
                figure.appendChild(trashPic);
            });
            // hr line
            const bottomLine = document.createElement("hr");
            modal.appendChild(bottomLine);
            // button Ajouter Photo
            const btnAjoutPhoto = document.createElement("button");
            btnAjoutPhoto.innerText = "Ajouter une photo";
            btnAjoutPhoto.classList.add ("btnAddPic");
            modal.appendChild(btnAjoutPhoto);
            // close modal
            closeModalBtn.addEventListener("click", () => {
                backdrop.remove();
            });
        });
    };
};

