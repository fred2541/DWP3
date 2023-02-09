export async function getWorks(categories,categories_id = null,categories_name = null,viewModal = null) {

    // fetch Works from LocalStorage OR from API
    if (window.localStorage.getItem("data_works") === null) {
        console.log("Chargement des Works par l'API");
        const reponse = await fetch('http://localhost:5678/api/works');
        var works = await reponse.json();
        window.localStorage.setItem("data_works", JSON.stringify(works));
    }else {
        console.log("Chargement des Works par LocalStorage");
        var works = JSON.parse(window.localStorage.getItem("data_works"));
    }



    // Add filter 'Tous' in first only the first load of index.html
    if (categories_id !== null) {
        categories_id.add(0);
        categories_name.add('Tous');
    }

    if (viewModal) { // view in modal
        var selectorQallery = ".modal .gallery"
        document.querySelector(selectorQallery).innerHTML = "";
    } else { // view in normal mode
        var selectorQallery = ".gallery"
        document.querySelector(selectorQallery).innerHTML = "";
    }


    // Filtrage de categories demander
    if (categories == 0) {
        var worksFiltrees = works;
    }else {
        var worksFiltrees = works.filter(function(work) {
            return work.categoryId == categories;
        });
    }

    for (let i = 0; i < worksFiltrees.length; i++) {
       const figure = worksFiltrees[i];
    	// recuperation element du DOM gallery
       const worksElements = document.querySelector(selectorQallery)
       // console.log(worksElements)
    	// création de la balise figure
       const worksFigure = document.createElement("figure");
    	// creation des balise img et figcaption
       const imageFigure = document.createElement("img");
       imageFigure.src = figure.imageUrl;
       imageFigure.alt = figure.title;
       imageFigure.crossOrigin = "Anonymous"
       if (!viewModal) {
        var captionFigure = document.createElement("figcaption");
        captionFigure.innerText = figure.title;
        } else {
            var spanFigure = document.createElement("span");
            spanFigure.setAttribute('class', 'delete')
            spanFigure.setAttribute('id', figure.id)
            spanFigure.innerHTML = '<i class="fa-solid fa-trash-can fa-inverse"></i>'
            var captionFigure = document.createElement("figcaption");
            captionFigure.innerHTML = '<a href="#id' + figure.id + '">éditer</a>';
        }


    	// attache la balise figure a la section gallery
    worksElements.appendChild(worksFigure);
    if (viewModal) {
        worksFigure.appendChild(spanFigure);
    }
    worksFigure.appendChild(imageFigure);
    worksFigure.appendChild(captionFigure);
    

        // add Categories in Set categories_id and categories_name
    if (categories_id !== null) {
        categories_id.add(figure.category.id);
        categories_name.add(figure.category.name);
    }
}
        return; // Send return at end of function for await !!
    }

