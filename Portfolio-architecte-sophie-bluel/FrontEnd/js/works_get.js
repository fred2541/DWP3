export async function getWorks(categories,categories_id = new Set(),categories_name = new Set(),viewModal = null) {
// var categories_id = new Set();
// var categories_name = new Set();
    console.log('Categories demander ' + categories)
    // fetch Works from LocalStorage OR from API
    if (window.localStorage.getItem("data_works") === null) {
        // console.log("Chargement des Works par l'API");
        const reponse = await fetch('http://localhost:5678/api/works');
        var works = await reponse.json();
        window.localStorage.setItem("data_works", JSON.stringify(works));
    }else {
        // console.log("Chargement des Works par LocalStorage");
        var works = JSON.parse(window.localStorage.getItem("data_works"));
    }



    // Add filter 'Tous' in first only the first load of index.html
    // if (categories_id !== null) {

        // console.log('Make All BTN')
    // }

    // Remove all works from gallery div
    if (viewModal) { // view in modal
        var selectorQallery = ".modal .gallery"
        document.querySelector(selectorQallery).innerHTML = "";
    } else { // view in normal mode
        var selectorQallery = ".gallery"
        document.querySelector(selectorQallery).innerHTML = "";
    }

    const existingCategories = false
    const arrayCat = []

    // Filtrage de categories demander
    if (categories == 0) {
        var worksFiltrees = works;
        categories_id.add(0);
        categories_name.add('Tous');
    }else {
        var worksFiltrees = works.filter(function(work) {
            return work.categoryId == categories;
        });
    }

    for (let i = 0; i < worksFiltrees.length; i++) {
     const figure = worksFiltrees[i];
    	// recuperation element du DOM gallery
     const worksElements = document.querySelector(selectorQallery)
    	// création de la balise figure
     const worksFigure = document.createElement("figure");
     worksFigure.setAttribute('id', figure.id)
    	// creation des balise img et figcaption
     const imageFigure = document.createElement("img");
     imageFigure.src = figure.imageUrl;
     imageFigure.alt = figure.title;
     imageFigure.crossOrigin = "Anonymous"
     if (!viewModal) {
        var captionFigure = document.createElement("figcaption");
        captionFigure.innerText = figure.title;
        } else { // View in modal mode
            // add icon to Delete
            var spanFigure = document.createElement("span");
            spanFigure.setAttribute('class', 'delete')
            spanFigure.setAttribute('id', figure.id)
            spanFigure.innerHTML = '<i class="fa-solid fa-trash-can fa-inverse"></i>'
            // add icon to zoom
            var spanFigureZoom = document.createElement("span")
            spanFigureZoom.setAttribute('class', 'zoom')
            spanFigureZoom.setAttribute('id', figure.id)
            spanFigureZoom.innerHTML = '<i class="fa-solid fa-up-down-left-right fa-inverse"></i>'

            // Txt éditer
            var captionFigure = document.createElement("figcaption");
            captionFigure.innerHTML = '<a href="#id' + figure.id + '">éditer</a>';
        }


    	// attache la balise figure a la section gallery
        worksElements.appendChild(worksFigure);
    if (viewModal) { // add <span> only in view modal (delete + zoom)
        worksFigure.appendChild(spanFigureZoom)
        worksFigure.appendChild(spanFigure);
    }
    worksFigure.appendChild(imageFigure);
    worksFigure.appendChild(captionFigure);
    

        // add Categories in Set categories_id and categories_name
    if (categories == 0) {
        categories_id.add(figure.category.id);
        categories_name.add(figure.category.name);
    }
}
// Save categories_id and categories_name on LocalStorage
// Only for no filter to have complet list
const iterator_name = categories_name.values()
if (categories == 0) {
    categories_id.forEach( function(catID){
        // console.log(iterator_name.next().value)
    arrayCat.push([catID,iterator_name.next().value])
    })
    arrayCat.sort()
    // console.log(arrayCat)
    window.localStorage.setItem("data_cat", JSON.stringify(arrayCat));
    window.localStorage.removeItem("data_cat_id")
    window.localStorage.removeItem("data_cat_name")
    window.localStorage.setItem("data_cat_id", JSON.stringify(Array.from(categories_id)));
    window.localStorage.setItem("data_cat_name", JSON.stringify(Array.from(categories_name)));
}
return; // Send return at end of function for await !!
    }

