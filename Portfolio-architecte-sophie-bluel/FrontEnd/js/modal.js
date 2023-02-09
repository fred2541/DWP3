import { getWorks } from "./works_get.js";
import { deleteWorks } from "./works_delete.js";

async function loadGetWorks(){
	await getWorks(0,null,null,true).then(function (){ eventButton(); });
	await getWorks(0);	
}

loadGetWorks()


// Event on <span> delete
function eventButton(){
	const buttonDelete = document.querySelectorAll(".delete");
	
	buttonDelete.forEach( function(item) {
		item.addEventListener("click", function () {
			// console.log(item.getAttribute("id"))
			deleteWorks(item.getAttribute("id")).then(function(){loadGetWorks()})
		});
	});

}