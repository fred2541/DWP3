export async function getWorks(categories) {
    document.querySelector(".gallery").innerHTML = "";
    console.log("demande categories: " + categories);
    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();

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
    	const worksElements = document.querySelector(".gallery")
    	// création de la balise figure
    	const worksFigure = document.createElement("figure");
    	// creation des balise img et figcaption
    	const imageFigure = document.createElement("img");
    	imageFigure.src = figure.imageUrl;
    	imageFigure.alt = figure.title;
    	imageFigure.crossOrigin = "Anonymous"
    	const captionFigure = document.createElement("figcaption");
    	captionFigure.innerText = figure.title;

    	// attache la balise figure a la section gallery
    	worksElements.appendChild(worksFigure);
    	worksFigure.appendChild(imageFigure);
    	worksFigure.appendChild(captionFigure);
    }

}

