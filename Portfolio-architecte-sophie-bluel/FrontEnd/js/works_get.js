export async function getWorks(categories,categories_id = new Set(),categories_name = new Set(),viewModal = null) {

    let works
    // fetch Works from LocalStorage OR from API
    if (window.localStorage.getItem("data_works") === null) {
        // console.log("Chargement des Works par l'API");
        const reponse = await fetch('http://localhost:5678/api/works');
        works = await reponse.json();
        window.localStorage.setItem("data_works", JSON.stringify(works));
    }else {
        // console.log("Chargement des Works par LocalStorage");
        works = JSON.parse(window.localStorage.getItem("data_works"));
    }


    // Remove all works from gallery
    if (viewModal) {                // in view modal
        var selectorQallery = ".modal .gallery"
        document.querySelector(selectorQallery).innerHTML = "";
    } else {                        // in view normal mode
        var selectorQallery = ".gallery"
        document.querySelector(selectorQallery).innerHTML = "";
    }

    // init arrayCat to store all category
    const arrayCat = JSON.parse(window.localStorage.getItem("data_cat"))

    // Filtrage de categories demander
    let worksFiltrees
    if (categories == 0) {
        worksFiltrees = works; // return all works
        categories_id.add(0);
        categories_name.add('Tous');
    }else {                    // return only works for category
        worksFiltrees = works.filter(function(work) {
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

     let captionFigure = document.createElement("figcaption");
     let spanFigure = document.createElement("span");
     let spanFigureZoom = document.createElement("span")
     if (!viewModal) {
        captionFigure.innerText = figure.title;
        } else { // View in modal mode
            // add icon to Delete
            spanFigure.setAttribute('class', 'delete')
            spanFigure.setAttribute('id', figure.id)
            spanFigure.innerHTML = '<i class="fa-solid fa-trash-can fa-inverse"></i>'
            // add icon to zoom
            spanFigureZoom.setAttribute('class', 'zoom')
            spanFigureZoom.setAttribute('id', figure.id)
            spanFigureZoom.innerHTML = '<i class="fa-solid fa-up-down-left-right fa-inverse"></i>'
            // Txt éditer
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
    

    // add Categories in Set categories_id and categories_name (Set -> for filter duplicate)
    if (categories == 0) {
        categories_id.add(figure.category.id);
        categories_name.add(figure.category.name);
    }
}

// Save categories_id and categories_name on LocalStorage
// Only for no filter to have complet list
if (categories == 0 && arrayCat.length == 0) {
    const iterator_name = categories_name.values()
    categories_id.forEach( function(catID){
        // console.log(iterator_name.next().value)
        arrayCat.push([catID,iterator_name.next().value])
    })
    arrayCat.sort()
    // console.log(arrayCat)
    window.localStorage.setItem("data_cat", JSON.stringify(arrayCat)); // push to LocalStorage
    
}
return; // Send return at end of function for await !!
}

