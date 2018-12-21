//YTSlide
var slideIndex = 0;
//visar första sliden med yt videon
showDivs(slideIndex);

//ifall man klickar på en knapp för att byta så ändrar den till nästa eller föregående slide
function plusDivs(n) {
  showDivs(slideIndex += n);
}

//skapar en funktion och sätter variabeln n och kollar hur många slides det finns. Tar också hand med att visa och inte visa slidesen man är på genom display none och block
function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("YTSlide");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}

//countdown
// sätter en variabel som har datumet till julafton
var countdown = new Date("Dec 24, 2018 0:0:0").getTime();
//lägger en funktion i en loop som updateras varje sekund
var x = setInterval(function() {
  var now = new Date().getTime(); //hämtar datumet som är nuvarande
  var distance = countdown - now; //räknar ut hur lång tid det är kvar
  var days = Math.floor(distance / (1000 * 60 * 60 * 24)); // tar hur många sekunder det är kvar och delar det på antal sekunder på en dag för att få ut hur många dagar det är kvar

  //skriver ut dagar kvar och ifall det är jul skriver den Merry Christmas
  document.getElementById("countdown").innerHTML = days + " Days Left Til Xmas";
  if (distance < 0) {
    clearinterval(x);
    document.getElementById("countdown").innerHTML = "Merry Christmas"
  }
}, 1000)

//----------------------------------------------------------------------
//Bild Slideshow

var slideIndex = 0;
carousel(); // komponent för att blädra bland element
function carousel(){
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; // sätter display till none på sliden
  }
  slideIndex++;
  //börjar om slideshowen från första sliden ifall du har nått sista
  if (slideIndex > x.length) {
    slideIndex = 1;
  }
  x[slideIndex-1].style.display = "block"; //sätter till display block för att visa
  setTimeout(carousel,3000) //animation loop
}

//-------------------------------------------------------------------------
//background animation

//initierar canvasen
window.onload = function(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  //sätter höjd och längd på canvasen till storleken på användarens skärmen
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  //gör en array som alla snöflingor ska sparas i
  var mp = 120;  // max snöflingor
  var particles = [];
  for(var i = 0; i < mp; i++){
    particles.push({ //kastar ut flingorna
      x: Math.random()*W, //randomisar värde på bredden av skrämen
      y: Math.random()*H, //randomisar värde på höjden av skrämen
      r: Math.random()*6, //randomisar radius av flingorna mellan 1 till 6
      d: Math.random()*mp //randomisar densiteten mellan dem
    })
  }

  // ritar snöflingorna
  function draw(){
    ctx.clearRect(0, 0, W, H); //slätar ut en rektangel lika stor som skärmytan
    ctx.fillStyle = "rgb(220, 220, 220)"; //färg på flingorna
    ctx.beginPath(); //rensar det interna sökobjektet och dens sub vägar med andra tar bort subpartikelns position.
    for(var i = 0; i < mp; i++){
      var p = particles[i];
      ctx.moveTo(p.x, p.y); //rör snöflingans path till en punkt utan att dra någon linje på vägen
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true); //fixar uteseendet på flingan så det blir en cirkel
    }
    ctx.fill(); //ger flingorna färgen från fillstyle
    update();
  }

  var angle = 0; //en variabel som sin och cos kommer att påverkas av för att skapa en vertikal och horisontal rörelse på flingorna
  function update(){ //flingornas rörelse
    angle += 0.05;
    for(var i = 0; i < mp; i++){
      var p = particles[i];
      //updaterar x och y kordinaterna samt använder sig av partikelns desitet och radie för att göra dens linje ner mer spontan och olik de andra flingornas.
      //Man har +1 för cos så att flingornas värde inte kan bli minus och börja åka uppåt istället
      p.y += Math.cos(angle+p.d) + 1 + p.r/2;
      p.x += Math.sin(angle) * 2;

      //skickar tillbaka flingorna till toppen av skärmen när de når botten samt gör så att de kan komma från sidorna av skärmen också.
      if(p.x > W+5 || p.x < -5 || p.y > H){
        if(i%3 > 0){ // 66% av alla flingor
          particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
        }
        else{
          if(Math.sin(angle) > 0){ // ifall flingorna åker ut höger åk in från vänster
            particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
          }
          else{ //åk in från höger
            particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
          }
        }
      }
    }
  }
  setInterval(draw, 28); // animation loop
}
