isLoged();


function isLoged () {
	if (window.sessionStorage.getItem("tokenUser") != null) { // On a un token

		// add box on top of page for "Mode édition" and "publier les changement"
		const boxTopElement = document.querySelector('body > div:first-child');
		boxTopElement.style.display = "flex";

		// replace link login by link logout
		const queryALogin = document.querySelector('[href*="login.html"]');
		queryALogin.innerText = "logout";
		queryALogin.setAttribute("href", "logout.html");
		eventLogout(); // cree l'event logout
		
		// Display all link class=.js-modal
		const editLinkObj = document.querySelectorAll('.js-modal');
		const editLink = Array.from(editLinkObj); /* all js-modal*/
		editLink.forEach(a => {
			a.style.display = "initial";
		})

		// add marginleft for H2 of editlinkobj length *2 for ~center "Mes Projets" 
		const woksH2 = document.querySelector('#portfolio h2');
		woksH2.style.marginLeft = (editLinkObj[0].offsetWidth * 2 ) + 'px';
		woksH2.style.marginBottom = '92px'

		// display=none on filter-search
		const searchFilter = document.querySelector('.search-filter')
		searchFilter.style.display = "none"
	}
}

function eventLogout(){ // remove Token and Data in LocalStorage and reload on index.html
	const linkLogout = document.querySelector('[href*="logout.html"]');
	
		linkLogout.addEventListener("click", function (event) {
			Logout()
		});
	

}

function Logout() {
	event.preventDefault();
			window.sessionStorage.removeItem("tokenUser")
			window.localStorage.removeItem("data_works") // Force works reload from BackEnd after logout
			window.location.replace("./")
}