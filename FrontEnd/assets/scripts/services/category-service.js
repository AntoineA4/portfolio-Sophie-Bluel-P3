export const findAllCategories = async () => {
    return new Promise((resolve,reject) => {
        fetch("http://localhost:5678/api/categories") 
        .then(response => response.json())
        .then(response =>  resolve(response))
        .catch(error => reject(error))
    });
};

export const findAllWorks = async () => {
    return new Promise((resolve,reject) => {
        fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(error => reject(error))
    });
};

export const sendLoginRequest = async () => {
    const loginFormular = document.querySelector(".loginForm");
    loginFormular.addEventListener("submit", async (event) => {
        event.preventDefault();
        const loginInformation = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        const chargeUtile = JSON.stringify(loginInformation);
        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: chargeUtile,
            });
            const data = await response.json();
            if (response.ok) {
                    localStorage.setItem("token", data.token);
                    window.location.href = "index.html";
            } else {
                displayErrorMessage (data.message || "*email ou mot de passe incorrect");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            displayErrorMessage("Erreur");
        }; 
    });
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
