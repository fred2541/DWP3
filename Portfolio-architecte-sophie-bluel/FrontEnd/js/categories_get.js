export async function getCategories() {
    const reponse = await fetch('http://localhost:5678/api/categories');
    const categories = await reponse.json();

    for (let i = 0; i < categories.length; i++) {
        const button = categories[i];
        // recuperation element du DOM gallery
        const buttonElements = document.querySelector(".search-filter")
        // création du div conteneur du bouton
        const divButton = document.createElement("div");
        // création de la balise button
        const categoriesButton = document.createElement("button");
        // configuration du button
        categoriesButton.setAttribute("id", button.id);
        categoriesButton.setAttribute("class", "btn-un");
        categoriesButton.innerText = button.name;

        // attache la balise button a search-filter
        buttonElements.appendChild(divButton);
        divButton.appendChild(categoriesButton);
    }
}