import { login } from "../services/auth-service.js";
export const bindLoginForm = async () => {
    const loginFormular = document.querySelector(".loginForm");
    if (loginFormular) {
        loginFormular.addEventListener("submit", async (event) => {
            event.preventDefault();
            try {
                const loginInformation = {
                    email: event.target.querySelector("[name=email]").value,
                    password: event.target.querySelector("[name=password]").value,
                };
                const chargeUtile = JSON.stringify(loginInformation);
                const response = await login(chargeUtile); 
                if (response.token) {
                    localStorage.setItem("token", response.token);
                    window.location.href = "index.html";
                } else {
                    displayErrorMessage (response.error.message || "*email ou mot de passe incorrect");
                }  
            } catch (error) {
                console.error("Erreur lors de la connexion:", error);
                displayErrorMessage ("*email ou mot de passe incorrect");
            }
        });
    };
};
const displayErrorMessage = (message) => {
    let errorMessageElement = document.querySelector(".error-message");
    if (!errorMessageElement) {
        errorMessageElement = document.createElement("div");
        errorMessageElement.classList.add("error-message");
        document.querySelector(".loginForm").appendChild(errorMessageElement);
    }
    
    errorMessageElement.textContent = message;
};

