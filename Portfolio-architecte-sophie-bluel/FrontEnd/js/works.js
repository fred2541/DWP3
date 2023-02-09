import { getWorks } from "./works_get.js";
import { getCategories } from "./categories_get.js";

export function loadGetCategories() {
	getCategories().then(function (){ eventButton(); });
}

await getWorks(0);

loadGetCategories()


// Gestion des button de categories

function eventButton(){
	const buttonCategories = document.querySelectorAll(".btn-un");
	
	buttonCategories.forEach( function(item) {
		item.addEventListener("click", function () {
			getWorks(item.id);
		});
	});

}