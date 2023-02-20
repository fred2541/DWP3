import { getWorks } from "./works_get.js";
import { getCategories } from "./categories_get.js";
import { deleteWorks } from "./works_delete.js";
import { loadGetCategories } from "./works.js";


async function loadGetWorks(){
	// make card for modal then add delete btn for all card
	await getWorks(0,new Set(),new Set(),true).then(function (){ eventButton(); });
}

loadGetWorks()
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

// Delete all work
function deleteAllWorks() {
	const linkDeleteAll = document.querySelector(".js-delete-all")
	linkDeleteAll.addEventListener("click", function() {
		if (confirm("êtes-vous sûr de vouloir tout supprimer ?")) {
			const works = JSON.parse(window.localStorage.getItem("data_works"));
			for (let i = 0; i < works.length; i++) {
			deleteWorks(works[i].id) // Delete ID from DB and LocalStorage
			}
		}
	})
	
}

// Add icon to zoom on all card
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
		// Clean the erreor div
		document.querySelector('.modal-wrapper > .add-work form > div:nth-last-child(-n+2)').innerHTML = ''

		// Make the input selector for Categories
		const selectorCategories = document.querySelector(".modal-wrapper > .add-work #category")
		const arrayCat = await getCategories(true) // => true to return array only
		
		arrayCat.forEach(function(item, index, array) { // Make the select value
			const opt = document.createElement("option")
			opt.value = item[0]
			opt.text = item[1]
			selectorCategories.add(opt, null)
		})

		// Arrow Back to view modal
		modalAddWork.querySelector('.fa-arrow-left').addEventListener('click', function() { 
			modalAddWork.style.display = "none"
			modalView.style.display = "flex"
			resetFormAddWork()
		})

		// Event on submit
		const form = document.querySelector('.modal-wrapper > .add-work form')
		form.addEventListener('submit', submitFormAddWork)

		const modalInputPicture = document.querySelector("#pictWorkAdd")
		modalInputPicture.addEventListener("change", function handlefile() { // OnChange input file
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
			document.querySelector('.modal-wrapper > .add-work form > div:nth-last-child(-n+2)').innerHTML = ''
			this.removeEventListener("change", handlefile)
		}) // Fin OnChange input file

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
		if (picture.value || title.value) { // Form complete OK
			btnValid.disabled = false
			btnValid.style.background = '#1D6154'
		}else { // Form uncomplete
			btnValid.disabled = false
			btnValid.style.background = '#A7A7A7'
		}
	})
}

async function submitFormAddWork(event) {
	event.preventDefault()
	const form = document.querySelector('.modal-wrapper > .add-work form')

	const data = new FormData(form)
	
	if (data.get("image").size == 0) {
		const errorDiv = document.querySelector('.modal-wrapper > .add-work form > div:nth-last-child(-n+2)')
		errorDiv.innerHTML = 'Vous devez choisir une image !'
		return
	}
	if (data.get("image").size >= 4194304) {
		const errorDiv = document.querySelector('.modal-wrapper > .add-work form > div:nth-last-child(-n+2)')
		errorDiv.innerHTML = "L'image est trop lourde !"
		return
	}
	if (data.get("title") == '') {
		const errorDiv = document.querySelector('.modal-wrapper > .add-work form > div:nth-last-child(-n+2)')
		errorDiv.innerHTML = 'Vous devez renseigner un titre !'
		return	
	}
	
	const charge = {
        image: data.get("image"),
        title: data.get("title"),
        category: data.get("category")
    }
	const chargeUtile = JSON.stringify(charge);
	let reponse = await fetch("http://localhost:5678/api/works", {
			method: "POST",
			headers: { 
				"Authorization": "Bearer " + window.sessionStorage.getItem("tokenUser"),				
			},
			body: data,
		})
	if (reponse.ok) {
		// Remove Works from LocalStorage to FORCE usage of API
		window.localStorage.removeItem("data_works")
		// Reload to update screen
		await getWorks(0)
		await loadGetWorks()

		// back to view in edit mode modal
		const modalView = document.querySelector(".modal-wrapper > .view-delete")
		modalView.style.display = "flex"
		const modalAddWork = document.querySelector(".modal-wrapper > .add-work")
		modalAddWork.style.display = "none"

		resetFormAddWork()
	}
}

function resetFormAddWork() {
	document.querySelector('.modal-wrapper > .add-work form').reset()
	const img = document.querySelector(".modal-wrapper > .add-work form > div:first-child > div:first-child img")
	if (img) {img.remove()}

	document.querySelector(".modal-wrapper > .add-work form > div:first-child > div:first-child").style.display = "none"
	document.querySelector(".modal-wrapper > .add-work form > div:first-child > div:nth-child(2)").style.display = "flex"
	const SelectOption = document.querySelectorAll(".modal-wrapper > .add-work form select option")
	SelectOption.forEach(element => element.remove())
	
	// Push a 'change' event to the form to update the btnValid.disabled
	const formElement = document.querySelector(".modal-wrapper > .add-work form")
	const event = new Event('change')
	formElement.dispatchEvent(event)
}