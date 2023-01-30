var CA = Object.defineProperty;
var IA = (e, A, r) => A in e ? CA(e, A, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[A] = r;
var oA = (e, A, r) => (IA(e, typeof A != "symbol" ? A + "" : A, r), r);
import { defineComponent as L, openBlock as E, createElementBlock as D, createElementVNode as X, createTextVNode as N, withDirectives as QA, Fragment as wA, renderList as bA, toDisplayString as iA, vModelSelect as BA, createCommentVNode as G, createStaticVNode as kA, pushScopeId as MA, popScopeId as yA, resolveComponent as cA, normalizeStyle as FA, renderSlot as fA, createVNode as pA, createBlock as EA, Transition as DA, withCtx as VA } from "vue";
class RA {
  constructor(A) {
    this.session = A, this.findChessboardOngoing = !1, this.calibrationOngoing = !1, this.captureNextCalibrationPoints = !1, this.cameraMatrix = null, this.distCoeffs = null, this.calibrationStatus = {
      captureReady: !1,
      calibrated: !1,
      captures: 0
    };
  }
  resetCalibrationPoints() {
    this.session.worker.postMessage({
      operation: "RESET_CALIBRATION_POINTS"
    }), this.calibrationStatus.captures = 0, this.session.eventCallback({ name: "statusChanged" });
  }
  resetCameraCalibration() {
    this.cameraMatrix = null, this.distCoeffs = null, this.calibrationStatus.calibrated = !1, this.session.eventCallback({ name: "statusChanged" });
  }
  loadCameraCalibration() {
    let A = window.localStorage.getItem(`vuexr/${this.session.name}/calibration/${this.session.feed.feedStatus.selected}`);
    return A ? (A = JSON.parse(A), this.resetCameraCalibration(), this.cameraMatrix = A.cameraMatrix, this.distCoeffs = A.distCoeffs, this.calibrationStatus.calibrated = !0, this.session.state = "DETECTION", this.session.eventCallback({ name: "statusChanged" }), !0) : !1;
  }
  storeCameraCalibration() {
    if (this.cameraMatrix) {
      const A = {
        cameraMatrix: this.cameraMatrix,
        distCoeffs: this.distCoeffs
      };
      return window.localStorage.setItem(`vuexr/${this.session.name}/calibration/${this.session.feed.feedStatus.selected}`, JSON.stringify(A)), !0;
    } else
      return !1;
  }
  findChessBoardCorners(A = !0) {
    this.findChessboardOngoing || (this.findChessboardOngoing = !0, this.session.worker.postMessage({
      operation: "FIND_CHESSBOARD_CORNERS",
      image: this.session.canvas.getContext("2d").getImageData(0, 0, this.session.canvas.width, this.session.canvas.height),
      captureNextCalibrationPoints: this.captureNextCalibrationPoints,
      highlight: A
    }));
  }
  findChessBoardCornersCaptured() {
    this.findChessboardOngoing = !1, this.captureNextCalibrationPoints = !1, this.calibrationStatus.captures++, this.session.eventCallback({ name: "statusChanged" });
  }
  findChessBoardCornersCaptureReady() {
    this.findChessboardOngoing = !1, this.calibrationStatus.captureReady = !0, this.session.eventCallback({ name: "statusChanged" });
  }
  findChessBoardCornersCaptureNotReady() {
    this.findChessboardOngoing = !1, this.calibrationStatus.captureReady = !1, this.session.eventCallback({ name: "statusChanged" });
  }
  setCaptureNextcalibrationPoints() {
    this.captureNextCalibrationPoints = !0;
  }
  calibrate(A) {
    this.calibrationOngoing || (this.calibrationOngoing = !0, this.session.worker.postMessage({
      operation: "CALIBRATE",
      width: A.width,
      height: A.height
    }));
  }
  calibrationFinished(A) {
    this.calibrationOngoing = !1, this.cameraMatrix = A.result.calibration.cameraMatrix, this.distCoeffs = A.result.calibration.distCoeffs, this.storeCameraCalibration(), this.calibrationStatus.calibrated = !0, this.session.eventCallback({ name: "statusChanged" });
  }
}
class SA {
  constructor(A) {
    this.session = A, this.detectionOngoing = !1;
  }
  detect(A = !0) {
    if (!this.detectionOngoing) {
      this.detectionOngoing = !0;
      try {
        this.session.worker.postMessage({
          operation: "DETECT",
          image: this.session.canvas.getContext("2d").getImageData(0, 0, this.session.canvas.width, this.session.canvas.height),
          calibration: {
            cameraMatrix: JSON.parse(JSON.stringify(this.session.calibration.cameraMatrix)),
            distCoeffs: JSON.parse(JSON.stringify(this.session.calibration.distCoeffs))
          },
          highlight: A
        });
      } catch (r) {
        this.detectionOngoing = !1, console.log(r);
      }
    }
  }
  detectionFinished(A) {
    this.detectionOngoing = !1, this.session.calibration.calibrationStatus.calibrated && this.session.poser.setMarkers(A.result.markers);
  }
}
var XA = 1e-6, U = typeof Float32Array < "u" ? Float32Array : Array;
Math.hypot || (Math.hypot = function() {
  for (var e = 0, A = arguments.length; A--; )
    e += arguments[A] * arguments[A];
  return Math.sqrt(e);
});
function zA() {
  var e = new U(9);
  return U != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[0] = 1, e[4] = 1, e[8] = 1, e;
}
function J() {
  var e = new U(16);
  return U != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0), e[0] = 1, e[5] = 1, e[10] = 1, e[15] = 1, e;
}
function q(e, A, r, c, h, d, f, o, I, s, t, a, m, u, n, C) {
  var g = new U(16);
  return g[0] = e, g[1] = A, g[2] = r, g[3] = c, g[4] = h, g[5] = d, g[6] = f, g[7] = o, g[8] = I, g[9] = s, g[10] = t, g[11] = a, g[12] = m, g[13] = u, g[14] = n, g[15] = C, g;
}
function KA(e, A) {
  var r = A[0], c = A[1], h = A[2], d = A[3], f = A[4], o = A[5], I = A[6], s = A[7], t = A[8], a = A[9], m = A[10], u = A[11], n = A[12], C = A[13], g = A[14], l = A[15], V = r * o - c * f, F = r * I - h * f, B = r * s - d * f, Q = c * I - h * o, M = c * s - d * o, p = h * s - d * I, v = t * C - a * n, i = t * g - m * n, R = t * l - u * n, w = a * g - m * C, b = a * l - u * C, k = m * l - u * g, y = V * k - F * b + B * w + Q * R - M * i + p * v;
  return y ? (y = 1 / y, e[0] = (o * k - I * b + s * w) * y, e[1] = (h * b - c * k - d * w) * y, e[2] = (C * p - g * M + l * Q) * y, e[3] = (m * M - a * p - u * Q) * y, e[4] = (I * R - f * k - s * i) * y, e[5] = (r * k - h * R + d * i) * y, e[6] = (g * B - n * p - l * F) * y, e[7] = (t * p - m * B + u * F) * y, e[8] = (f * b - o * R + s * v) * y, e[9] = (c * R - r * b - d * v) * y, e[10] = (n * M - C * B + l * V) * y, e[11] = (a * B - t * M - u * V) * y, e[12] = (o * i - f * w - I * v) * y, e[13] = (r * w - c * i + h * v) * y, e[14] = (C * F - n * Q - g * V) * y, e[15] = (t * Q - a * F + m * V) * y, e) : null;
}
function dA(e, A, r) {
  var c = A[0], h = A[1], d = A[2], f = A[3], o = A[4], I = A[5], s = A[6], t = A[7], a = A[8], m = A[9], u = A[10], n = A[11], C = A[12], g = A[13], l = A[14], V = A[15], F = r[0], B = r[1], Q = r[2], M = r[3];
  return e[0] = F * c + B * o + Q * a + M * C, e[1] = F * h + B * I + Q * m + M * g, e[2] = F * d + B * s + Q * u + M * l, e[3] = F * f + B * t + Q * n + M * V, F = r[4], B = r[5], Q = r[6], M = r[7], e[4] = F * c + B * o + Q * a + M * C, e[5] = F * h + B * I + Q * m + M * g, e[6] = F * d + B * s + Q * u + M * l, e[7] = F * f + B * t + Q * n + M * V, F = r[8], B = r[9], Q = r[10], M = r[11], e[8] = F * c + B * o + Q * a + M * C, e[9] = F * h + B * I + Q * m + M * g, e[10] = F * d + B * s + Q * u + M * l, e[11] = F * f + B * t + Q * n + M * V, F = r[12], B = r[13], Q = r[14], M = r[15], e[12] = F * c + B * o + Q * a + M * C, e[13] = F * h + B * I + Q * m + M * g, e[14] = F * d + B * s + Q * u + M * l, e[15] = F * f + B * t + Q * n + M * V, e;
}
function lA(e, A, r) {
  var c = r[0], h = r[1], d = r[2], f, o, I, s, t, a, m, u, n, C, g, l;
  return A === e ? (e[12] = A[0] * c + A[4] * h + A[8] * d + A[12], e[13] = A[1] * c + A[5] * h + A[9] * d + A[13], e[14] = A[2] * c + A[6] * h + A[10] * d + A[14], e[15] = A[3] * c + A[7] * h + A[11] * d + A[15]) : (f = A[0], o = A[1], I = A[2], s = A[3], t = A[4], a = A[5], m = A[6], u = A[7], n = A[8], C = A[9], g = A[10], l = A[11], e[0] = f, e[1] = o, e[2] = I, e[3] = s, e[4] = t, e[5] = a, e[6] = m, e[7] = u, e[8] = n, e[9] = C, e[10] = g, e[11] = l, e[12] = f * c + t * h + n * d + A[12], e[13] = o * c + a * h + C * d + A[13], e[14] = I * c + m * h + g * d + A[14], e[15] = s * c + u * h + l * d + A[15]), e;
}
function uA(e, A) {
  var r = A[0], c = A[1], h = A[2], d = A[3], f = r + r, o = c + c, I = h + h, s = r * f, t = c * f, a = c * o, m = h * f, u = h * o, n = h * I, C = d * f, g = d * o, l = d * I;
  return e[0] = 1 - a - n, e[1] = t + l, e[2] = m - g, e[3] = 0, e[4] = t - l, e[5] = 1 - s - n, e[6] = u + C, e[7] = 0, e[8] = m + g, e[9] = u - C, e[10] = 1 - s - a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
var T = dA;
function vA() {
  var e = new U(3);
  return U != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e;
}
function UA(e) {
  var A = e[0], r = e[1], c = e[2];
  return Math.hypot(A, r, c);
}
function _(e, A, r) {
  var c = new U(3);
  return c[0] = e, c[1] = A, c[2] = r, c;
}
function ZA(e, A) {
  var r = A[0], c = A[1], h = A[2], d = r * r + c * c + h * h;
  return d > 0 && (d = 1 / Math.sqrt(d)), e[0] = A[0] * d, e[1] = A[1] * d, e[2] = A[2] * d, e;
}
function xA(e, A) {
  return e[0] * A[0] + e[1] * A[1] + e[2] * A[2];
}
function AA(e, A, r) {
  var c = A[0], h = A[1], d = A[2], f = r[0], o = r[1], I = r[2];
  return e[0] = h * I - d * o, e[1] = d * f - c * I, e[2] = c * o - h * f, e;
}
var OA = UA;
(function() {
  var e = vA();
  return function(A, r, c, h, d, f) {
    var o, I;
    for (r || (r = 3), c || (c = 0), h ? I = Math.min(h * r + c, A.length) : I = A.length, o = c; o < I; o += r)
      e[0] = A[o], e[1] = A[o + 1], e[2] = A[o + 2], d(e, e, f), A[o] = e[0], A[o + 1] = e[1], A[o + 2] = e[2];
    return A;
  };
})();
function GA() {
  var e = new U(4);
  return U != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0), e;
}
function mA(e, A, r, c) {
  var h = new U(4);
  return h[0] = e, h[1] = A, h[2] = r, h[3] = c, h;
}
function PA(e, A) {
  var r = A[0], c = A[1], h = A[2], d = A[3], f = r * r + c * c + h * h + d * d;
  return f > 0 && (f = 1 / Math.sqrt(f)), e[0] = r * f, e[1] = c * f, e[2] = h * f, e[3] = d * f, e;
}
function JA(e, A, r) {
  var c = A[0], h = A[1], d = A[2], f = r[0], o = r[1], I = r[2], s = r[3], t = s * c + o * d - I * h, a = s * h + I * c - f * d, m = s * d + f * h - o * c, u = -f * c - o * h - I * d;
  return e[0] = t * s + u * -f + a * -I - m * -o, e[1] = a * s + u * -o + m * -f - t * -I, e[2] = m * s + u * -I + t * -o - a * -f, e[3] = A[3], e;
}
(function() {
  var e = GA();
  return function(A, r, c, h, d, f) {
    var o, I;
    for (r || (r = 4), c || (c = 0), h ? I = Math.min(h * r + c, A.length) : I = A.length, o = c; o < I; o += r)
      e[0] = A[o], e[1] = A[o + 1], e[2] = A[o + 2], e[3] = A[o + 3], d(e, e, f), A[o] = e[0], A[o + 1] = e[1], A[o + 2] = e[2], A[o + 3] = e[3];
    return A;
  };
})();
function hA() {
  var e = new U(4);
  return U != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e[3] = 1, e;
}
function HA(e, A, r) {
  r = r * 0.5;
  var c = Math.sin(r);
  return e[0] = c * A[0], e[1] = c * A[1], e[2] = c * A[2], e[3] = Math.cos(r), e;
}
function eA(e, A, r, c) {
  var h = A[0], d = A[1], f = A[2], o = A[3], I = r[0], s = r[1], t = r[2], a = r[3], m, u, n, C, g;
  return u = h * I + d * s + f * t + o * a, u < 0 && (u = -u, I = -I, s = -s, t = -t, a = -a), 1 - u > XA ? (m = Math.acos(u), n = Math.sin(m), C = Math.sin((1 - c) * m) / n, g = Math.sin(c * m) / n) : (C = 1 - c, g = c), e[0] = C * h + g * I, e[1] = C * d + g * s, e[2] = C * f + g * t, e[3] = C * o + g * a, e;
}
function jA(e, A) {
  var r = A[0] + A[4] + A[8], c;
  if (r > 0)
    c = Math.sqrt(r + 1), e[3] = 0.5 * c, c = 0.5 / c, e[0] = (A[5] - A[7]) * c, e[1] = (A[6] - A[2]) * c, e[2] = (A[1] - A[3]) * c;
  else {
    var h = 0;
    A[4] > A[0] && (h = 1), A[8] > A[h * 3 + h] && (h = 2);
    var d = (h + 1) % 3, f = (h + 2) % 3;
    c = Math.sqrt(A[h * 3 + h] - A[d * 3 + d] - A[f * 3 + f] + 1), e[h] = 0.5 * c, c = 0.5 / c, e[3] = (A[d * 3 + f] - A[f * 3 + d]) * c, e[d] = (A[d * 3 + h] + A[h * 3 + d]) * c, e[f] = (A[f * 3 + h] + A[h * 3 + f]) * c;
  }
  return e;
}
var tA = mA, gA = PA;
(function() {
  var e = vA(), A = _(1, 0, 0), r = _(0, 1, 0);
  return function(c, h, d) {
    var f = xA(h, d);
    return f < -0.999999 ? (AA(e, A, h), OA(e) < 1e-6 && AA(e, r, h), ZA(e, e), HA(c, e, Math.PI), c) : f > 0.999999 ? (c[0] = 0, c[1] = 0, c[2] = 0, c[3] = 1, c) : (AA(e, h, d), c[0] = e[0], c[1] = e[1], c[2] = e[2], c[3] = 1 + f, gA(c, c));
  };
})();
(function() {
  var e = hA(), A = hA();
  return function(r, c, h, d, f, o) {
    return eA(e, c, f, o), eA(A, h, d, o), eA(r, e, A, 2 * o * (1 - o)), r;
  };
})();
(function() {
  var e = zA();
  return function(A, r, c, h) {
    return e[0] = c[0], e[3] = c[1], e[6] = c[2], e[1] = h[0], e[4] = h[1], e[7] = h[2], e[2] = -r[0], e[5] = -r[1], e[8] = -r[2], gA(A, jA(A, e));
  };
})();
function NA(e, A) {
  let r = Math.min(e.width / A.width, e.height / A.height), c = (e.width - A.width * r) / 2, h = (e.height - A.height * r) / 2;
  e.getContext("2d").drawImage(
    A,
    0,
    0,
    A.width,
    A.height,
    c,
    h,
    A.width * r,
    A.height * r
  );
}
function qA(e, A, r, c, h) {
  const d = J(), f = q(
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
  ), o = q(
    r[0],
    r[3],
    r[6],
    0,
    r[1],
    r[4],
    r[7],
    0,
    r[2],
    r[5],
    r[8],
    0,
    0,
    0,
    0,
    1
  );
  T(d, o, f);
  const I = q(
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
    c[0],
    c[1],
    c[2],
    1
  );
  T(d, I, d), T(d, h, d);
  const s = A[0], t = q(
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
    1 / s,
    0,
    0,
    0,
    0
  );
  T(d, t, d);
  const a = q(
    e,
    0,
    0,
    0,
    0,
    e,
    0,
    0,
    0,
    0,
    e,
    0,
    A[2] * e,
    A[5] * e,
    0,
    1
  );
  return T(d, a, d), d;
}
const TA = {
  constraints: {
    audio: !1,
    video: { facingMode: "environment" }
  }
};
class LA {
  constructor(A, r) {
    this.session = A, this.options = { ...TA, options: r }, this.paused = !1, this.mediaStream = null, this.track = null, this.camera = null, this.videoElement = document.createElement("video"), this.imageCapture = null, this.feedStatus = {
      error: null,
      available: [],
      selected: null
    };
  }
  async init() {
    (!navigator.mediaDevices || !ImageCapture) && (this.feedStatus = {
      error: "mediaDevices and/or ImageCapture API not supported!",
      available: [],
      selected: null
    });
  }
  loadCamera() {
    let A = window.localStorage.getItem(`vuexr/${this.session.name}/camera`);
    return A ? (A = JSON.parse(A), A) : null;
  }
  storeCamera() {
    return this.feedStatus.selected ? (window.localStorage.setItem(`vuexr/${this.session.name}/camera`, JSON.stringify(this.feedStatus.selected)), !0) : !1;
  }
  stop() {
    this.mediaStream && (window.cancelAnimationFrame(this.animationFrameRequest), this.track.stop(), this.track = null, this.mediaStream = null, this.imageCapture = null);
  }
  async selectCamera(A) {
    this.feedStatus.selected !== A && (this.stop(), this.feedStatus.selected = A, this.storeCamera(), this.session.calibration.resetCalibrationPoints(), await this.run(), this.session.eventCallback({ name: "statusChanged" }));
  }
  async listAvailable() {
    return navigator.mediaDevices && ImageCapture ? (await navigator.mediaDevices.enumerateDevices()).filter((r) => r.kind === "videoinput") : [];
  }
  async run() {
    try {
      this.feedStatus.selected ? this.mediaStream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: this.feedStatus.selected } }) : this.mediaStream = await navigator.mediaDevices.getUserMedia(this.options.constraints), this.track = this.mediaStream.getVideoTracks()[0], this.feedStatus.selected = this.track.getSettings().deviceId, this.storeCamera();
      const A = await this.listAvailable(), r = this.loadCamera();
      this.feedStatus = {
        error: null,
        available: A,
        selected: r
      }, this.session.calibration.loadCameraCalibration(), this.session.eventCallback({ name: "statusChanged" }), this.imageCapture = new ImageCapture(this.track), this.videoElement.srcObject = this.mediaStream, await new Promise((c, h) => {
        this.videoElement.onloadedmetadata = (d) => {
          this.videoElement.play(), this.session.canvas.width = this.videoElement.videoWidth, this.session.canvas.height = this.videoElement.videoHeight, this.loop(), c();
        };
      });
    } catch (A) {
      console.log(A);
    }
  }
  async loop() {
    if (this.imageCapture)
      try {
        const A = await this.imageCapture.grabFrame();
        NA(this.session.canvas, A), this.session.process();
      } catch (A) {
        console.log(A);
      } finally {
        this.paused || (this.animationFrameRequest = window.requestAnimationFrame(() => {
          this.loop();
        }));
      }
  }
}
class YA {
  constructor(A) {
    this.session = A, this.elements = {}, this.views = [];
  }
  registerView(A, r) {
    this.views.push({ component: A, callback: r });
  }
  unregisterView(A) {
    this.views = this.views.filter((r) => r.component !== A);
  }
  registerElement(A, r, c, h) {
    this.elements[A] = {
      id: A,
      element: r,
      markerSize: c,
      callback: h,
      lastTransform: null,
      lastRVec: null,
      lastTVec: null,
      lastRMat: null,
      tracked: !1
    };
  }
  unregisterElement(A) {
    delete this.elements[A];
  }
  setMarkers(A) {
    for (const h of A)
      this.elements[h.id] && (!this.session.motion.motionStatus.acceleration.error && !this.session.motion.motionStatus.gyro.error ? this.elements[h.id].lastTransform = this.session.motion.getCurrentTransform() : this.elements[h.id].lastTransform = J(), this.elements[h.id].lastRVec = h.rvec, this.elements[h.id].lastTVec = h.tvec, this.elements[h.id].lastRMat = h.rmat, this.elements[h.id].tracked || (this.elements[h.id].tracked = !0, this.elements[h.id].callback(!0)));
    const r = A.map((h) => h.id.toString()), c = Object.keys(this.elements).filter((h) => !r.includes(h));
    for (const h of c)
      this.elements[h].tracked && (this.elements[h].tracked = !1, this.elements[h].callback(!1));
    (this.session.motion.motionStatus.acceleration.error || this.session.motion.motionStatus.gyro.error) && this.readjustElements(), this.trackedMarkers = r, this.views.forEach((h) => h.callback(this.trackedMarkers));
  }
  readjustElements() {
    const r = getComputedStyle(this.session.canvas).width.split("px")[0] / this.session.canvas.width, c = Object.keys(this.elements).map((h) => this.elements[h]);
    for (const h of c)
      if (h.lastTransform) {
        const d = this.session.motion.getOffsetMatrix(h.lastTransform), f = qA(r, this.session.calibration.cameraMatrix, h.lastRMat, h.lastTVec, d);
        this.projectElement(h.id, Array.from(f));
      }
  }
  projectElement(A, r) {
    r = r.map((c) => c.toFixed(5)), this.elements[A].element.style.transform = `matrix3d(${r.join(",")})`;
  }
}
function W(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var H = {}, WA = {
  get exports() {
    return H;
  },
  set exports(e) {
    H = e;
  }
};
/**
 * @name    fili
 * @version 2.0.3 | December 13th 2018
 * @author  Florian Markert
 * @license MIT
 */
(function(e, A) {
  (function(r) {
    e.exports = r();
  })(function() {
    return function r(c, h, d) {
      function f(s, t) {
        if (!h[s]) {
          if (!c[s]) {
            var a = typeof W == "function" && W;
            if (!t && a)
              return a(s, !0);
            if (o)
              return o(s, !0);
            var m = new Error("Cannot find module '" + s + "'");
            throw m.code = "MODULE_NOT_FOUND", m;
          }
          var u = h[s] = { exports: {} };
          c[s][0].call(u.exports, function(n) {
            var C = c[s][1][n];
            return f(C || n);
          }, u, u.exports, r, c, h, d);
        }
        return h[s].exports;
      }
      for (var o = typeof W == "function" && W, I = 0; I < d.length; I++)
        f(d[I]);
      return f;
    }({ 1: [function(r, c, h) {
      c.exports = { CalcCascades: r("./src/calcCascades"), Fft: r("./src/fft"), FirCoeffs: r("./src/firCoeffs"), FirFilter: r("./src/firFilter"), IirCoeffs: r("./src/iirCoeffs"), IirFilter: r("./src/iirFilter"), TestFilter: r("./src/testFilter") };
    }, { "./src/calcCascades": 2, "./src/fft": 3, "./src/firCoeffs": 4, "./src/firFilter": 5, "./src/iirCoeffs": 6, "./src/iirFilter": 7, "./src/testFilter": 8 }], 2: [function(r, c, h) {
      var d = r("./iirCoeffs"), f = new d(), o = { bessel: { q: [[0.57735026919], [0.805538281842, 0.521934581669], [1.02331395383, 0.611194546878, 0.510317824749], [1.22566942541, 0.710852074442, 0.559609164796, 0.505991069397], [1.41530886916, 0.809790964842, 0.620470155556, 0.537552151325, 0.503912727276], [1.59465693507, 0.905947107025, 0.684008068137, 0.579367238641, 0.525936202016, 0.502755558204], [1.76552743493, 0.998998442993, 0.747625068271, 0.624777082395, 0.556680772868, 0.519027293158, 0.502045428643], [1.9292718407, 1.08906376917, 0.810410302962, 0.671382379377, 0.591144659703, 0.542678365981, 0.514570953471, 0.501578400482], [2.08691792612, 1.17637337045, 0.872034231424, 0.718163551101, 0.627261751983, 0.569890924765, 0.533371782078, 0.511523796759, 0.50125489338], [2.23926560629, 1.26117120993, 0.932397288146, 0.764647810579, 0.664052481472, 0.598921924986, 0.555480327396, 0.526848630061, 0.509345928377, 0.501021580965], [2.38695091667, 1.34368488961, 0.991497755204, 0.81060830488, 0.701011199665, 0.628878390935, 0.57943181849, 0.545207253735, 0.52208637596, 0.507736060535, 0.500847111042], [2.53048919562, 1.42411783481, 1.04937620183, 0.85593899901, 0.737862159044, 0.659265671705, 0.604435823473, 0.565352679646, 0.537608804383, 0.51849505465, 0.506508536474, 0.500715908905]], f3dB: [[1.27201964951], [1.60335751622, 1.43017155999], [1.9047076123, 1.68916826762, 1.60391912877], [2.18872623053, 1.95319575902, 1.8320926012, 1.77846591177], [2.45062684305, 2.20375262593, 2.06220731793, 1.98055310881, 1.94270419166], [2.69298925084, 2.43912611431, 2.28431825401, 2.18496722634, 2.12472538477, 2.09613322542], [2.91905714471, 2.66069088948, 2.49663434571, 2.38497976939, 2.30961462222, 2.26265746534, 2.24005716132], [3.13149167404, 2.87016099416, 2.69935018044, 2.57862945683, 2.49225505119, 2.43227707449, 2.39427710712, 2.37582307687], [3.33237300564, 3.06908580184, 2.89318259511, 2.76551588399, 2.67073340527, 2.60094950474, 2.55161764546, 2.52001358804, 2.50457164552], [3.52333123464, 3.25877569704, 3.07894353744, 2.94580435024, 2.84438325189, 2.76691082498, 2.70881411245, 2.66724655259, 2.64040228249, 2.62723439989], [3.70566068548, 3.44032173223, 3.2574059854, 3.11986367838, 3.01307175388, 2.92939234605, 2.86428726094, 2.81483068055, 2.77915465405, 2.75596888377, 2.74456638588], [3.88040469682, 3.61463243697, 3.4292654707, 3.28812274966, 3.17689762788, 3.08812364257, 3.01720732972, 2.96140104561, 2.91862858495, 2.88729479473, 2.8674198668, 2.8570800015]], f1dB: [[2.16477559371], [2.70320928596, 2.41122332505], [3.25676581436, 2.88822569572, 2.74246238837], [3.76153580353, 3.35675411406, 3.14862673032, 3.05646412475], [4.22174260104, 3.79644757806, 3.55260471864, 3.41193742197, 3.34673435508], [4.64584812552, 4.20789257981, 3.94082363122, 3.76942681446, 3.66549975744, 3.61617359345], [5.04060395196, 4.5944592201, 4.3111677248, 4.11836351827, 3.98822359814, 3.90713836715, 3.86811234525], [5.41107948467, 4.95951159709, 4.66435804468, 4.45575796102, 4.30650679478, 4.20286750045, 4.13720522991, 4.10531748119], [5.76110791853, 5.30592898465, 5.00182215701, 4.7811081045, 4.61724509926, 4.49660100894, 4.41131378918, 4.35667671372, 4.32997951075], [6.09364309488, 5.63609116014, 5.32506930789, 5.09480346139, 4.91939504255, 4.78540258409, 4.68493280536, 4.61302286993, 4.56661931366, 4.54382759952], [6.41100731543, 5.95195558182, 5.63550073656, 5.39754464742, 5.21278891332, 5.06801430334, 4.95539684456, 4.8697869429, 4.80814951843, 4.76793469612, 4.74828032403], [6.71506056052, 6.25514029778, 5.9343616072, 5.69011422355, 5.49763642361, 5.34401973764, 5.22125973611, 5.12485045619, 5.05037962112, 4.99699982231, 4.96155789635, 4.94441828777]] } }, I = { bessel: { as: [[1.3617], [1.3397, 0.7743], [1.2217, 0.9686, 0.5131], [1.1112, 0.9754, 0.7202, 0.3728], [1.0215, 0.9393, 0.7815, 0.5604, 0.2883]], bs: [[0.618], [0.4889, 0.389], [0.3887, 0.3505, 0.2756], [0.3162, 0.2979, 0.2621, 0.2087], [0.265, 0.2549, 0.2351, 0.2059, 0.1665]] }, butterworth: { as: [[1.4142], [1.8478, 0.7654], [1.9319, 1.4142, 0.5176], [1.9616, 1.6629, 1.1111, 0.3902], [1.9754, 1.782, 1.4142, 0.908, 0.3129]], bs: [[1], [1, 1], [1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1, 1]] }, tschebyscheff05: { as: [[1.3614], [2.6282, 0.3648], [3.8645, 0.7528, 0.1589], [5.1117, 1.0639, 0.3439, 0.0885], [6.3648, 1.3582, 0.4822, 0.1994, 0.0563]], bs: [[1.3827], [3.4341, 1.1509], [6.9797, 1.8573, 1.0711], [11.9607, 2.9365, 1.4206, 1.0407], [18.3695, 4.3453, 1.944, 1.252, 1.0263]] }, tschebyscheff1: { as: [[1.3022], [2.5904, 0.3039], [3.8437, 0.6292, 0.1296], [5.1019, 0.8916, 0.2806, 0.0717], [6.3634, 1.1399, 0.3939, 0.1616, 0.0455]], bs: [[1.5515], [4.1301, 1.1697], [8.5529, 1.9124, 1.0766], [14.7608, 3.0426, 1.4334, 1.0432], [22.7468, 4.5167, 1.9665, 1.2569, 1.0277]] }, tschebyscheff2: { as: [[1.1813], [2.4025, 0.2374], [3.588, 0.4925, 0.0995], [4.7743, 0.6991, 0.2153, 0.0547], [5.9618, 0.8947, 0.3023, 0.1233, 0.0347]], bs: [[1.7775], [4.9862, 1.1896], [10.4648, 1.9622, 1.0826], [18.151, 3.1353, 1.4449, 1.0461], [28.0376, 4.6644, 1.9858, 1.2614, 1.0294]] }, tschebyscheff3: { as: [[1.065], [2.1853, 0.1964], [3.2721, 0.4077, 0.0815], [4.3583, 0.5791, 0.1765, 0.0448], [5.4449, 0.7414, 0.2479, 0.1008, 0.0283]], bs: [[1.9305], [5.5339, 1.2009], [11.6773, 1.9873, 1.0861], [20.2948, 3.1808, 1.4507, 1.0478], [31.3788, 4.7363, 1.9952, 1.2638, 1.0304]] }, allpass: { as: [[1.6278], [2.337, 1.3506], [2.6117, 2.0706, 1.0967], [2.7541, 2.4174, 1.785, 0.9239], [2.8406, 2.612, 2.1733, 1.5583, 0.8018]], bs: [[0.8832], [1.4878, 1.1837], [1.7763, 1.6015, 1.2596], [1.942, 1.83, 1.6101, 1.2822], [2.049, 1.9714, 1.8184, 1.5923, 1.2877]] } }, s = function(u, n) {
        var C = [], g = 0;
        if (n !== "fromPZ")
          for (u.order > 12 && (u.order = 12), g = 0; g < u.order; g++) {
            var l, V, F;
            u.transform === "matchedZ" ? C.push(f.lowpassMZ({ Fs: u.Fs, Fc: u.Fc, preGain: u.preGain, as: I[u.characteristic].as[u.order - 1][g], bs: I[u.characteristic].bs[u.order - 1][g] })) : (u.characteristic === "butterworth" ? (l = 0.5 / Math.sin(Math.PI / (2 * u.order) * (g + 0.5)), V = 1) : (l = o[u.characteristic].q[u.order - 1][g], V = u.oneDb ? o[u.characteristic].f1dB[u.order - 1][g] : o[u.characteristic].f3dB[u.order - 1][g]), F = n === "highpass" ? u.Fc / V : u.Fc * V, n !== "bandpass" && n !== "bandstop" || u.characteristic === "bessel" && (F = Math.sqrt(u.order) * F / u.order), C.push(f[n]({ Fs: u.Fs, Fc: F, Q: l, BW: u.BW || 0, gain: u.gain || 0, preGain: u.preGain || !1 })));
          }
        else
          for (g = 0; g < u.length; g++)
            C.push(f[n](u[g]));
        return C;
      }, t = function(u) {
        return function(n) {
          return s(n, u);
        };
      }, a = {}, m = function() {
        var u = [];
        for (var n in f)
          a[n] = t(n), u.push(n);
        return a.available = function() {
          return u;
        }, a;
      };
      c.exports = m;
    }, { "./iirCoeffs": 6 }], 3: [function(r, c, h) {
      var d = function(f) {
        if (!function(p) {
          return !(p & p - 1);
        }(f))
          return !1;
        var o = {};
        o.length = f, o.buffer = new Float64Array(f), o.re = new Float64Array(f), o.im = new Float64Array(f), o.reI = new Float64Array(f), o.imI = new Float64Array(f), o.twiddle = new Int32Array(f), o.sinTable = new Float64Array(f - 1), o.cosTable = new Float64Array(f - 1);
        var I = 2 * Math.PI, s = Math.floor(Math.log(f) / Math.LN2);
        for (a = o.sinTable.length; a--; )
          o.sinTable[a] = Math.sin(I * (a / f)), o.cosTable[a] = Math.cos(I * (a / f));
        for (var t = f >> 1, a = 0, m = 0; o.twiddle[a] = m, !(++a >= f); ) {
          for (s = t; s <= m; )
            m -= s, s >>= 1;
          m += s;
        }
        var u = Math.PI, n = 2 * Math.PI, C = Math.abs, g = Math.pow, l = Math.cos, V = Math.sin, F = function(p) {
          return V(u * p) / (u * p);
        }, B = Math.E, Q = { rectangular: { calc: function() {
          return 1;
        }, values: [], correction: 1 }, none: { calc: function() {
          return 1;
        }, values: [], correction: 1 }, hanning: { calc: function(p, v) {
          return 0.5 * (1 - l(n * p / (v - 1)));
        }, values: [], correction: 2 }, hamming: { calc: function(p, v) {
          return 0.54 - 0.46 * l(n * p / (v - 1));
        }, values: [], correction: 1.8518999946875638 }, tukery: { calc: function(p, v, i) {
          return p < i * (v - 1) / 2 ? 0.5 * (1 + l(u * (2 * p / (i * (v - 1)) - 1))) : (v - 1) * (1 - i / 2) < p ? 0.5 * (1 + l(u * (2 * p / (i * (v - 1)) - 2 / i + 1))) : 1;
        }, values: [], correction: 4 / 3 }, cosine: { calc: function(p, v) {
          return V(u * p / (v - 1));
        }, values: [], correction: 1.570844266360796 }, lanczos: { calc: function(p, v) {
          return F(2 * p / (v - 1) - 1);
        }, values: [], correction: 1.6964337576195783 }, triangular: { calc: function(p, v) {
          return 2 / (v + 1) * ((v + 1) / 2 - C(p - (v - 1) / 2));
        }, values: [], correction: 2 }, bartlett: { calc: function(p, v) {
          return 2 / (v - 1) * ((v - 1) / 2 - C(p - (v - 1) / 2));
        }, values: [], correction: 2 }, gaussian: { calc: function(p, v, i) {
          return g(B, -0.5 * g((p - (v - 1) / 2) / (i * (v - 1) / 2), 2));
        }, values: [], correction: 5 / 3 }, bartlettHanning: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.62 - 0.48 * C(p / (v - 1) - 0.5) - 0.38 * l(i);
        }, values: [], correction: 2 }, blackman: { calc: function(p, v, i) {
          var R = (1 - i) / 2, w = i / 2, b = n * p / (v - 1);
          return R - 0.5 * l(b) + w * l(2 * b);
        }, values: [], correction: 4 / 3 }, blackmanHarris: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.35875 - 0.48829 * l(i) + 0.14128 * l(2 * i) - 0.01168 * l(3 * i);
        }, values: [], correction: 1.5594508635 }, nuttall3: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.375 - 0.5 * l(i) + 0.125 * l(2 * i);
        }, values: [], correction: 1.56 }, nuttall3a: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.40897 - 0.5 * l(i) + 0.09103 * l(2 * i);
        }, values: [], correction: 1.692 }, nuttall3b: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.4243801 - 0.4973406 * l(i) + 0.078793 * l(2 * i);
        }, values: [], correction: 1.7372527 }, nuttall4: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.3125 - 0.46875 * l(i) + 0.1875 * l(2 * i) - 0.03125 * l(3 * i);
        }, values: [], correction: 1.454543 }, nuttall4a: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.338946 - 0.481973 * l(i) + 0.161054 * l(2 * i) - 0.018027 * l(3 * i);
        }, values: [], correction: 1.512732763 }, nuttall4b: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.355768 - 0.481973 * l(i) + 0.144232 * l(2 * i) - 0.012604 * l(3 * i);
        }, values: [], correction: 1.55223262 }, nuttall4c: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.3635819 - 0.4891775 * l(i) + 0.1365995 * l(2 * i) - 0.0106411 * l(3 * i);
        }, values: [], correction: 1.57129067 }, sft3f: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.26526 - 0.5 * l(i) + 0.23474 * l(2 * i);
        }, values: [], correction: 1.3610238 }, sft4f: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.21706 - 0.42103 * l(i) + 0.28294 * l(2 * i) - 0.07897 * l(3 * i);
        }, values: [], correction: 1.2773573 }, sft5f: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.1881 - 0.36923 * l(i) + 0.28702 * l(2 * i) - 0.13077 * l(3 * i) + 0.02488 * l(4 * i);
        }, values: [], correction: 1.23167769 }, sft3m: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.28235 - 0.52105 * l(i) + 0.19659 * l(2 * i);
        }, values: [], correction: 1.39343451 }, sft4m: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.241906 - 0.460841 * l(i) + 0.2552381 * l(2 * i) - 0.041872 * l(3 * i);
        }, values: [], correction: 1.3190596 }, sft5m: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.209671 - 0.407331 * l(i) + 0.281225 * l(2 * i) - 0.092669 * l(3 * i) + 91036e-7 * l(4 * i);
        }, values: [], correction: 1.26529456464 }, nift: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return 0.2810639 - 0.5208972 * l(i) + 0.1980399 * l(2 * i);
        }, values: [], correction: 1.39094182 }, hpft: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return (1 - 1.912510941 * l(i) + 1.079173272 * l(2 * i) - 0.1832630879 * l(3 * i)) / v;
        }, values: [], correction: 1 }, srft: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return (1 - 1.93 * l(i) + 1.29 * l(2 * i) - 0.388 * l(3 * i) + 0.028 * l(4 * i)) / v;
        }, values: [], correction: 1 }, hft70: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return (1 - 1.90796 * l(i) + 1.07349 * l(2 * i) - 0.18199 * l(3 * i)) / v;
        }, values: [], correction: 1 }, hft95: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return (1 - 1.9383379 * l(i) + 1.3045202 * l(2 * i) - 0.402827 * l(3 * i) + 0.0350665 * l(4 * i)) / v;
        }, values: [], correction: 1 }, hft90d: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return (1 - 1.942604 * l(i) + 1.340318 * l(2 * i) - 0.440811 * l(3 * i) + 0.043097 * l(4 * i)) / v;
        }, values: [], correction: 1 }, hft116d: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return (1 - 1.9575375 * l(i) + 1.4780705 * l(2 * i) - 0.6367431 * l(3 * i) + 0.1228389 * l(4 * i) - 66288e-7 * l(5 * i)) / v;
        }, values: [], correction: 1 }, hft144d: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return (1 - 1.96760033 * l(i) + 1.57983607 * l(2 * i) - 0.81123644 * l(3 * i) + 0.22583558 * l(4 * i) - 0.02773848 * l(5 * i) + 9036e-7 * l(6 * i)) / v;
        }, values: [], correction: 1 }, hft196d: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return (1 - 1.97441842 * l(i) + 1.65409888 * l(2 * i) - 0.95788186 * l(3 * i) + 0.3367342 * l(4 * i) - 0.06364621 * l(5 * i) + 521942e-8 * l(6 * i) - 10599e-8 * l(7 * i)) / v;
        }, values: [], correction: 1 }, hft223d: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return (1 - 1.98298997309 * l(i) + 1.75556083063 * l(2 * i) - 1.19037717712 * l(3 * i) + 0.56155440797 * l(4 * i) - 0.17296769663 * l(5 * i) + 0.03233247087 * l(6 * i) - 0.00324954578 * l(7 * i) + 1380104e-10 * l(8 * i) - 132725e-11 * l(9 * i)) / v;
        }, values: [], correction: 1 }, hft248d: { calc: function(p, v) {
          var i = n * p / (v - 1);
          return (1 - 1.985844164102 * l(i) + 1.791176438506 * l(2 * i) - 1.282075284005 * l(3 * i) + 0.667777530266 * l(4 * i) - 0.240160796576 * l(5 * i) + 0.056656381764 * l(6 * i) - 0.008134974479 * l(7 * i) + 62454465e-11 * l(8 * i) - 19808998e-12 * l(9 * i) + 132974e-12 * l(10 * i)) / v;
        }, values: [], correction: 1 } }, M = function(p) {
          return Q[p.name].values.length !== p.N ? (p.n === 0 && (Q[p.name].values.length = 0), Q[p.name].values[p.n] = Q[p.name].correction * Q[p.name].calc(p.n, p.N, p.a), Q[p.name].values[p.n]) : Q[p.name].values;
        };
        return { forward: function(p, v) {
          var i, R, w, b, k, y, S, K, Z, z, x, P;
          w = o.buffer.length;
          var $ = { name: v, N: w, a: 0.5, n: 0 }, rA = M($);
          if (typeof rA == "number")
            for (i = 0; i < w; ++i)
              $.n = i, o.buffer[i] = p[i] * M($);
          else
            for (i = 0; i < w; ++i)
              o.buffer[i] = p[i] * rA[i];
          for (i = w; i--; )
            o.re[i] = o.buffer[o.twiddle[i]], o.im[i] = 0;
          for (b = 1; b < w; b = k)
            for (y = 0, k = b + b, S = w / k, R = 0; R < b; R++) {
              for (K = o.cosTable[y], Z = o.sinTable[y], i = R; i < w; i += k)
                z = i + b, x = Z * o.im[z] + K * o.re[z], P = K * o.im[z] - Z * o.re[z], o.re[z] = o.re[i] - x, o.re[i] += x, o.im[z] = o.im[i] - P, o.im[i] += P;
              y += S;
            }
          return { re: o.re, im: o.im };
        }, inverse: function(p, v) {
          var i, R, w, b, k, y, S, K, Z, z, x, P;
          for (w = p.length, i = w; i--; )
            R = o.twiddle[i], o.reI[i] = p[R], o.imI[i] = -v[R];
          for (b = 1; b < w; b = k)
            for (y = 0, k = b + b, S = w / k, R = 0; R < b; R++) {
              for (K = o.cosTable[y], Z = o.sinTable[y], i = R; i < w; i += k)
                z = i + b, x = Z * o.imI[z] + K * o.reI[z], P = K * o.imI[z] - Z * o.reI[z], o.reI[z] = o.reI[i] - x, o.reI[i] += x, o.imI[z] = o.imI[i] - P, o.imI[i] += P;
              y += S;
            }
          for (i = w; i--; )
            o.buffer[i] = o.reI[i] / w;
          return o.buffer;
        }, magnitude: function(p) {
          for (var v = [], i = 0; i < p.re.length; i++)
            v.push(Math.sqrt(p.re[i] * p.re[i] + p.im[i] * p.im[i]));
          return v;
        }, magToDb: function(p) {
          for (var v = [], i = 0; i < p.length; i++)
            v.push(20 * Math.log(p[i]) * Math.LOG10E);
          return v;
        }, phase: function(p) {
          for (var v = [], i = 0; i < p.re.length; i++)
            v.push(Math.atan2(p.im[i], p.re[i]));
          return v;
        }, windows: function() {
          var p = [];
          for (var v in Q)
            p.push(v);
          return p;
        } };
      };
      c.exports = d;
    }, {}], 4: [function(r, c, h) {
      var d = function() {
        var f = function(t) {
          var a = t.Fs, m = t.Fa, u = t.Fb, n = t.order || 51, C = t.Att || 100, g = function(p) {
            for (var v = 0, i = 1, R = 1; i > 1e-6 * R; )
              v += 2, i *= p * p / (v * v), R += i;
            return R;
          };
          n / 2 - Math.floor(n / 2) == 0 && n++;
          var l, V = (n - 1) / 2, F = [], B = 0, Q = 0, M = [];
          for (F[0] = 2 * (u - m) / a, Q = 1; Q <= V; Q++)
            F[Q] = (Math.sin(2 * Q * Math.PI * u / a) - Math.sin(2 * Q * Math.PI * m / a)) / (Q * Math.PI);
          for (B = C < 21 ? 0 : C > 50 ? 0.1102 * (C - 8.7) : 0.5842 * Math.pow(C - 21, 0.4) + 0.07886 * (C - 21), l = g(B), Q = 0; Q <= V; Q++)
            M[V + Q] = F[Q] * g(B * Math.sqrt(1 - Q * Q / (V * V))) / l;
          for (Q = 0; Q < V; Q++)
            M[Q] = M[n - 1 - Q];
          return M;
        }, o = function(t) {
          var a = t.Fs, m = t.Fc, u = t.order, n = 2 * Math.PI * m / a, C = 0, g = 0, l = [];
          for (C = 0; C <= u; C++)
            C - u / 2 == 0 ? l[C] = n : (l[C] = Math.sin(n * (C - u / 2)) / (C - u / 2), l[C] *= 0.54 - 0.46 * Math.cos(2 * Math.PI * C / u)), g += l[C];
          for (C = 0; C <= u; C++)
            l[C] /= g;
          return l;
        }, I = function(t) {
          var a;
          for (a = 0; a < t.length; a++)
            t[a] = -t[a];
          return t[(t.length - 1) / 2]++, t;
        }, s = function(t) {
          for (var a = o({ order: t.order, Fs: t.Fs, Fc: t.F2 }), m = I(o({ order: t.order, Fs: t.Fs, Fc: t.F1 })), u = [], n = 0; n < a.length; n++)
            u.push(a[n] + m[n]);
          return u;
        };
        return { lowpass: function(t) {
          return o(t);
        }, highpass: function(t) {
          return I(o(t));
        }, bandstop: function(t) {
          return s(t);
        }, bandpass: function(t) {
          return I(s(t));
        }, kbFilter: function(t) {
          return f(t);
        }, available: function() {
          return ["lowpass", "highpass", "bandstop", "bandpass", "kbFilter"];
        } };
      };
      c.exports = d;
    }, {}], 5: [function(r, c, h) {
      var d = r("./utils"), f = d.runMultiFilter, o = d.runMultiFilterReverse, I = d.complex, s = d.evaluatePhase, t = function(a) {
        var m = a, u = [], n = 0;
        for (n = 0; n < m.length; n++)
          u[n] = { re: m[n], im: 0 };
        var C = function(B) {
          var Q, M = [];
          for (Q = 0; Q < B; Q++)
            M.push(0);
          return { buf: M, pointer: 0 };
        }, g = C(m.length - 1), l = function(B, Q) {
          Q.buf[Q.pointer] = B;
          var M = 0;
          for (n = 0; n < Q.buf.length; n++)
            M += m[n] * Q.buf[(Q.pointer + n) % Q.buf.length];
          return Q.pointer = (Q.pointer + 1) % Q.buf.length, M;
        }, V = function(B) {
          var Q = C(m.length - 1);
          return f(B, Q, l);
        }, F = function(B) {
          for (var Q = B.Fs, M = B.Fr, p = -Math.PI * (M / Q) * 2, v = { re: 0, im: 0 }, i = 0; i < m.length - 1; i++)
            v = I.add(v, I.mul(u[i], { re: Math.cos(p * i), im: Math.sin(p * i) }));
          var R = I.magnitude(v);
          return { magnitude: R, phase: I.phase(v), dBmagnitude: 20 * Math.log(R) * Math.LOG10E };
        };
        return { responsePoint: function(B) {
          return F(B);
        }, response: function(B) {
          B = B || 100;
          var Q = [], M = 0, p = 2 * B;
          for (M = 0; M < B; M++)
            Q[M] = F({ Fs: p, Fr: M });
          return s(Q), Q;
        }, simulate: function(B) {
          return V(B);
        }, singleStep: function(B) {
          return l(B, g);
        }, multiStep: function(B, Q) {
          return f(B, g, l, Q);
        }, filtfilt: function(B, Q) {
          return o(f(B, g, l, Q), g, l, !0);
        }, reinit: function() {
          g = C(m.length - 1);
        } };
      };
      c.exports = t;
    }, { "./utils": 9 }], 6: [function(r, c, h) {
      var d = function() {
        var f = function(s, t) {
          var a = s.Q, m = s.Fc, u = s.Fs, n = {}, C = 2 * Math.PI * m / u;
          return s.BW ? n.alpha = Math.sin(C) * Math.sinh(Math.log(2) / 2 * s.BW * C / Math.sin(C)) : n.alpha = Math.sin(C) / (2 * a), n.cw = Math.cos(C), n.a0 = 1 + n.alpha, t.a0 = n.a0, t.a.push(-2 * n.cw / n.a0), t.k = 1, t.a.push((1 - n.alpha) / n.a0), n;
        }, o = function(s) {
          var t = s.Q, a = s.Fc, m = s.Fs, u = {}, n = 2 * Math.PI * a / m;
          return u.alpha = Math.sin(n) / (2 * t), u.cw = Math.cos(n), u.A = Math.pow(10, s.gain / 40), u;
        }, I = function() {
          var s = {};
          return s.z = [0, 0], s.a = [], s.b = [], s;
        };
        return { fromPZ: function(s) {
          var t = I();
          return t.a0 = 1, t.b.push(1), t.b.push(-s.z0.re - s.z1.re), t.b.push(s.z0.re * s.z1.re - s.z0.im * s.z1.im), t.a.push(-s.p0.re - s.p1.re), t.a.push(s.p0.re * s.p1.re - s.p0.im * s.p1.im), s.type === "lowpass" ? t.k = (1 + t.a[0] + t.a[1]) / (1 + t.b[1] + t.b[2]) : t.k = (1 - t.a[0] + t.a[1]) / (1 - t.b[1] + t.b[2]), t;
        }, lowpassMZ: function(s) {
          var t = I();
          t.a0 = 1;
          var a = s.as, m = s.bs, u = 2 * Math.PI * s.Fc / s.Fs, n = -a / (2 * m);
          return t.a.push(2 * -Math.pow(Math.E, n * u) * Math.cos(-u * Math.sqrt(Math.abs(Math.pow(a, 2) / (4 * Math.pow(m, 2)) - 1 / m)))), t.a.push(Math.pow(Math.E, 2 * n * u)), s.preGain ? (t.b.push(1), t.k = t.a0 + t.a[0] + t.a[1]) : (t.b.push(t.a0 + t.a[0] + t.a[1]), t.k = 1), t.b.push(0), t.b.push(0), t;
        }, lowpassBT: function(s) {
          var t = I();
          return s.Q = 1, t.wp = Math.tan(2 * Math.PI * s.Fc / (2 * s.Fs)), t.wp2 = t.wp * t.wp, s.BW && delete s.BW, t.k = 1, t.a0 = 3 * t.wp + 3 * t.wp2 + 1, t.b.push(3 * t.wp2 * s.Q / t.a0), t.b.push(2 * t.b[0]), t.b.push(t.b[0]), t.a.push((6 * t.wp2 - 2) / t.a0), t.a.push((3 * t.wp2 - 3 * t.wp + 1) / t.a0), t;
        }, highpassBT: function(s) {
          var t = I();
          return s.Q = 1, t.wp = Math.tan(2 * Math.PI * s.Fc / (2 * s.Fs)), t.wp2 = t.wp * t.wp, s.BW && delete s.BW, t.k = 1, t.a0 = t.wp + t.wp2 + 3, t.b.push(3 * s.Q / t.a0), t.b.push(2 * t.b[0]), t.b.push(t.b[0]), t.a.push((2 * t.wp2 - 6) / t.a0), t.a.push((t.wp2 - t.wp + 3) / t.a0), t;
        }, lowpass: function(s) {
          var t = I();
          s.BW && delete s.BW;
          var a = f(s, t);
          return s.preGain ? (t.k = 0.5 * (1 - a.cw), t.b.push(1 / a.a0)) : (t.k = 1, t.b.push((1 - a.cw) / (2 * a.a0))), t.b.push(2 * t.b[0]), t.b.push(t.b[0]), t;
        }, highpass: function(s) {
          var t = I();
          s.BW && delete s.BW;
          var a = f(s, t);
          return s.preGain ? (t.k = 0.5 * (1 + a.cw), t.b.push(1 / a.a0)) : (t.k = 1, t.b.push((1 + a.cw) / (2 * a.a0))), t.b.push(-2 * t.b[0]), t.b.push(t.b[0]), t;
        }, allpass: function(s) {
          var t = I();
          s.BW && delete s.BW;
          var a = f(s, t);
          return t.k = 1, t.b.push((1 - a.alpha) / a.a0), t.b.push(-2 * a.cw / a.a0), t.b.push((1 + a.alpha) / a.a0), t;
        }, bandpassQ: function(s) {
          var t = I(), a = f(s, t);
          return t.k = 1, t.b.push(a.alpha * s.Q / a.a0), t.b.push(0), t.b.push(-t.b[0]), t;
        }, bandpass: function(s) {
          var t = I(), a = f(s, t);
          return t.k = 1, t.b.push(a.alpha / a.a0), t.b.push(0), t.b.push(-t.b[0]), t;
        }, bandstop: function(s) {
          var t = I(), a = f(s, t);
          return t.k = 1, t.b.push(1 / a.a0), t.b.push(-2 * a.cw / a.a0), t.b.push(t.b[0]), t;
        }, peak: function(s) {
          var t = I(), a = o(s);
          return t.k = 1, t.a0 = 1 + a.alpha / a.A, t.a.push(-2 * a.cw / t.a0), t.a.push((1 - a.alpha / a.A) / t.a0), t.b.push((1 + a.alpha * a.A) / t.a0), t.b.push(-2 * a.cw / t.a0), t.b.push((1 - a.alpha * a.A) / t.a0), t;
        }, lowshelf: function(s) {
          var t = I();
          s.BW && delete s.BW;
          var a = o(s);
          t.k = 1;
          var m = 2 * Math.sqrt(a.A) * a.alpha;
          return t.a0 = a.A + 1 + (a.A - 1) * a.cw + m, t.a.push(-2 * (a.A - 1 + (a.A + 1) * a.cw) / t.a0), t.a.push((a.A + 1 + (a.A - 1) * a.cw - m) / t.a0), t.b.push(a.A * (a.A + 1 - (a.A - 1) * a.cw + m) / t.a0), t.b.push(2 * a.A * (a.A - 1 - (a.A + 1) * a.cw) / t.a0), t.b.push(a.A * (a.A + 1 - (a.A - 1) * a.cw - m) / t.a0), t;
        }, highshelf: function(s) {
          var t = I();
          s.BW && delete s.BW;
          var a = o(s);
          t.k = 1;
          var m = 2 * Math.sqrt(a.A) * a.alpha;
          return t.a0 = a.A + 1 - (a.A - 1) * a.cw + m, t.a.push(2 * (a.A - 1 - (a.A + 1) * a.cw) / t.a0), t.a.push((a.A + 1 - (a.A - 1) * a.cw - m) / t.a0), t.b.push(a.A * (a.A + 1 + (a.A - 1) * a.cw + m) / t.a0), t.b.push(-2 * a.A * (a.A - 1 + (a.A + 1) * a.cw) / t.a0), t.b.push(a.A * (a.A + 1 + (a.A - 1) * a.cw - m) / t.a0), t;
        }, aweighting: function(s) {
          var t = I();
          t.k = 1;
          var a = 2 * Math.PI * s.Fc / s.Fs, m = 2 * Math.tan(a / 2), u = s.Q, n = Math.pow(m, 2);
          return t.a0 = 4 * u + n * u + 2 * m, t.a.push(2 * n * u - 8 * u), t.a.push(4 * u + n * u - 2 * m), t.b.push(n * u), t.b.push(2 * n * u), t.b.push(n * u), t;
        } };
      };
      c.exports = d;
    }, {}], 7: [function(r, c, h) {
      var d = r("./utils"), f = d.complex, o = d.runMultiFilter, I = d.runMultiFilterReverse, s = d.evaluatePhase, t = function(a) {
        for (var m = a, u = { re: 1, im: 0 }, n = [], C = [], g = 0; g < m.length; g++) {
          n[g] = {};
          var l = m[g];
          n[g].b0 = { re: l.b[0], im: 0 }, n[g].b1 = { re: l.b[1], im: 0 }, n[g].b2 = { re: l.b[2], im: 0 }, n[g].a1 = { re: l.a[0], im: 0 }, n[g].a2 = { re: l.a[1], im: 0 }, n[g].k = { re: l.k, im: 0 }, n[g].z = [0, 0], C[g] = {}, C[g].b1 = l.b[1] / l.b[0], C[g].b2 = l.b[2] / l.b[0], C[g].a1 = l.a[0], C[g].a2 = l.a[1];
        }
        var V = function(w, b) {
          var k = b * w.k.re - w.a1.re * w.z[0] - w.a2.re * w.z[1], y = w.b0.re * k + w.b1.re * w.z[0] + w.b2.re * w.z[1];
          return w.z[1] = w.z[0], w.z[0] = k, y;
        }, F = function(w, b) {
          var k = w, y = 0;
          for (y = 0; y < b.length; y++)
            k = V(b[y], k);
          return k;
        }, B = function(w, b) {
          var k = w.Fs, y = w.Fr, S = -Math.PI * (y / k) * 2, K = { re: Math.cos(S), im: Math.sin(S) }, Z = f.mul(b.k, f.add(b.b0, f.mul(K, f.add(b.b1, f.mul(b.b2, K))))), z = f.add(u, f.mul(K, f.add(b.a1, f.mul(b.a2, K)))), x = f.div(Z, z);
          return { magnitude: f.magnitude(x), phase: f.phase(x) };
        }, Q = function(w) {
          var b = 0, k = { magnitude: 1, phase: 0 };
          for (b = 0; b < n.length; b++) {
            var y = B(w, n[b]);
            k.magnitude *= y.magnitude, k.phase += y.phase;
          }
          return k.dBmagnitude = 20 * Math.log(k.magnitude) * Math.LOG10E, k;
        }, M = function() {
          for (var w = [], b = 0; b < m.length; b++)
            w[b] = { b0: { re: l.b[0], im: 0 }, b1: { re: l.b[1], im: 0 }, b2: { re: l.b[2], im: 0 }, a1: { re: l.a[0], im: 0 }, a2: { re: l.a[1], im: 0 }, k: { re: l.k, im: 0 }, z: [0, 0] };
          return w;
        }, p = function(w) {
          var b = M();
          return o(w, b, F);
        }, v = function(w, b) {
          var k = {}, y = [], S = 0;
          for (S = 0; S < b; S++)
            y.push(w(S));
          k.out = p(y);
          var K = !1, Z = !1;
          for (S = 0; S < b - 1; S++)
            if (k.out[S] > k.out[S + 1] && !K && (K = !0, k.max = { sample: S, value: k.out[S] }), K && !Z && k.out[S] < k.out[S + 1]) {
              Z = !0, k.min = { sample: S, value: k.out[S] };
              break;
            }
          return k;
        }, i = function(w, b) {
          var k = Math.pow(w / 2, 2) - b;
          return k < 0 ? [{ re: -w / 2, im: Math.sqrt(Math.abs(k)) }, { re: -w / 2, im: -Math.sqrt(Math.abs(k)) }] : [{ re: -w / 2 + Math.sqrt(k), im: 0 }, { re: -w / 2 - Math.sqrt(k), im: 0 }];
        }, R = function() {
          for (var w = [], b = 0; b < C.length; b++)
            w[b] = {}, w[b].z = i(C[b].b1, C[b].b2), w[b].p = i(C[b].a1, C[b].a2);
          return w;
        };
        return { singleStep: function(w) {
          return F(w, n);
        }, multiStep: function(w, b) {
          return o(w, n, F, b);
        }, filtfilt: function(w, b) {
          return I(o(w, n, F, b), n, F, !0);
        }, simulate: function(w) {
          return p(w);
        }, stepResponse: function(w) {
          return v(function() {
            return 1;
          }, w);
        }, impulseResponse: function(w) {
          return v(function(b) {
            return b === 0 ? 1 : 0;
          }, w);
        }, responsePoint: function(w) {
          return Q(w);
        }, response: function(w) {
          w = w || 100;
          var b = [], k = 0, y = 2 * w;
          for (k = 0; k < w; k++)
            b[k] = Q({ Fs: y, Fr: k });
          return s(b), b;
        }, polesZeros: function() {
          return R();
        }, reinit: function() {
          for (g = 0; g < n.length; g++)
            n[g].z = [0, 0];
        } };
      };
      c.exports = t;
    }, { "./utils": 9 }], 8: [function(r, c, h) {
      var d = function(f) {
        var o, I = f, s = [], t = function(n) {
          for (o = 0; o < n.steps; o++)
            s.push(I.singleStep((Math.random() - 0.5) * n.pp + n.offset));
        }, a = function(n) {
          var C = n.offset + n.pp, g = n.offset - n.pp;
          for (o = 0; o < n.steps; o++)
            o % 200 < 100 ? s.push(I.singleStep(C)) : s.push(I.singleStep(g));
        }, m = function(n) {
          var C = n.offset + n.pp, g = n.offset - n.pp;
          for (o = 0; o < n.steps; o++)
            o % 100 == 0 ? s.push(I.singleStep(C)) : s.push(I.singleStep(g));
        }, u = function(n) {
          var C = n.offset + n.pp, g = n.offset - n.pp, l = g, V = (C - g) / 100;
          for (o = 0; o < n.steps; o++)
            o % 200 < 100 ? l += V : l -= V, s.push(I.singleStep(l));
        };
        return { randomStability: function(n) {
          for (I.reinit(), s.length = 0, t(n), o = n.setup; o < s.length; o++)
            if (s[o] > n.maxStable || s[o] < n.minStable)
              return s[o];
          return !0;
        }, directedRandomStability: function(n) {
          I.reinit(), s.length = 0;
          var C;
          for (C = 0; C < n.tests; C++) {
            var g = Math.random();
            g < 0.25 ? t(n) : g < 0.5 ? a(n) : g < 0.75 ? m(n) : u(n);
          }
          for (t(n), o = n.setup; o < s.length; o++)
            if (s[o] > n.maxStable || s[o] < n.minStable)
              return s[o];
          return !0;
        }, evaluateBehavior: function() {
        } };
      };
      c.exports = d;
    }, {}], 9: [function(r, c, h) {
      h.evaluatePhase = function(s) {
        var t = 0, a = 0, m = Math.PI, u = 2 * m, n = [];
        for (a = 0; a < s.length; a++)
          n.push(s[a].phase);
        for (s[0].unwrappedPhase = s[0].phase, s[0].groupDelay = 0, a = 1; a < n.length; a++) {
          var C = n[a] - n[a - 1];
          if (C > m)
            for (t = a; t < n.length; t++)
              n[t] -= u;
          else if (C < -m)
            for (t = a; t < n.length; t++)
              n[t] += u;
          n[a] < 0 ? s[a].unwrappedPhase = -n[a] : s[a].unwrappedPhase = n[a], s[a].phaseDelay = s[a].unwrappedPhase / (a / s.length), s[a].groupDelay = (s[a].unwrappedPhase - s[a - 1].unwrappedPhase) / (m / s.length), s[a].groupDelay < 0 && (s[a].groupDelay = -s[a].groupDelay);
        }
        s[0].magnitude !== 0 ? (s[0].phaseDelay = s[1].phaseDelay, s[0].groupDelay = s[1].groupDelay) : (s[0].phaseDelay = s[2].phaseDelay, s[0].groupDelay = s[2].groupDelay, s[1].phaseDelay = s[2].phaseDelay, s[1].groupDelay = s[2].groupDelay);
      }, h.runMultiFilter = function(s, t, a, m) {
        var u = [];
        m && (u = s);
        var n;
        for (n = 0; n < s.length; n++)
          u[n] = a(s[n], t);
        return u;
      }, h.runMultiFilterReverse = function(s, t, a, m) {
        var u = [];
        m && (u = s);
        var n;
        for (n = s.length - 1; n >= 0; n--)
          u[n] = a(s[n], t);
        return u;
      };
      var d = function(s, t) {
        for (var a = !0; a; ) {
          var m = s, u = t;
          if (a = !1, u || (u = 1), m !== Math.floor(m) || u !== Math.floor(u))
            return 1;
          if (m === 0 || m === 1)
            return u;
          s = m - 1, t = u * m, a = !0;
        }
      };
      h.besselFactors = function(s) {
        for (var t = [], a = 0; a < s + 1; a++) {
          var m = d(2 * s - a), u = Math.pow(2, s - a) * d(a) * d(s - a);
          t.unshift(Math.floor(m / u));
        }
        return t;
      };
      var f = function(s, t) {
        for (var a = 0, m = 0; m < t; m++) {
          var u = 1 / Math.pow(2, m + 1);
          s > u && (s -= u, a += u);
        }
        return a;
      }, o = function(s, t) {
        return s & Math.pow(2, t);
      }, I = function(s, t, a) {
        var m = Math.abs(s), u = s - m;
        return { number: o(m, t).toString(), fraction: f(u, a).toString(), numberBits: t, fractionBits: a };
      };
      h.fixedPoint = { convert: function(s, t, a) {
        return I(s, t, a);
      }, add: function(s, t) {
      }, sub: function(s, t) {
      }, mul: function(s, t) {
      }, div: function(s, t) {
      } }, h.complex = { div: function(s, t) {
        var a = s.re, m = s.im, u = t.re, n = t.im, C = u * u + n * n;
        return { re: (a * u + m * n) / C, im: (m * u - a * n) / C };
      }, mul: function(s, t) {
        var a = s.re, m = s.im, u = t.re, n = t.im;
        return { re: a * u - m * n, im: (a + m) * (u + n) - a * u - m * n };
      }, add: function(s, t) {
        return { re: s.re + t.re, im: s.im + t.im };
      }, sub: function(s, t) {
        return { re: s.re - t.re, im: s.im - t.im };
      }, phase: function(s) {
        return Math.atan2(s.im, s.re);
      }, magnitude: function(s) {
        return Math.sqrt(s.re * s.re + s.im * s.im);
      } };
    }, {}] }, {}, [1])(1);
  });
})(WA);
const O = 60, sA = 0.95, aA = 0.995;
class _A {
  constructor(A) {
    this.session = A;
    const c = new H.CalcCascades().lowpass({
      order: 3,
      characteristic: "butterworth",
      Fs: O,
      Fc: 5,
      gain: 0,
      preGain: !1
    });
    this.iirFilter = {
      x: new H.IirFilter(c),
      y: new H.IirFilter(c),
      z: new H.IirFilter(c)
    }, this.accelerometerDrift = {
      x: 0,
      y: 0,
      z: 0
    }, this.velocity = {
      x: 0,
      y: 0,
      z: 0
    }, this.position = {
      x: 0,
      y: 0,
      z: 0
    }, this.motionStatus = {
      acceleration: {
        error: null
      },
      gyro: {
        error: null
      }
    };
  }
  readingHandler(A) {
    const r = mA(this.accelerometer.x, -this.accelerometer.z, this.accelerometer.y, 1);
    this.orientation = Array.from(this.orientationSensor.quaternion);
    const c = tA(
      this.orientationSensor.quaternion[0],
      this.orientationSensor.quaternion[1],
      this.orientationSensor.quaternion[2],
      this.orientationSensor.quaternion[3]
    );
    JA(r, r, c), r[0] = this.iirFilter.x.singleStep(r[0]), r[1] = this.iirFilter.y.singleStep(r[1]), r[2] = this.iirFilter.z.singleStep(r[2]), this.velocity.x += r[0] / O, this.velocity.y += r[1] / O, this.velocity.z += r[2] / O, this.position.x += this.velocity.x / O * 1e3, this.position.y += this.velocity.y / O * 1e3, this.position.z += this.velocity.z / O * 1e3, this.velocity.x *= sA, this.velocity.y *= sA, this.velocity.z *= sA, this.position.x *= aA, this.position.y *= aA, this.position.z *= aA, this.session.eventCallback({ name: "acceleration", acceleration: r }), this.session.eventCallback({ name: "velocity", velocity: this.velocity }), this.session.eventCallback({ name: "position", position: this.position }), this.session.poser.readjustElements();
  }
  async init() {
    if (window.LinearAccelerationSensor && window.RelativeOrientationSensor)
      try {
        this.accelerometer = new LinearAccelerationSensor({ frequency: O, referenceFrame: "screen" }), this.accelerometer.addEventListener("error", (A) => {
          A.error.name === "NotAllowedError" ? this.motionStatus.acceleration = {
            error: A.error
          } : A.error.name === "NotReadableError" && (this.motionStatus.acceleration = {
            error: A.error
          }), this.accelerometer.stop(), this.session.eventCallback({ name: "statusChanged" });
        }), this.orientationSensor = new RelativeOrientationSensor({ frequency: O, referenceFrame: "screen" }), this.orientationSensor.addEventListener("error", (A) => {
          A.error.name === "NotAllowedError" ? this.motionStatus.gyro = {
            error: A.error
          } : A.error.name === "NotReadableError" && (this.motionStatus.gyro = {
            error: A.error
          }), this.orientationSensor.stop(), this.session.eventCallback({ name: "statusChanged" });
        }), this.accelerometer.addEventListener("reading", (A) => {
          this.readingHandler(A);
        }), this.run();
      } catch (A) {
        A.name === "SecurityError" ? this.motionStatus = {
          acceleration: {
            error: "Permission denied"
          },
          gyro: {
            error: "Permission denied"
          }
        } : A.name === "ReferenceError" ? this.motionStatus = {
          acceleration: {
            error: "Sensor is not supported by the User Agent."
          },
          gyro: {
            error: "Sensor is not supported by the User Agent."
          }
        } : this.motionStatus = {
          acceleration: {
            error: A
          },
          gyro: {
            error: A
          }
        };
      }
    else
      this.motionStatus = {
        acceleration: {
          error: "NotSupported"
        },
        gyro: {
          error: "NotSupported"
        }
      };
  }
  run() {
    this.orientationSensor && this.orientationSensor.start(), this.accelerometer && this.accelerometer.start();
  }
  stop() {
    this.orientationSensor && this.orientationSensor.stop(), this.accelerometer && this.accelerometer.stop();
  }
  getOffsetMatrix(A) {
    if (!this.motionStatus.acceleration.error && !this.motionStatus.gyro.error) {
      const r = tA(
        A.orientation[0],
        -A.orientation[1],
        -A.orientation[2],
        A.orientation[3]
      ), c = J();
      uA(c, r), lA(
        c,
        c,
        _(
          A.position.x,
          A.position.y,
          A.position.z
        )
      );
      const h = tA(
        this.orientation[0],
        -this.orientation[1],
        -this.orientation[2],
        this.orientation[3]
      ), d = J();
      uA(d, h), lA(
        d,
        d,
        _(
          this.position.x,
          this.position.y,
          this.position.z
        )
      ), KA(d, d);
      const f = J();
      return dA(f, d, c), f;
    } else
      return J();
  }
  getCurrentTransform() {
    return {
      orientation: this.orientation,
      position: {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z
      }
    };
  }
}
class nA {
  constructor(A = "default") {
    this.initialized = !1, this.name = A, this.state = "CALIBRATION", this.feed = new LA(this), this.poser = new YA(this), this.motion = new _A(this), this.calibration = new RA(this), this.detector = new SA(this), this.workerStatus = { error: null, initialized: !1 }, this.eventCallback = null, this.focusEventRegistration = async () => {
      await this.feed.run(), await this.motion.run();
    }, this.blurEventRegistration = () => {
      this.feed.stop(), this.motion.stop();
    }, this.setup = {
      show: !0
    }, this.calibration.loadCameraCalibration();
  }
  loadSetup() {
    let A = window.localStorage.getItem(`vuexr/${this.name}/setup`);
    return A ? (A = JSON.parse(A), A) : {
      show: !0
    };
  }
  storeSetup() {
    window.localStorage.setItem(`vuexr/${this.name}/setup`, JSON.stringify(this.setup));
  }
  showSetup(A) {
    this.setup.show = A, this.storeSetup(), this.eventCallback({ name: "statusChanged" });
  }
  async init(A, r) {
    this.setup = this.loadSetup(), this.canvas = A, this.eventCallback = r, this.initialized || (await Promise.all([
      this.feed.init(),
      this.motion.init(),
      this.initWorker()
    ]), this.initialized = !0), this.eventCallback({ name: "statusChanged" });
  }
  async initWorker() {
    return new Promise((A, r) => {
      this.worker = new Worker(new URL("/assets/worker-4d36a704.js", self.location), { type: "module" }), this.worker.onmessage = (c) => {
        c.data.operation === "WORKER_READY" ? (this.initialized = !0, this.workerStatus = { error: null, initialized: !0 }, A()) : c.data.operation === "WORKER_FAILED" ? (this.workerStatus = { error: "WorkerFailed", initialized: !1 }, A()) : this.workerHandler(c);
      };
    });
  }
  workerHandler(A) {
    A.data.operation === "DETECT" ? this.detector.detectionFinished(A.data) : A.data.operation === "FIND_CHESSBOARD_CORNERS_CAPTURED" ? this.calibration.findChessBoardCornersCaptured() : A.data.operation === "FIND_CHESSBOARD_CORNERS_READY" ? this.calibration.findChessBoardCornersCaptureReady() : A.data.operation === "FIND_CHESSBOARD_CORNERS_NOT_READY" ? this.calibration.findChessBoardCornersCaptureNotReady() : A.data.operation === "CALIBRATE" && this.calibration.calibrationFinished(A.data);
  }
  async run() {
    await this.feed.run(), await this.motion.run(), window.addEventListener("focus", this.focusEventRegistration), window.addEventListener("blur", this.blurEventRegistration);
  }
  pause() {
    window.removeEventListener("focus", this.focusEventRegistration), window.removeEventListener("blur", this.blurEventRegistration), this.feed.stop(), this.motion.stop();
  }
  calibrate() {
    this.calibration.calibrate({ width: this.canvas.width, height: this.canvas.height }), this.state = "DETECTION";
  }
  resetCalibration() {
    this.calibration.resetCalibrationPoints(), this.calibration.resetCameraCalibration(), this.state = "CALIBRATION";
  }
  process() {
    this.initialized && (this.state === "CALIBRATION" ? this.calibration.findChessBoardCorners() : this.state === "DETECTION" && this.detector.detect());
  }
}
const Y = (e, A) => {
  const r = e.__vccOpts || e;
  for (const [c, h] of A)
    r[c] = h;
  return r;
}, $A = L({
  data() {
    return {
      selected: null,
      showHowToCalibrate: !1
    };
  },
  computed: {
    availableCameras() {
      return this.status.feed.available;
    }
  },
  props: {
    session: nA,
    status: Object
  },
  methods: {
    selectCamera(e) {
      this.session.feed.selectCamera(this.selected);
    },
    reset() {
      this.session.resetCalibration();
    },
    close() {
      this.$emit("close");
    }
  },
  mounted() {
    this.selected = this.session.feed.feedStatus.selected;
  },
  updated() {
    this.selected = this.session.feed.feedStatus.selected;
  }
}), j = (e) => (MA("data-v-608d97b9"), e = e(), yA(), e), Ae = { class: "setup" }, ee = { key: 0 }, te = { key: 0 }, se = /* @__PURE__ */ kA('<h2 class="title" data-v-608d97b9>Camera Calibration</h2><p data-v-608d97b9>To make VueXR know how to project virtual elements to the real world, we have to calibrate your camera first.</p><ol data-v-608d97b9><li data-v-608d97b9>Print or display this <a href="https://docs.opencv.org/master/pattern.png" target="_blank" data-v-608d97b9>chessboard pattern</a> on another device.</li><li data-v-608d97b9>Take a steady aim at the pattern with your camera.</li><li data-v-608d97b9>Press the <strong data-v-608d97b9>Capture</strong> button below.</li><li data-v-608d97b9>Repeat for at least 4 other different perspectives.</li><li data-v-608d97b9>Press the <b data-v-608d97b9>Calibrate</b> button.</li></ol>', 3), ae = { style: { "margin-top": "20px", "text-align": "center" } }, ie = { key: 1 }, ne = /* @__PURE__ */ j(() => /* @__PURE__ */ X("h2", { class: "title" }, "AR Setup", -1)), re = { class: "status-line" }, oe = ["title"], ce = {
  key: 1,
  class: "status-value"
}, le = /* @__PURE__ */ j(() => /* @__PURE__ */ X("option", {
  disabled: "",
  value: ""
}, "Please select a Camera", -1)), ue = ["value"], he = { key: 0 }, fe = { key: 1 }, pe = /* @__PURE__ */ j(() => /* @__PURE__ */ X("hr", null, null, -1)), de = { class: "status-line" }, ve = ["title"], me = {
  key: 1,
  class: "status-value"
}, ge = /* @__PURE__ */ j(() => /* @__PURE__ */ X("hr", null, null, -1)), Ce = { class: "status-line" }, Ie = ["title"], Qe = {
  key: 1,
  class: "status-value"
}, we = /* @__PURE__ */ j(() => /* @__PURE__ */ X("hr", null, null, -1)), be = { class: "status-line" }, Be = {
  key: 0,
  class: "status-value"
}, ke = {
  key: 1,
  class: "status-value"
}, Me = /* @__PURE__ */ j(() => /* @__PURE__ */ X("hr", null, null, -1)), ye = { class: "status-line" }, Fe = {
  key: 0,
  class: "status-value"
}, Ee = {
  key: 1,
  class: "status-value"
}, De = {
  key: 0,
  style: { "margin-top": "20px", "text-align": "center" }
}, Ve = {
  key: 1,
  style: { "margin-top": "20px", "text-align": "center" }
};
function Re(e, A, r, c, h, d) {
  return E(), D("div", Ae, [
    e.status ? (E(), D("div", ee, [
      X("div", {
        class: "close-button",
        onClick: A[0] || (A[0] = (...f) => e.close && e.close(...f))
      }, "×"),
      e.showHowToCalibrate ? (E(), D("div", te, [
        se,
        X("div", ae, [
          X("button", {
            class: "reset-button",
            onClick: A[1] || (A[1] = (f) => e.showHowToCalibrate = !1)
          }, "Back")
        ])
      ])) : (E(), D("div", ie, [
        ne,
        X("div", re, [
          N(" Video "),
          this.status.feed.error ? (E(), D("span", {
            key: 0,
            class: "status-value",
            title: this.status.feed.error
          }, "✗", 8, oe)) : (E(), D("span", ce, "✓"))
        ]),
        QA(X("select", {
          class: "camera-selection",
          style: { "margin-top": "5px" },
          "onUpdate:modelValue": A[2] || (A[2] = (f) => e.selected = f),
          onChange: A[3] || (A[3] = (...f) => this.selectCamera && this.selectCamera(...f))
        }, [
          le,
          (E(!0), D(wA, null, bA(e.availableCameras, (f) => (E(), D("option", {
            value: f.deviceId
          }, [
            f.label ? (E(), D("span", he, iA(f.label), 1)) : (E(), D("span", fe, iA(f.deviceId), 1))
          ], 8, ue))), 256))
        ], 544), [
          [BA, e.selected]
        ]),
        pe,
        X("div", de, [
          N(" Accelerometer "),
          this.status.motion && this.status.motion.acceleration.error ? (E(), D("span", {
            key: 0,
            class: "status-value",
            title: this.status.motion.acceleration.error
          }, "⚠", 8, ve)) : (E(), D("span", me, "✓"))
        ]),
        ge,
        X("div", Ce, [
          N(" Gyroscope "),
          this.status.motion && this.status.motion.gyro.error ? (E(), D("span", {
            key: 0,
            class: "status-value",
            title: this.status.motion.gyro.error
          }, "⚠", 8, Ie)) : (E(), D("span", Qe, "✓"))
        ]),
        we,
        X("div", be, [
          N(" Computer Vision "),
          this.status.worker.initialized ? (E(), D("span", ke, "✓")) : (E(), D("span", Be, "✗"))
        ]),
        Me,
        X("div", ye, [
          N(" Calibration "),
          this.status.calibration.calibrated ? (E(), D("span", Ee, "✓")) : (E(), D("span", Fe, "✗"))
        ]),
        this.status.calibration.calibrated ? (E(), D("div", De, [
          X("button", {
            class: "reset-button",
            onClick: A[4] || (A[4] = (...f) => this.reset && this.reset(...f))
          }, "Reset Calibration")
        ])) : !this.status.feed.error && this.status.worker.initialized ? (E(), D("div", Ve, [
          X("button", {
            class: "reset-button",
            onClick: A[5] || (A[5] = (f) => e.showHowToCalibrate = !0)
          }, "How to calibrate")
        ])) : G("", !0)
      ]))
    ])) : G("", !0)
  ]);
}
const Se = /* @__PURE__ */ Y($A, [["render", Re], ["__scopeId", "data-v-608d97b9"]]);
const Xe = L({
  data() {
    return {};
  },
  props: {
    session: nA,
    status: Object
  },
  mounted() {
  },
  methods: {
    captureCalibrationPoints() {
      this.session.calibration.setCaptureNextcalibrationPoints();
    },
    calibrate() {
      this.session.calibrate();
    },
    reset() {
      this.session.resetCalibration();
    }
  }
}), ze = {
  key: 0,
  class: "controls"
}, Ke = ["disabled"], Ue = ["disabled"], Ze = { key: 0 }, xe = { key: 1 }, Oe = ["disabled"], Ge = {
  key: 2,
  class: "hint-text"
}, Pe = {
  key: 3,
  class: "hint-text"
};
function Je(e, A, r, c, h, d) {
  return this.status ? (E(), D("div", ze, [
    this.status.calibration.calibrated ? G("", !0) : (E(), D("button", {
      key: 0,
      disabled: !this.status.calibration.captureReady,
      class: "capture-image",
      onClick: A[0] || (A[0] = (...f) => e.captureCalibrationPoints && e.captureCalibrationPoints(...f))
    }, "Capture", 8, Ke)),
    this.status.calibration.calibrated ? G("", !0) : (E(), D("button", {
      key: 1,
      disabled: this.status.calibration.captures < 5,
      onClick: A[1] || (A[1] = (...f) => e.calibrate && e.calibrate(...f))
    }, [
      this.status.calibration.calibrated ? (E(), D("span", xe, "Recalibrate")) : (E(), D("span", Ze, "Calibrate"))
    ], 8, Ue)),
    X("button", {
      disabled: !this.status.calibration.captures && !this.status.calibration.calibrated,
      onClick: A[2] || (A[2] = (...f) => e.reset && e.reset(...f))
    }, "Reset", 8, Oe),
    this.status.calibration.calibrated ? (E(), D("span", Pe, "Calibrated")) : (E(), D("span", Ge, iA(this.status.calibration.captures) + " Captures", 1))
  ])) : G("", !0);
}
const He = /* @__PURE__ */ Y(Xe, [["render", Je], ["__scopeId", "data-v-23aa3a1c"]]);
const je = L({
  data() {
    return {
      session: null,
      status: null,
      trackedMarkers: []
    };
  },
  props: {
    name: {
      type: String,
      default: "default"
    }
  },
  methods: {
    updateElements() {
      this.$slots.default().forEach((e) => {
        e.componentOptions && e.componentOptions.tag === "ar-element" && this.session.poser.registerElement(
          e.componentOptions.propsData.id,
          e.elm
        );
      });
    },
    closeSetup() {
      this.session.showSetup(!1);
    },
    openSetup() {
      this.session.showSetup(!0);
    },
    sessionCallback(e) {
      (e.name === "initialized" || e.name === "statusChanged") && (this.status = {
        initialized: this.session.initialized,
        feed: this.session.feed.feedStatus,
        motion: this.session.motion.motionStatus,
        worker: this.session.workerStatus,
        calibration: this.session.calibration.calibrationStatus,
        setup: this.session.setup
      });
    },
    resizeCanvas() {
      const e = this.$refs.canvas.width / this.$refs.canvas.height, A = getComputedStyle(this.$refs.wrapper), r = A.width.split("px")[0], c = A.height.split("px")[0], h = r / c;
      if (e >= h) {
        const d = r, f = r / e;
        this.$refs.canvas.style.width = `${d}px`, this.$refs.canvas.style.height = `${f}px`;
      } else {
        const d = c * e, f = c;
        this.$refs.canvas.style.width = `${d}px`, this.$refs.canvas.style.height = `${f}px`;
      }
    }
  },
  beforeMount() {
    this.session = this.$vuexr.requestSession(this.name);
  },
  async mounted() {
    await this.session.init(this.$refs.canvas, (e) => {
      this.sessionCallback(e);
    }), this.session.poser.registerView(this, (e) => {
      this.trackedMarkers = e;
    }), await this.session.run(), await this.resizeCanvas(), window.addEventListener("resize", () => {
      this.resizeCanvas();
    });
  },
  unmounted() {
    this.$slots.default().forEach((e) => {
      e.componentOptions && e.componentOptions.tag === "ar-element" && this.session.poser.unregisterElement(
        e.componentOptions.propsData.id
      );
    }), window.removeEventListener("resize", this.resizeCanvas), this.session.poser.unregisterView(this), this.session.pause();
  },
  components: {
    ARSetup: Se,
    ARControls: He
  }
}), Ne = {
  class: "ar-view-wrapper",
  ref: "wrapper"
}, qe = { class: "ar-view" }, Te = {
  class: "ar-canvas",
  ref: "canvas"
}, Le = {
  key: 0,
  class: "controls-container"
}, Ye = {
  key: 1,
  class: "setup-container"
}, We = {
  key: 2,
  class: "loading-text"
};
function _e(e, A, r, c, h, d) {
  const f = cA("ARControls"), o = cA("ARSetup");
  return E(), D("div", Ne, [
    X("div", qe, [
      X("canvas", Te, null, 512),
      X("div", {
        style: FA({ opacity: this.status && this.status.initialized && this.status.calibration.calibrated ? 1 : 0 }),
        class: "elements",
        ref: "elements"
      }, [
        fA(e.$slots, "default", { trackedMarkers: e.trackedMarkers }, void 0, !0)
      ], 4)
    ]),
    X("div", {
      onClick: A[0] || (A[0] = (...I) => this.openSetup && this.openSetup(...I)),
      class: "setup-button"
    }, " ⚙ "),
    this.status && this.status.initialized && this.status.feed.selected && !this.status.calibration.calibrated ? (E(), D("div", Le, [
      pA(f, {
        session: this.session,
        status: this.status
      }, null, 8, ["session", "status"])
    ])) : G("", !0),
    this.status && this.status.initialized ? (E(), D("div", Ye, [
      this.status.setup.show ? (E(), EA(o, {
        key: 0,
        session: this.session,
        status: this.status,
        onClose: this.closeSetup
      }, null, 8, ["session", "status", "onClose"])) : G("", !0)
    ])) : (E(), D("div", We, " Loading… "))
  ], 512);
}
const $e = /* @__PURE__ */ Y(je, [["render", _e], ["__scopeId", "data-v-84f87997"]]);
const At = L({
  data() {
    return {
      show: !1,
      timeoutHandler: null,
      tracked: !1
    };
  },
  props: {
    id: Number,
    timeout: {
      type: Number,
      default: 1e3
    },
    markerSize: {
      type: Number,
      default: 50
    }
  },
  mounted() {
    this.$parent.$data.session.poser.registerElement(this.id, this.$refs.element, this.markerSize, (e) => {
      this.tracked = e, e ? (this.show = !0, window.clearTimeout(this.timeoutHandler), this.timeoutHandler = null) : this.timeoutHandler = window.setTimeout(() => {
        this.show = !1;
      }, this.timeout);
    });
  },
  unmounted() {
    this.$parent.$data.session.poser.unregisterElement(this.id);
  }
}), et = {
  class: "element",
  ref: "element"
}, tt = { key: 0 };
function st(e, A, r, c, h, d) {
  return E(), D("div", et, [
    pA(DA, { name: "fade" }, {
      default: VA(() => [
        e.show ? (E(), D("div", tt, [
          fA(e.$slots, "default", { tracked: e.tracked }, void 0, !0)
        ])) : G("", !0)
      ]),
      _: 3
    })
  ], 512);
}
const at = /* @__PURE__ */ Y(At, [["render", st], ["__scopeId", "data-v-5ffdd0e0"]]), it = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAByYAAAUyCAIAAADEGwRQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2AkGFAQH++VSRAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABAElEQVR4nOzcsZGDWBRFweXXmIQh5R+QFMbYsDGM6qyQ9nX7VD2Di3EMtvM8/wEAAAAAoLCuPgAAAAAA4P9DcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAyPy88c7/fn89nfgqf7Ha7PR6Pq6/gfcx8GhsfyMynMfNpbHwgM5/GzKexcfgu23mef35m2/6LU/hwL7wqfC8zH8jGpzHzgcx8FBufycxHMfOBbBy+ocs1TAAAAQBJREFUiB8LAAAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAJf0XsMAAAEASURBVAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJATQl4pAAABAElEQVSRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAZyIz5QAAAQBJREFUAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISJcJGVcAAAEASURBVK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAy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", nt = L({
  data: function() {
    return {
      pattern: it
    };
  }
}), rt = ["src"];
function ot(e, A, r, c, h, d) {
  return E(), D("img", {
    alt: "Chessboard pattern for camera calibration",
    src: e.pattern,
    style: { "max-width": "100%", "max-height": "100%" }
  }, null, 8, rt);
}
const ct = /* @__PURE__ */ Y(nt, [["render", ot]]);
class lt {
  constructor() {
    oA(this, "sessions");
    this.sessions = {};
  }
  requestSession(A = "default") {
    return this.sessions[A] || (this.sessions[A] = new nA()), this.sessions[A];
  }
  removeSession(A = "default") {
    this.sessions[A].pause(), delete this.sessions[A];
  }
  async check() {
    return window.isSecureContext ? navigator.mediaDevices && window.ImageCapture ? (await navigator.mediaDevices.enumerateDevices()).filter((r) => r.kind === "videoinput").length ? {
      supported: !0,
      error: null
    } : {
      supported: !1,
      error: "No camera is connected."
    } : {
      supported: !1,
      error: "MediaDevices and/or ImageCapture API not supported."
    } : {
      supported: !1,
      error: "You are not in a secure connection. Is HTTPS enabled?"
    };
  }
}
const ft = {
  install(e, A) {
    e.component("ar-view", $e), e.component("ar-element", at), e.component("ar-chessboard", ct), e.config.globalProperties.$vuexr = new lt();
  }
};
export {
  ft as VueXR
};
