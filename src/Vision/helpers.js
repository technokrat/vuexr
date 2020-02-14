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

export function computeProjMat(session, cameraMatrix, rvec, tvec)
{
  const empty = new cv.Mat();

  const rotMat = new cv.Mat(3, 3, cv.CV_64FC1);
  //Convert rotation vector into rotation matrix
  cv.Rodrigues(rvec, rotMat);

  // Construct RotTrans homogenous matrix
  const rotTransMat = new cv.Mat(3, 4, cv.CV_64FC1); //Init.
  const rotTransMatArray = new cv.MatVector();
  //Append translation vector to rotation matrix
  rotTransMatArray.push_back(rotMat);
  rotTransMatArray.push_back(tvec);
  cv.hconcat(rotTransMatArray, rotTransMat);

  const homogenousRotTransMat = new cv.Mat(4, 4, cv.CV_64FC1); //Init.
  const homogenousTransMatArray = new cv.MatVector();
  homogenousTransMatArray.push_back(rotTransMat);
  const homogenousVec = cv.matFromArray(1, 4, cv.CV_64FC1, [0,0,0,1]);
  homogenousTransMatArray.push_back(homogenousVec);

  cv.vconcat(homogenousTransMatArray, homogenousRotTransMat);

  const invertZ = cv.matFromArray(4, 4, cv.CV_64FC1,
    [1,0,0,0,
      0,1,0,0,
      0,0,-1,0,
      0,0,0,1]
  );

  //cv.gemm(invertZ, homogenousRotTransMat, 1.0, empty, 1.0, homogenousRotTransMat);

  const realHeight = getComputedStyle(session.canvas).height.split('px')[0];
  let ratio = realHeight / session.canvas.height;

  // Apply Perspective
  const focalLength = cameraMatrix.doubleAt(0,0);

  const perspMat = cv.matFromArray(4, 4, cv.CV_64FC1,
    [focalLength,0,0,0,
           0,focalLength,0,0,
           0,0,focalLength,0,
           0,0,1,0]
  );

  const projMat = new cv.Mat();


  cv.gemm(perspMat, homogenousRotTransMat, 1.0, empty, 1.0, projMat);

  const scaleMat = cv.matFromArray(4, 4, cv.CV_64FC1,
    [ratio,0,0,cameraMatrix.doubleAt(0,2) * ratio,
      0,ratio,0,cameraMatrix.doubleAt(1,2) * ratio,
      0,0,ratio,0,
      0,0,0,1]
  );

  cv.gemm(scaleMat, projMat, 1.0, empty, 1.0, projMat);

  console.log(projMat)

  return projMat.t();
}
