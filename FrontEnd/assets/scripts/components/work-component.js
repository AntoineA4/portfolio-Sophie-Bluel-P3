import { findAllWorks } from "../services/work-service.js";
let currentWorks = [];

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
        });
    }
    catch (error) {
        console.log("Error fetching or displaying works:", error);
    
    };
};

export const bindCreateWorkModal = () => {
    const modalButton = document.getElementById ("openModal");
    if (modalButton) {
        modalButton.addEventListener ("click", async (event) => { 
            event.preventDefault();
            // create modal backdrop
            const backdrop = document.createElement("div");
            backdrop.classList.add("custom-modal-backdrop");
            document.body.appendChild(backdrop);
            // create first modal box
            const modal = document.createElement ("div");
            modal.classList.add("modal-wrapper");
            backdrop.appendChild(modal);
            // logo close btn
            const closeModalBtn = document.createElement ("i");
            closeModalBtn.classList.add ("fa-solid", "fa-xmark", "cursor-pointer");
            modal.appendChild(closeModalBtn);
            // create title 
            const modalTitle = document.createElement("h2");
            modalTitle.classList.add ("title-modal");
            modalTitle.textContent = "Galerie photo";
            modal.appendChild(modalTitle);
            // works
            const galleryWorks = document.createElement ("div");
            galleryWorks.classList.add("gallery-modal");
            modal.appendChild(galleryWorks);
            const works = await findAllWorks (); 
            currentWorks = works; //Update global work array
            works.forEach((work)=> {
                const worksId = work.id;
                const figure = document.createElement("figure");
                figure.classList.add ("figure");
                figure.classList.add (`figure-${worksId}`);
                const img = document.createElement("img");
                const trashPic = document.createElement("i");
                trashPic.classList.add("fa-solid", "fa-trash-can");
                img.src = work.imageUrl;
                galleryWorks.appendChild(figure);
                figure.appendChild(img);
                figure.appendChild(trashPic);
                //delete works
                trashPic.addEventListener("click", async(event) => {
                    event.preventDefault();
                    await deleteWorks(event, worksId);
                    figure.remove();// Remove the figure from the modal
                })
            });
            // hr line
            const bottomLine = document.createElement("hr");
            modal.appendChild(bottomLine);
            // button Ajouter Photo
            const btnAjoutPhoto = document.createElement("button");
            btnAjoutPhoto.innerText = "Ajouter une photo";
            btnAjoutPhoto.classList.add ("modal-btn");
            modal.appendChild(btnAjoutPhoto);
            // close modal
            closeModalBtn.addEventListener("click", (event) => {
                event.preventDefault();
                backdrop.remove();
            });
            // close modal when clicking outside of it
            backdrop.addEventListener("click", (event) => {
                if (event.target === backdrop) {
                    event.preventDefault();
                    backdrop.remove();
                }
            });
            //open the second modal (add works)
            btnAjoutPhoto.addEventListener("click", (event) => {
                event.preventDefault();
                modal.style.display ="none"; 
                const modalAddWorks = document.createElement("div");
                modalAddWorks.classList.add ("modal2");
                backdrop.appendChild(modalAddWorks);
                modalAddWorks.innerHTML = `
                                <div class="top-modal">
                                <i class="fa-solid fa-arrow-left" id="return"></i>
                                <i class="fa-solid fa-xmark" id="close-modal2"></i>
                                </div>
                                <form action="/upload" method="post" id="form-add">
                                <h2 class="title-modal">Ajout photo</h2>
                                <label for="input-add" class="label-add">
                                <img src="" alt="image upload" class="img-upload" id="img-preview">
                                <span class="icon-image"><i class="fa-regular fa-image"></i></span>
                                <label for = "input-add" class="label-input-add">+ Ajouter photo</label>
                                <input type="file" name="add-image" id="input-add" />
                                <span class="info-add">jpeg, png : 4mo max</span>
                                </label>
                                <div class="div-input">
                                <label for"input-title">Titre</label>
                                <input type="text" id="input-title">
                                <label for="select-category">Catégories</label>
                                <select name="select-category" id="select-category">
                                <option value="" disable selected>Sélectionner la catégorie </option>
                                <option value="1">Objets</option>
                                <option value="2">Appartements</option>
                                <option value="3">Hotels & restaurants</option>
                                </select>
                                <hr class="separation-bar">
                                <input type="submit" value="Valider" id="input-submit" class="submit-btn">
                                </div>
                                </form>`;
                modalAddWorks.style.display ="flex";

                // Function to change submit btn color when form is fully completed 
                const checkFormValidity = () => {
                    const file = inputAdd.files[0];
                    const title = inputTitle.value.trim();
                    const category = selectCategory.value;
                    if (file && title && category) {
                        submitBtn.style.backgroundColor = "#1D6154"; 
                        submitBtn.style.borderColor = "#1D6154";
                    } else {
                        submitBtn.style.backgroundColor = ""; 
                        submitBtn.style.borderColor = "";
                    }
                };
                // Take back all form elements
                const inputAdd = document.getElementById("input-add");
                const inputTitle = document.getElementById("input-title");
                const selectCategory = document.getElementById("select-category");
                const submitBtn = document.getElementById("input-submit");
                const imgPreview = document.getElementById("img-preview");

                // Add evenlistener to it
                inputAdd.addEventListener("change", checkFormValidity);
                inputTitle.addEventListener("input", checkFormValidity);
                selectCategory.addEventListener("change", checkFormValidity);
                // close second modal
                const closeModalAddBtn = document.getElementById("close-modal2");
                closeModalAddBtn.addEventListener("click", (event) => {
                    event.preventDefault();
                    backdrop.remove();
                });
                // return previoius modal
                const returnPreviousModal = document.getElementById("return");
                returnPreviousModal.addEventListener("click", (event) => {
                    event.preventDefault();
                    modalAddWorks.remove();
                    modal.style.display = "flex";
                }); 
                //add new works
                const formAdd = document.getElementById("form-add");
                formAdd.addEventListener("submit", async (event) => {
                    event.preventDefault();
                    const newWork = await addNewWork(formAdd);
                    // Append the new work to the existing gallery
                    if (newWork) {
                        currentWorks.push(newWork); // Add the new work to the global array
                        createWorksContainer(currentWorks); // Update the gallery with the new list of works
                        const figure = document.createElement("figure");
                        figure.classList.add("figure");
                        figure.classList.add(`figure-${newWork.id}`);
                        const img = document.createElement("img");
                        const trashPic = document.createElement("i");
                        trashPic.classList.add("fa-solid", "fa-trash-can");
                        img.src = newWork.imageUrl;
                        const galleryWorks = document.querySelector(".gallery-modal");
                        galleryWorks.appendChild(figure);
                        figure.appendChild(img);
                        figure.appendChild(trashPic);
                        // delete new works
                        trashPic.addEventListener("click", async (event) => {
                            event.preventDefault();
                            await deleteWorks(event, newWork.id);
                            figure.remove(); // Remove the figure from the modal
                        });
                        // Reset the form
                        formAdd.reset();
                        imgPreview.src = '';
                        imgPreview.style.display = "none"; // Hide image preview after reset

                        // Reset styles and visibility for elements
                        const iconImage = document.querySelector(".icon-image");
                        const labelInputAdd = document.querySelector(".label-input-add");
                        const infoAdd = document.querySelector(".info-add");
                        iconImage.style.display = "flex";
                        labelInputAdd.style.display = "flex";
                        infoAdd.style.display = "flex";
                        inputAdd.style.display = "none";
                        submitBtn.style.backgroundColor = ""; 
                        submitBtn.style.borderColor = "";

                        // Reset the file input label
                        const fileInputLabel = document.querySelector(".file-input-label"); // Adjust the selector as needed
                        if (fileInputLabel) {
                            fileInputLabel.textContent = "aucun fichier choisi"; // Reset the text to default
                        }
                    }
                });
                // selected image preview
                inputAdd.addEventListener("change", (event) => {
                    event.preventDefault();
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            imgPreview.src = e.target.result;
                            const iconImage = document.querySelector(".icon-image");
                            const labelInputAdd = document.querySelector(".label-input-add");
                            const infoAdd = document.querySelector(".info-add");
                            iconImage.style.display ="none";
                            inputAdd.style.display ="none";
                            labelInputAdd.style.display ="none";
                            infoAdd.style.display ="none";
                            imgPreview.style.display= "flex";
                        };
                    reader.readAsDataURL(file);
                    }
                });
            });
        });
    };
};
// function to delete works
async function deleteWorks (event,worksId) {
    try {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const fetchDelete = await fetch(`http://localhost:5678/api/works/${worksId}`,
            {
                method: "DELETE",
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (fetchDelete.ok) {
            currentWorks = currentWorks.filter(work => work.id !== worksId);
            createWorksContainer(currentWorks);
        } else {
            console.error("une erreur s'est produite");
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'image :', error);
    }
    
};
// funnction add new Works
async function addNewWork () {
    const inputAdd = document.getElementById("input-add");
    const inputTitle = document.getElementById("input-title");
    const selectCategory = document.getElementById("select-category");
    if (inputAdd.files && inputTitle.value && selectCategory.value) {
        try {
            const formData = new FormData();
            formData.append("image", inputAdd.files[0]);
            formData.append("title", inputTitle.value);
            formData.append("category", selectCategory.value);
            const token = localStorage.getItem("token"); 
            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                body: formData,
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const newWork = await response.json();
                return newWork; // Return the new work object
            }
        } catch (error) {
            console.log("erreur lors de l'envoie")
        }
    }
};