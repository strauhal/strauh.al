(function() {
    // Add event listener
    document.addEventListener("mousemove", parallax);
    const elem = document.querySelector(".parallax");
    // Magic happens here
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${90 - (_mouseX - _w) * 0.01}% ${90 - (_mouseY - _h) * 0.01}%`;
        let _depth2 = `${10 - (_mouseX - _w) * 0.02}% ${10 - (_mouseY - _h) * 0.02}%`;
        let _depth3 = `${60 - (_mouseX - _w) * 0.06}% ${30 - (_mouseY - _h) * 0.06}%`;
        let _depth4 = `${20 - (_mouseX - _w) * 0.08}% ${70 - (_mouseY - _h) * 0.08}%`;
        let _depth5 = `${50 - (_mouseX - _w) * 0.10}% ${50 - (_mouseY - _h) * 0.10}%`;
        let _depth6 = `${50 - (_mouseX - _w) * 0.12}% ${50 - (_mouseY - _h) * 0.12}%`;
        let x = `${_depth6}, ${_depth5}, ${_depth4}, ${_depth3}, ${_depth2}, ${_depth1}`;
        console.log(x);
        elem.style.backgroundPosition = x;
    }

})();

// hey will, if you're reading this, i used the parallax visual from 
// this website (https://codepen.io/oscicen/pen/zyJeJw) 

// the parallax.js file was janky as hell, so i thought i should let you know