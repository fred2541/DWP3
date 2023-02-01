import { getWorks } from "./works_get.js";
import {getCategories } from "./categories_get.js";

getCategories().then(function (){ eventButton(); });
getWorks(0);


// Gestion des button de categories

function eventButton(){
	const buttonCategories = document.querySelectorAll(".btn-un");
	
	buttonCategories.forEach( function(item) {
		item.addEventListener("click", function () {
			getWorks(item.id);
		});
	});

}





