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
deleteAllWorks() // add Event DeleteAll
zoomWork() // Add event for zoom
addWork() // Add event for btn add work


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

function zoomWork() {
	const workToZoom = document.querySelectorAll(".gallery figure")

	workToZoom.forEach( function(item) {
		item.addEventListener("mouseover", (event) => {
			const spanToZoom = document.querySelector('.gallery span[id="' + item.id + '"] ')
			spanToZoom.style.display = "initial"
		})

		item.addEventListener("mouseout", (event) => {
			const spanToZoom = document.querySelector('.gallery span[id="' + item.id + '"] ')
			spanToZoom.style.display = "none"
		})
	})
}

function addWork() {
	const btnAddWork = document.querySelector(".js-add-work")
	btnAddWork.addEventListener("click", async function() {
		const modalView = document.querySelector(".modal-wrapper > .view-delete")
		modalView.style.display = "none"
		const modalAddWork = document.querySelector(".modal-wrapper > .add-work")
		modalAddWork.style.display = "flex"
		// Disable btnValid
		const btnValid = document.querySelector('.modal-wrapper > .add-work form input[type="submit"]')
		btnValid.disabled = true

		// Make the input selector for Categories
		const selectorCategories = document.querySelector(".modal-wrapper > .add-work #cat")
		const arrayCat = await getCategories(true)
		
		arrayCat.forEach(function(item, index, array) { // Make the select value
			const opt = document.createElement("option")
			opt.values = item[0]
			opt.text = item[1]
			selectorCategories.add(opt, null)
		})

		// Arrow Back to view modal
		modalAddWork.querySelector('.fa-arrow-left').addEventListener('click', function() { 
			modalAddWork.style.display = "none"
			modalView.style.display = "flex"
		})

		const modalInputPicture = document.querySelector("#pictWorkAdd")
		modalInputPicture.addEventListener("change", handleFiles, false)
		function handleFiles() { // OnChange input file
			// Hide btn add picture
			document.querySelector(".modal-wrapper > .add-work form > div:first-child > div:nth-child(2)").style.display = "none"
			
			// print the img
			const divPreview = document.querySelector(".modal-wrapper > .add-work form > div:first-child > div:first-child")
			divPreview.style.display = "flex"
			const file = this.files[0]
			const img = document.createElement("img")
			img.style.width = "129px"
			img.style.height = "169px"
			img.classList.add("obj")
			img.file = file
			divPreview.appendChild(img)
			const reader = new FileReader()
			reader.onload = (function(aImg) {return function(e) { aImg.src = e.target.result }})(img)
			reader.readAsDataURL(file)

		} // Fin OnChange input file
		eventChangeForm()
	} )
}

function eventChangeForm () { // On change in form
	const formElement = document.querySelector(".modal-wrapper > .add-work form")
	formElement.addEventListener('change', (event) => {
		const picture = document.querySelector(".modal-wrapper > .add-work form #pictWorkAdd")
		const title = document.querySelector('.modal-wrapper > .add-work form input[name="title"]')
		const cat = document.querySelector(".modal-wrapper > .add-work form #cat")
		const btnValid = document.querySelector('.modal-wrapper > .add-work form input[type="submit"]')
		if (picture.value && title.value) { // Form complete OK
			btnValid.disabled = false
			btnValid.style.background = '#1D6154'
		}else { // Form uncomplete
			btnValid.disabled = true
		}
	})
}

