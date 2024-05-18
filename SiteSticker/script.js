let capture;
let canvas;
let stickers = [];
let selfieImage;
const footerText = "Meu Site - www.meusite.com";

function setup() {
  canvas = createCanvas(640, 480);
  canvas.parent('camera-container');
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  let button = select('#snap');
  button.mousePressed(takeSelfie);
  let downloadButton = select('#download');
  downloadButton.mousePressed(downloadImage);
}

function draw() {
  if (!selfieImage) {
    image(capture, 0, 0, 640, 480);
  } else {
    image(selfieImage, 0, 0);
    for (let sticker of stickers) {
      image(sticker.img, sticker.x, sticker.y, 50, 50);
    }
  }
}

function takeSelfie() {
  selfieImage = get();
  stickers = [];
}

function addSticker(stickerSrc) {
  loadImage(stickerSrc, img => {
    stickers.push({
      img: img,
      x: random(width - 50),
      y: random(height - 50)
    });
  });
}

function downloadImage() {
  if (!selfieImage) return;
  
  // Criar uma nova imagem com rodapé
  let finalImage = createGraphics(640, 520);
  finalImage.image(selfieImage, 0, 0);
  for (let sticker of stickers) {
    finalImage.image(sticker.img, sticker.x, sticker.y, 50, 50);
  }
  finalImage.fill(255);
  finalImage.textSize(16);
  finalImage.textAlign(CENTER);
  finalImage.text(footerText, width / 2, height + 20);
  
  save(finalImage, 'selfie_com_sticker.jpg');
}
