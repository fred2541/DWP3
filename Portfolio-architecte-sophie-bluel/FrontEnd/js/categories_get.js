export async function getCategories(makeSelectorAddWork = null) {
console.log('Make btn-filter')
    // Get filter from API --> not good
    // const reponse = await fetch('http://localhost:5678/api/categories');
    // const categories = await reponse.json();

    // Load data from Local Storage
    const arrayCat = JSON.parse(window.localStorage.getItem("data_cat"))

    // Return arraycat for the add modal ti make the selector
    if (makeSelectorAddWork) { arrayCat.splice(0, 1); return arrayCat }


    // Reset the filter html
    if (!makeSelectorAddWork) {document.querySelector(".search-filter").innerHTML = ""}
    // make all btn and push to DOM
    const buttonElements = document.querySelector(".search-filter")
    arrayCat.forEach((element) => {
        // création du div conteneur du bouton
            const divButton = document.createElement("div")
        // création de la balise button
            const categoriesButton = document.createElement("button")
        // configuration du button
            categoriesButton.setAttribute("id", element[0])
            categoriesButton.setAttribute("class", "btn-un")
            categoriesButton.innerText = element[1]
            buttonElements.appendChild(divButton);
            divButton.appendChild(categoriesButton);
    })
    
}