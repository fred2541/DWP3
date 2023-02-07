export async function getWorks(categories,categories_id = null,categories_name = null) {
    document.querySelector(".gallery").innerHTML = "";
    // console.log("demande categories: " + categories);
    const reponse = await fetch('http://localhost:5678/api/works');
    const works = await reponse.json();
    
    // Add filter 'Tous' in first only the first load of index.html
    if (categories_id !== null) {
        categories_id.add(0);
        categories_name.add('Tous');
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

        // add Categories in Set categories_id and categories_name
        if (categories_id !== null) {
            categories_id.add(figure.category.id);
            categories_name.add(figure.category.name);
        }
    }
    // console.log(categories_id);
    // console.log(categories_name);
        return; // Send return at end of function for await !!
    }

