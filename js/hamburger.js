//hamburger menu
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.hamburger-menu');

hamburger.addEventListener('click', function(){
   this.classList.toggle('active');

   if (menu.style.display === "block"){
      menu.style.display = "none";
   } else {
      menu.style.display = "block";
   }
});