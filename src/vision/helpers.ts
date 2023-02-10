import { mat3, mat4, vec3 } from "gl-matrix";

export function drawVideoFrameToCanvas(
  canvas: HTMLCanvasElement,
  img: ImageBitmap
) {
  const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
  const x = (canvas.width - img.width * ratio) / 2;
  const y = (canvas.height - img.height * ratio) / 2;
  canvas
    .getContext("2d")
    ?.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      x,
      y,
      img.width * ratio,
      img.height * ratio
    );
}

export function computeProjMat(ratio: number, cameraMatrix: mat3, rmat: mat4, tvec: vec3, viewMatrix: mat4) {
  const projMat = mat4.create();

  const flipMat = mat4.fromValues(
    1,
    0,
    0,
    0,
    0,
    -1,
    0,
    0,
    0,
    0,
    -1,
    0,
    0,
    0,
    0,
    1
  );

  const homogeneousRotMat = mat4.fromValues(
    rmat[0],
    rmat[3],
    rmat[6],
    0,
    rmat[1],
    rmat[4],
    rmat[7],
    0,
    rmat[2],
    rmat[5],
    rmat[8],
    0,
    0,
    0,
    0,
    1
  );

  mat4.mul(projMat, homogeneousRotMat, flipMat);

  const transMat = mat4.fromValues(
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    tvec[0],
    tvec[1],
    tvec[2],
    1
  );

  mat4.mul(projMat, transMat, projMat);
  mat4.mul(projMat, viewMatrix, projMat);

  const focalLength = cameraMatrix[0];

  const perspMat = mat4.fromValues(
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    1 / focalLength,
    0,
    0,
    0,
    0
  );

  mat4.mul(projMat, perspMat, projMat);

  const scaleMat = mat4.fromValues(
    ratio,
    0,
    0,
    0,
    0,
    ratio,
    0,
    0,
    0,
    0,
    ratio,
    0,
    cameraMatrix[2] * ratio,
    cameraMatrix[5] * ratio,
    0,
    1
  );

  mat4.mul(projMat, scaleMat, projMat);
  return projMat;
}
