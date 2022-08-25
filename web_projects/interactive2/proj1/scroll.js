window.requestAnimationFrame(scrollUpdate)

function scrollUpdate(){
  
  if(window.scrollY > 200) {
    document.body.classList.add('red')
  } else {
    document.body.classList.remove('red')
  }
  // schedule next run
  window.requestAnimationFrame(scrollUpdate)
}