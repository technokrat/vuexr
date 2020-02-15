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
  const projMat = new cv.Mat();

  const flipMat = cv.matFromArray(4, 4, cv.CV_64FC1, [
    -1,0,0,0,
    0,1,0,0,
    0,0,-1,0,
    0,0,0,1]
  );

  const rotMat = new cv.Mat(3, 3, cv.CV_64FC1);
  //Convert rotation vector into rotation matrix
  cv.Rodrigues(rvec, rotMat);

  const homogeneousRotMat = cv.matFromArray(4,4,cv.CV_64FC1, [
    rotMat.data64F[0], rotMat.data64F[1], rotMat.data64F[2], 0,
    rotMat.data64F[3], rotMat.data64F[4], rotMat.data64F[5], 0,
    rotMat.data64F[6], rotMat.data64F[7], rotMat.data64F[8], 0,
    0,0,0,1
  ]);



  cv.gemm(homogeneousRotMat, flipMat, 1.0, empty, 1.0, projMat);

  const transMat = cv.matFromArray(4, 4, cv.CV_64FC1, [
    1,0,0,tvec.data64F[0],
    0,1,0,tvec.data64F[1],
    0,0,1,tvec.data64F[2],
    0,0,0,1
    ]
  );

  cv.gemm(transMat, projMat, 1.0, empty, 1.0, projMat);

  const realWidth = getComputedStyle(session.canvas).width.split('px')[0];
  let ratio = realWidth / session.canvas.width;

  const focalLength = cameraMatrix.doubleAt(0,0);

  const perspMat = cv.matFromArray(4, 4, cv.CV_64FC1,
    [1,0,0,0,
           0,1,0,0,
           0,0,1,0,
           0,0,1/focalLength,0]
  );

  cv.gemm(perspMat, projMat, 1.0, empty, 1.0, projMat);

  const scaleMat = cv.matFromArray(4, 4, cv.CV_64FC1,
    [ratio,0,0,cameraMatrix.doubleAt(0,2) * ratio,
      0,ratio,0,cameraMatrix.doubleAt(1,2) * ratio,
      0,0,ratio,0,
      0,0,0,1]
  );

  // const scaleMat = cv.matFromArray(4, 4, cv.CV_64FC1,
  //   [ratio,0,0,session.canvas.width / 2 * ratio,
  //     0,ratio,0,session.canvas.height / 2 * ratio,
  //     0,0,ratio,0,
  //     0,0,0,1]
  // );

  cv.gemm(scaleMat, projMat, 1.0, empty, 1.0, projMat);

  return projMat.t();
}
