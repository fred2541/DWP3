isLoged();




function isLoged () {
	if (window.localStorage.getItem("tokenUser") != null) { // On a un token
		const queryALogin = document.querySelector('[href*="login.html"]');
		queryALogin.innerText = "logout";
		queryALogin.setAttribute("href", "logout.html");
		eventLogout(); // cree l'event logout
		const editLink = Array.from(document.querySelectorAll('.js-modal')); /* all js-modal*/
		console.log(editLink)
		editLink.forEach(a => {
			a.style.display = "initial";
		})
	}
}

function eventLogout(){
	const linkLogout = document.querySelector('[href*="logout.html"]');
	
		linkLogout.addEventListener("click", function (event) {
			event.preventDefault();
			window.localStorage.removeItem("tokenUser");
			window.localStorage.removeItem("data_works"); // Force works reload from BackEnd after logout
			window.location.replace("./");
		});
	

}