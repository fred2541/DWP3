import { getWorks } from "./works_get.js";
import { getCategories } from "./categories_get.js";

export async function loadGetCategories() {
	getCategories().then(function (){ eventButton(); });
}

await getWorks(0);
await loadGetCategories()
activeButton(0) // active btn 'Tous' on load



// Gestion des button de categories

function eventButton(){
	const buttonCategories = document.querySelectorAll(".btn-un");
	
	buttonCategories.forEach( function(item) {
		item.addEventListener("click", async function () {
			await getWorks(item.id); // Get works whit catid filter
			activeButton(item.id) // activ btn on demande
		});
	});

}

function activeButton(activeCat) { // add green background on btn active
	const buttonCategories = document.querySelectorAll(".btn-un")
	buttonCategories.forEach( function(item) {
		if (item.id == activeCat) {
			item.setAttribute("class", "btn-un btn-active")
		} else {
			item.setAttribute("class", "btn-un")
		}
	})
}