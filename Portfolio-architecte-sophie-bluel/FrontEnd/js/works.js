import { getWorks } from "./works_get.js";
import { getCategories } from "./categories_get.js";


 var categories_id = new Set();
 var categories_name = new Set();
// getWorks(0,categories_id,categories_name).then(function (){});
await getWorks(0,categories_id,categories_name);

getCategories(categories_id,categories_name).then(function (){ eventButton(); });



// Gestion des button de categories

function eventButton(){
	const buttonCategories = document.querySelectorAll(".btn-un");
	
	buttonCategories.forEach( function(item) {
		item.addEventListener("click", function () {
			getWorks(item.id);
		});
	});

}


// pour mettre le lien de la page courante a gras
// a faire
// const testlink = document.querySelectorAll("a");
// console.log(testlink);

