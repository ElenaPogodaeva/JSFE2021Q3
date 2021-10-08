const iconMenu = document.querySelector('.menu__icon');
//const body = document.querySelector('body');
if (iconMenu) {
	const menuBody = document.querySelector('.menu__body');
	iconMenu.addEventListener("click", function(e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	}
	);
   
	menuBody.addEventListener("click", function(e) {
		if (iconMenu.classList.contains('_active')) {
		  if (e.target.classList.contains('menu__link') || e.target.classList.contains('menu__link-bg')) {
		    document.body.classList.remove('_lock');
		  	iconMenu.classList.remove('_active');
			menuBody.classList.remove('_active');
		  }
	    }
	}
	);
	

}