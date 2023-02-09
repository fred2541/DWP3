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
		console.log('OK .... :)')
		window.localStorage.removeItem("data_works"); // Force works reload
		return true
	}
}
