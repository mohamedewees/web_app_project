const panels = document.querySelectorAll('.panel');

for(i=0; i<panels.length;i++){
   panels[i].addEventListener('click',function print_hello(){
    remove_active ()
    this.classList.add('active');
    //console.log(this.classList);
   });

}


function remove_active (){
    for(i=0; i<panels.length; i++){
        panels[i].classList.remove('active');
    }
}