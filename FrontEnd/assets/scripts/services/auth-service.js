export const login = async (chargeUtile) => {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:5678/api/users/login", {
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: chargeUtile,
        })
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}
export const loggedIn = () => {
    return (localStorage.getItem("token")!== null)
}
export const logOut = () => {
    localStorage.removeItem("token");
}