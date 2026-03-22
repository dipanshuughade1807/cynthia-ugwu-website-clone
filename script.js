const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
var timeout;

function firstPageAnimation(){
  var tl = gsap.timeline();

  tl.from("#nav",{
    y : '-10',
    opacity : 0,
    duration : 1.5  ,
    ease : Expo.easeInOut
  })
  .to(".boundingelem", {
    y : 0,
    ease : Expo.easeInOut,
    duration : 2,
    delay : -1,
    stagger :.1

  })
  .from("#herofooter",{
    y : '-10',
    opacity : 0,
    duration : 1.5,
    delay : -1,
    ease : Expo.easeInOut
  });
}

function circlesqizz(){

    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

  window.addEventListener("mousemove", function (dets){
    clearTimeout(timeout); 
    // var xdiff = dets.clientX - xprev;
    // var ydiff = dets.clientY - yprev;

    xscale = gsap.utils.clamp(.8,1.2,dets.clientX - xprev);
    yscale = gsap.utils.clamp(.8,1.2,dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollow(xscale, yscale);
    setTimeout(function(){
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100)
  });
}

function circleMouseFollow(xscale, yscale) {
    window.addEventListener("mousemove", function(dets){
      // console.log(dets.clientX, dets.clientY);
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;

    })
}

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrotate = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power4,
            duration : 0.5
        });
    });

    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrotate = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power4,
            top : diff,
            left : dets.clientX,
            rotate : gsap.utils.clamp(-20,20,diffrotate*0.4)
        });
    });
    
});

circlesqizz();
circleMouseFollow();
firstPageAnimation();
