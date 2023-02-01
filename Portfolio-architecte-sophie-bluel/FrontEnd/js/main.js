isLoged();




function isLoged () {
	if (window.localStorage.getItem("tokenUser") != null) { // On a un token
		const queryALogin = document.querySelector('[href*="login.html"]');
		queryALogin.innerText = "logout";
		queryALogin.setAttribute("href", "logout.html");
		eventLogout(); // cree l'event logout
	}
}

function eventLogout(){
	const linkLogout = document.querySelector('[href*="logout.html"]');
	
		linkLogout.addEventListener("click", function (event) {
			event.preventDefault();
			window.localStorage.removeItem("tokenUser");
			window.location.replace("./");
		});
	

}