let video;
let resVidX;
let resVidY;

let myDiv = document.querySelector(".video-container");

let density0 = "@$0%+=|i-:. ";
let density1 = "Ñ@#W$9876543210?!abc;:+=-,._ ";
let blank = " ";

let density = density0 + blank;
let mode = 2;

let dimx = window.innerWidth;
let dimy = window.innerHeight;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  let minRes = 64;
  
  if ( video.width >= video.height ) {
    resVidY = minRes;
    resVidX = Math.trunc(video.width*resVidY/video.height);
  } else {
    resVidX = minRes;
    resVidY = Math.trunc(video.height*resVidX/video.width);
  }
  video.size(resVidX,resVidX);
  video.hide();
}

function draw() {
  let myDivImg = "<p>";
  video.loadPixels();
  for (let j = 0; j < resVidY; j ++) {
    for (let i = 0 ; i < resVidX; i++) {
      let pixId = ( (resVidX-1-i) + j*resVidX )*4;
      let r = video.pixels[pixId+0];
      let g = video.pixels[pixId+1];
      let b = video.pixels[pixId+2];
      let avg = (3*r+g+2*b)/6;
      
      let charId = map(avg,0,255,density.length-1,0);
      charId = floor(charId);
      if (density[charId] == " ") myDivImg += "&nbsp;" ;
      else myDivImg += density[charId] ;
    }
    myDivImg += "<br>";
  }
  myDivImg += "</p>"
  myDiv.innerHTML = myDivImg;
}

function modeBtn() {
  mode++;
  if (mode%2 == 0) density = density0 + blank;
  else density = density1 + blank;
}

function plusBtn() {
  if (blank.length < 7) blank += " ";
  if (mode%2 == 0) density = density0 + blank;
  else density = density1 + blank;
}

function minusBtn() {
  if (blank.length > 0) blank = blank.slice(0, -1); 
  if (mode%2 == 0) density = density0 + blank;
  else density = density1 + blank;
}




