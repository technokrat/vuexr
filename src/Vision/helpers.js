import cv from '../../vendor/opencv.js';

export function grayOut(frame) {
    const grayImage = new cv.Mat();
    cv.cvtColor(frame, grayImage, cv.COLOR_BGR2GRAY, 0);
    return grayImage;
}

export function readImage(canvas) {
  return cv.imread(canvas);
}

export function showImage(canvas, frame) {
  return cv.imshow(canvas, frame);
}

export function drawVideoFrameToCanvas(canvas, img) {
  //canvas.width = getComputedStyle(canvas).width.split('px')[0];
  //canvas.height = getComputedStyle(canvas).height.split('px')[0];
  let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
  let x = (canvas.width - img.width * ratio) / 2;
  let y = (canvas.height - img.height * ratio) / 2;
  //canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
    x, y, img.width * ratio, img.height * ratio);
}
