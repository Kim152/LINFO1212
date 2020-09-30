	let btnMenu = document.querySelector('.btn-menu');
	let barIconX = document.querySelector('.btn-menu i');
	let menu = document.querySelector('.list-container');
	let containerMenu = document.querySelector('.menu');
	var activador = true;

	// Add class "active"
	let enlaces = document.querySelectorAll('.lists li a');

	enlaces.forEach((element) => {
	   
	  element.addEventListener('click', (event) => {
	   enlaces.forEach((link) => {
	     link.classList.remove('active');
	   });
	    event.target.classList.add('active');

	  });

	});

	//efectos 

	let prevScrollPos = window.pageYOffset;
	let goTop = document.querySelector('.go-top');

	window.onscroll = () => {
	  
	  //Hide & Show - Scroll Menu (Function)
	  let currentScrollPos = window.pageYOffset;

	  if (prevScrollPos > currentScrollPos) {
	    containerMenu.style.top = '0px';
	    containerMenu.style.transition = '0.5s';
	  }else{
	    containerMenu.style.top = '-60px';
	    containerMenu.style.transition = '0.5s';
	  }
	  prevScrollPos = currentScrollPos;
	  
	   //Scoll Menu & Go Top & See Down (Styles)
	  let arriba = window.pageYOffset;

	  //Conditions
	  if(arriba <= 600){
	    containerMenu.style.borderBottom = 'none';

	    //Ocultar Go Top
	    goTop.style.right = '-100px';
	  }else{
	    containerMenu.style.borderBottom = '3px solid #ff2e63';

	    //Mostrar Go Top
	    goTop.style.right = '0px';
	  }
  
}