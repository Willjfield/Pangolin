import './style.css'
import { sketch } from 'p5js-wrapper';
import Insect from './insect.js';

let insects = [];
let difficulty = .005;
let score = 0;

let rolyPolyImgs = [];
let antImgs = [];
let bg;

sketch.preload = function () {
  rolyPolyImgs.push(loadImage('/RolyPoly/0.png'));
  rolyPolyImgs.push(loadImage('/RolyPoly/1.png'));
  for (let a = 0; a < 19; a++) {
    antImgs.push(loadImage(`/Ants/${a}.png`))
  }
  bg = loadImage('/background.jpg');
}

function shouldSpawn() {
  let _shouldSpawn = Math.random() < difficulty;
  if (_shouldSpawn) difficulty += .0001;
  return _shouldSpawn
}

sketch.setup = function () {
  createCanvas(window.innerWidth, window.innerHeight);
  background(127);
  
};

sketch.draw = function () {
  imageMode(CORNER);
  image(bg,0,0,window.innerWidth,window.innerHeight)
  imageMode(CENTER);
  //noStroke();



  if (shouldSpawn()) {
    insects.push(new Insect(difficulty * 200));
  }
  const antFrame = Math.floor(frameCount / 10);
  for (let i = 0; i < insects.length; i++) {
    insects[i].move();

    const antSprite = Math.floor((antFrame + i) % 19);

    insects[i].draw(antImgs[antSprite]);
    const eaten = insects[i].eat()
    if (eaten) {
      score++
      insects.splice(insects.indexOf(insects[i]), 1)
    }

   

  }
  let sprite = frameCount % 30 > 15 ? 1 : 0;

  image(rolyPolyImgs[sprite], mouseX, window.innerHeight - 150, 150, 300);
  fill(255);
  textSize(32);
  text('SCORE: ' + score, 50, 50);

};

sketch.mousePressed = function () {
  console.log(`I am here at ${mouseX}:${mouseY}`);
};

sketch.touchStarted = function () {
  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
}

/* full screening will change the size of the canvas */
sketch.windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling the page.
 */
document.ontouchmove = function (event) {
  event.preventDefault();
};



