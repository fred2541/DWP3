isLoged();




function isLoged () {
	if (window.localStorage.getItem("tokenUser") != null) { // On a un token
		const queryALogin = document.querySelector('[href*="login.html"]');
		queryALogin.innerText = "logout";
		queryALogin.setAttribute("href", "logout.html");
		eventLogout(); // cree l'event logout
		const editLinkObj = document.querySelectorAll('.js-modal');
		const editLink = Array.from(editLinkObj); /* all js-modal*/
		editLink.forEach(a => {
			a.style.display = "initial";
		})
		const woksH2 = document.querySelector('#portfolio h2');
		/* add marginleft for H2 of editlinkobj length *2 for ~center "Mes Projets" */
		woksH2.style.marginLeft = (editLinkObj[0].offsetWidth * 2 ) + 'px';
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