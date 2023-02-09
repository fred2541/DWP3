export async function getCategories() {

console.log('tri des categories')
    // Get filter from API --> not good
    // const reponse = await fetch('http://localhost:5678/api/categories');
    // const categories = await reponse.json();

    // const iterator_name = categories_name.values();
    const categories_name = new Set(JSON.parse(window.localStorage.getItem("data_cat_name")))
    const iterator_name = categories_name.values()
    let iterator_id = JSON.parse(window.localStorage.getItem("data_cat_id"))
    
    for (let i of iterator_id) {
        const button = iterator_id
        // recuperation element du DOM gallery
        const buttonElements = document.querySelector(".search-filter")
        // création du div conteneur du bouton
        const divButton = document.createElement("div");
        // création de la balise button
        const categoriesButton = document.createElement("button");
        // configuration du button
        categoriesButton.setAttribute("id", i);
        categoriesButton.setAttribute("class", "btn-un");
        categoriesButton.innerText = iterator_name.next().value;

        // attache la balise button a search-filter
        buttonElements.appendChild(divButton);
        divButton.appendChild(categoriesButton);
    }
}