import { loggedIn, logOut } from "../services/auth-service.js"
export const createHeader = () => {
    if (loggedIn()) {
        //remove filter
        document.querySelector(".btnFilter").remove();
        //add black hearder
        const blackHeader = document.createElement("div");
        blackHeader.classList.add("black-header");
        document.body.prepend(blackHeader);
        const editBtn = document.createElement("div");
        editBtn.classList.add("edit-btn");
        editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p>Mode édition</p>`;
        blackHeader.appendChild(editBtn);
        // edit btn to open modal
        // change loginto logout
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
        });
    };
};