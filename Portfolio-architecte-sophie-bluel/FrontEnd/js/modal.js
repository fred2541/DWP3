import { getWorks } from "./works_get.js";
import { getCategories } from "./categories_get.js";
import { deleteWorks } from "./works_delete.js";
import { loadGetCategories } from "./works.js";

var reloadWorksBack = false

async function loadGetWorks(reloadWorksBack = false){
	console.log('loadgetwork')

	// make card for modal
	await getWorks(0,null,null,true).then(function (){ eventButton(); });

	if (reloadWorksBack) {
		await getWorks(0)
		await loadGetCategories()
	}
	
	
}

loadGetWorks(reloadWorksBack)
deleteAllWorks()


// Event on <span> delete for each card
function eventButton(){
	const buttonDelete = document.querySelectorAll(".delete");
	
	buttonDelete.forEach( function(item) {
		item.addEventListener("click", function () {
			deleteWorks(item.getAttribute("id"))
		});
	});

}

function deleteAllWorks() {
	const linkDeleteAll = document.querySelector(".js-delete-all")
	linkDeleteAll.addEventListener("click", function() {
		if (confirm("êtes-vous sûr de vouloir tout supprimer ?")) {
			const works = JSON.parse(window.localStorage.getItem("data_works"));
			for (let i = 0; i < works.length; i++) {
				console.log('id' + i + ' to del')
			// deleteWorks(i) // Delete ID from DB and LocalStorage
			}
		}
	})
	
}