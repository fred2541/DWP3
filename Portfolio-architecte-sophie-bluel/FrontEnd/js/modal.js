import { getWorks } from "./works_get.js";
import { getCategories } from "./categories_get.js";
import { deleteWorks } from "./works_delete.js";
import { loadGetCategories } from "./works.js";

var reloadWorksBack = false

async function loadGetWorks(reloadWorksBack){
	console.log('loadgetwork')

	// make card for modal
	await getWorks(0,null,null,true).then(function (){ eventButton(); });

	if (reloadWorksBack) {
		await getWorks(0)
		await loadGetCategories()
	}
	
	
}

loadGetWorks(reloadWorksBack)


// Event on <span> delete
function eventButton(){
	const buttonDelete = document.querySelectorAll(".delete");
	
	buttonDelete.forEach( function(item) {
		item.addEventListener("click", function () {
			// console.log(item.getAttribute("id"))
			deleteWorks(item.getAttribute("id")).then(function(){loadGetWorks(true)})
		});
	});

}