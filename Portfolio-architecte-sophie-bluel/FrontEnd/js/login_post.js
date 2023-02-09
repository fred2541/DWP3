export function loginUser() {
    const formulaireLogin = document.querySelector(".formulaire-login");
    formulaireLogin.addEventListener("submit", async function (event) {
    event.preventDefault();    
    // Création de l’objet login.
    const loginInfo = {
        email: event.target.querySelector("[name=email").value,
        password: event.target.querySelector("[name=password]").value,
    };
    // controle mail et pass non vide
    if (!loginInfo.email || !loginInfo.password) {
        erreurLogin(); // Affiche le message d'erreur
        return; // Arrete la demande de log
    }
    // Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(loginInfo);
    // Appel de la fonction fetch avec toutes les informations nécessaires
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    }); // Fin fetch 
    const dataReponse = await reponse.json();

    // Verification si login ok par serveur
    if (reponse.status != 200) { erreurLogin(); return;} // valide uniquement si status = 200

    // sauvegarde du token en Local Storage et redirect en Acceuil
    const tokenUser = dataReponse.token;
    window.localStorage.setItem("tokenUser", tokenUser);
    window.localStorage.removeItem("data_works"); // Force works reload
    window.location.replace("./");
    });
    
 }

 function erreurLogin() {
     const queryLoginErreur = document.querySelector("#login > .erreur");
     queryLoginErreur.innerText = "Erreur dans l’identifiant ou le mot de passe";
 }