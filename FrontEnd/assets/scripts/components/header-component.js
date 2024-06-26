import { loggedIn, logOut } from "../services/auth-service.js"
export const createHeader = () => {
    if (loggedIn()) {
        //remove filter
        const btnFilter = document.querySelector(".btnFilter");
            btnFilter.style.display ="none";
            const listeFilter = document.querySelector(".listeFilter");
            listeFilter.style.display ="none";
        //add black hearder
        const blackHeader = document.createElement("div");
        blackHeader.classList.add("black-header");
        document.body.prepend(blackHeader);
        const editBtn = document.createElement("div");
        editBtn.classList.add("edit-btn");
        editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p>`;
        blackHeader.appendChild(editBtn);
        // edit btn to open modal
        const openModalBtn = document.getElementById("openModal");
        openModalBtn.style.display = "flex";
        // change loginto logout + go back to home page when click logout
        const loginBtn = document.querySelector(".btn-login")
        loginBtn.innerText = "Logout"; 
        loginBtn.addEventListener("click",function handler(event) {
            event.preventDefault();
            logOut();
            const blackHeader = document.querySelector(".black-header");
            blackHeader.remove();
            const loginBtn = document.querySelector(".btn-login");
            loginBtn.innerText ="Login";
            loginBtn.removeEventListener("click", handler);
            const openModalBtn = document.getElementById("openModal");
            openModalBtn.remove();
            const btnFilter = document.querySelector(".btnFilter");
            btnFilter.style.display ="flex";
            const listeFilter = document.querySelector(".listeFilter");
            listeFilter.style.display ="flex";
        });
    };
};