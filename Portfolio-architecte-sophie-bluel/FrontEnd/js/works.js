import { getWorks } from "./works_get.js";
import {getCategories } from "./categories_get.js";

getCategories().then(function (){ eventButton(); });
getWorks(0);


// Gestion des button de categories

function eventButton(){
	const buttonCategories = document.querySelectorAll(".btn-un");
	
	buttonCategories.forEach( function(item) {
		// console.log(item);
		item.addEventListener("click", function () {
			// console.log(item.id);
			getWorks(item.id);
		});
	});

}





