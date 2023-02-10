export async function deleteWorks(idToDel = null) {
	if (!idToDel) {return} // quit if no ID specified !


		const reponse = await fetch("http://localhost:5678/api/works/" + idToDel, {
			method: "DELETE",
			headers: { 
				"Content-Type": "application/json",
				"Authorization": "Bearer " + window.localStorage.getItem("tokenUser")
			}
		})
	if (reponse.ok) {
		// delete the figure id=idtodel from modal and works list in backscreen
		const removeFigure = document.querySelectorAll('figure[id="' + idToDel + '"]')
		removeFigure.forEach(function(x){
			x.remove()
		})
		// window.localStorage.removeItem("data_works"); // Force works reload
		const dataWorks = JSON.parse(window.localStorage.getItem("data_works"))
		dataWorks.forEach(function(element, index, dataWorks){
			if (element.id == idToDel) { // remove work from array
				dataWorks.splice(index, 1)
				}
		})
		// Save the new list of works
		window.localStorage.removeItem("data_works")
		window.localStorage.setItem("data_works", JSON.stringify(dataWorks))
		return true
	}
}
