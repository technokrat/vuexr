var kA = Object.defineProperty;
var EA = (A, t, n) => t in A ? kA(A, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : A[t] = n;
var E = (A, t, n) => (EA(A, typeof t != "symbol" ? t + "" : t, n), n);
import { defineComponent as AA, ref as $, computed as FA, onMounted as hA, onUpdated as DA, openBlock as R, createElementBlock as S, createElementVNode as K, createTextVNode as L, withDirectives as RA, Fragment as SA, renderList as VA, unref as tA, toDisplayString as lA, vModelSelect as XA, createCommentVNode as J, createStaticVNode as KA, pushScopeId as UA, popScopeId as zA, inject as fA, provide as OA, reactive as mA, onUnmounted as IA, normalizeStyle as xA, renderSlot as CA, createVNode as QA, createBlock as ZA, Transition as GA, withCtx as PA } from "vue";
const q = (A) => (UA("data-v-6b1e8da4"), A = A(), zA(), A), JA = { class: "setup" }, NA = { key: 0 }, HA = { key: 0 }, jA = /* @__PURE__ */ KA('<h2 class="title" data-v-6b1e8da4>Camera Calibration</h2><p data-v-6b1e8da4> To make VueXR know how to project virtual elements to the real world, we have to calibrate your camera first. </p><ol data-v-6b1e8da4><li data-v-6b1e8da4> Print or display this <a href="https://docs.opencv.org/master/pattern.png" target="_blank" data-v-6b1e8da4>chessboard pattern</a> on another device. </li><li data-v-6b1e8da4>Take a steady aim at the pattern with your camera.</li><li data-v-6b1e8da4>Press the <strong data-v-6b1e8da4>Capture</strong> button below.</li><li data-v-6b1e8da4>Repeat for at least 4 other different perspectives.</li><li data-v-6b1e8da4>Press the <b data-v-6b1e8da4>Calibrate</b> button.</li></ol>', 3), TA = { style: { "margin-top": "20px", "text-align": "center" } }, qA = { key: 1 }, LA = /* @__PURE__ */ q(() => /* @__PURE__ */ K("h2", { class: "title" }, "AR Setup", -1)), YA = { class: "status-line" }, WA = ["title"], _A = {
  key: 1,
  class: "status-value"
}, $A = /* @__PURE__ */ q(() => /* @__PURE__ */ K("option", {
  disabled: "",
  value: ""
}, "Please select a Camera", -1)), Ae = ["value"], ee = { key: 0 }, te = { key: 1 }, ae = /* @__PURE__ */ q(() => /* @__PURE__ */ K("hr", null, null, -1)), ie = { class: "status-line" }, se = ["title"], ne = {
  key: 1,
  class: "status-value"
}, re = /* @__PURE__ */ q(() => /* @__PURE__ */ K("hr", null, null, -1)), oe = { class: "status-line" }, ce = ["title"], le = {
  key: 1,
  class: "status-value"
}, ue = /* @__PURE__ */ q(() => /* @__PURE__ */ K("hr", null, null, -1)), he = { class: "status-line" }, fe = {
  key: 0,
  class: "status-value"
}, de = {
  key: 1,
  class: "status-value"
}, pe = /* @__PURE__ */ q(() => /* @__PURE__ */ K("hr", null, null, -1)), ve = { class: "status-line" }, ge = {
  key: 0,
  class: "status-value"
}, me = {
  key: 1,
  class: "status-value"
}, Ie = {
  key: 0,
  style: { "margin-top": "20px", "text-align": "center" }
}, Ce = {
  key: 1,
  style: { "margin-top": "20px", "text-align": "center" }
}, Qe = /* @__PURE__ */ AA({
  __name: "ARSetup",
  props: {
    status: null,
    session: null
  },
  emits: ["close"],
  setup(A, { emit: t }) {
    const n = A, o = $(null), h = $(!1), f = FA(() => {
      var a;
      return (a = n.status.feed) == null ? void 0 : a.available;
    });
    function d(a) {
      n.session.feed.selectCamera(o.value);
    }
    function c() {
      n.session.resetCalibration();
    }
    function C() {
      t("close");
    }
    return hA(() => {
      o.value = n.session.feed.feedStatus.selected ?? null;
    }), DA(() => {
      o.value = n.session.feed.feedStatus.selected ?? null;
    }), (a, e) => {
      var i, v, l, s, I;
      return R(), S("div", JA, [
        A.status ? (R(), S("div", NA, [
          K("div", {
            class: "close-button",
            onClick: C
          }, "×"),
          h.value ? (R(), S("div", HA, [
            jA,
            K("div", TA, [
              K("button", {
                class: "reset-button",
                onClick: e[0] || (e[0] = (m) => h.value = !1)
              }, " Back ")
            ])
          ])) : (R(), S("div", qA, [
            LA,
            K("div", YA, [
              L(" Video "),
              (i = A.status.feed) != null && i.error ? (R(), S("span", {
                key: 0,
                class: "status-value",
                title: A.status.feed.error
              }, "✗", 8, WA)) : (R(), S("span", _A, "✓"))
            ]),
            RA(K("select", {
              class: "camera-selection",
              style: { "margin-top": "5px" },
              "onUpdate:modelValue": e[1] || (e[1] = (m) => o.value = m),
              onChange: d
            }, [
              $A,
              (R(!0), S(SA, null, VA(tA(f), (m) => (R(), S("option", {
                value: m.deviceId
              }, [
                m.label ? (R(), S("span", ee, lA(m.label), 1)) : (R(), S("span", te, lA(m.deviceId), 1))
              ], 8, Ae))), 256))
            ], 544), [
              [XA, o.value]
            ]),
            ae,
            K("div", ie, [
              L(" Accelerometer "),
              A.status.motion && A.status.motion.acceleration.error ? (R(), S("span", {
                key: 0,
                class: "status-value",
                title: A.status.motion.acceleration.error
              }, "⚠", 8, se)) : (R(), S("span", ne, "✓"))
            ]),
            re,
            K("div", oe, [
              L(" Gyroscope "),
              A.status.motion && A.status.motion.gyro.error ? (R(), S("span", {
                key: 0,
                class: "status-value",
                title: A.status.motion.gyro.error
              }, "⚠", 8, ce)) : (R(), S("span", le, "✓"))
            ]),
            ue,
            K("div", he, [
              L(" Computer Vision "),
              A.status.initialized ? (R(), S("span", de, "✓")) : (R(), S("span", fe, "✗"))
            ]),
            pe,
            K("div", ve, [
              L(" Calibration "),
              (v = A.status.calibration) != null && v.calibrated ? (R(), S("span", me, "✓")) : (R(), S("span", ge, "✗"))
            ]),
            (l = A.status.calibration) != null && l.calibrated ? (R(), S("div", Ie, [
              K("button", {
                class: "reset-button",
                onClick: c
              }, "Reset Calibration")
            ])) : !((s = A.status.feed) != null && s.error) && ((I = A.status.worker) != null && I.initialized) ? (R(), S("div", Ce, [
              K("button", {
                class: "reset-button",
                onClick: e[2] || (e[2] = (m) => h.value = !0)
              }, " How to calibrate ")
            ])) : J("", !0)
          ]))
        ])) : J("", !0)
      ]);
    };
  }
});
const aA = (A, t) => {
  const n = A.__vccOpts || A;
  for (const [o, h] of t)
    n[o] = h;
  return n;
}, we = /* @__PURE__ */ aA(Qe, [["__scopeId", "data-v-6b1e8da4"]]), be = {
  key: 0,
  class: "controls"
}, Be = ["disabled"], Me = ["disabled"], ye = { key: 0 }, ke = { key: 1 }, Ee = ["disabled"], Fe = {
  key: 2,
  class: "hint-text"
}, De = {
  key: 3,
  class: "hint-text"
}, Re = /* @__PURE__ */ AA({
  __name: "ARControls",
  props: {
    status: null
  },
  setup(A) {
    const t = fA("session");
    function n() {
      t.calibration.setCaptureNextcalibrationPoints();
    }
    function o() {
      t.calibrate();
    }
    function h() {
      t.resetCalibration();
    }
    return (f, d) => {
      var c, C, a, e, i, v, l, s, I;
      return A.status ? (R(), S("div", be, [
        (c = A.status.calibration) != null && c.calibrated ? J("", !0) : (R(), S("button", {
          key: 0,
          disabled: !((C = A.status.calibration) != null && C.captureReady),
          class: "capture-image",
          onClick: n
        }, " Capture ", 8, Be)),
        (a = A.status.calibration) != null && a.calibrated ? J("", !0) : (R(), S("button", {
          key: 1,
          disabled: (((e = A.status.calibration) == null ? void 0 : e.captures) ?? 0) < 5,
          onClick: o
        }, [
          (i = A.status.calibration) != null && i.calibrated ? (R(), S("span", ke, "Recalibrate")) : (R(), S("span", ye, "Calibrate"))
        ], 8, Me)),
        K("button", {
          disabled: !((v = A.status.calibration) != null && v.captures) && !((l = A.status.calibration) != null && l.calibrated),
          onClick: h
        }, " Reset ", 8, Ee),
        (s = A.status.calibration) != null && s.calibrated ? (R(), S("span", De, "Calibrated")) : (R(), S("span", Fe, lA((I = A.status.calibration) == null ? void 0 : I.captures) + " Captures", 1))
      ])) : J("", !0);
    };
  }
});
const Se = /* @__PURE__ */ aA(Re, [["__scopeId", "data-v-937b8749"]]);
var _ = /* @__PURE__ */ ((A) => (A[A.RESET_CALIBRATION_POINTS = 0] = "RESET_CALIBRATION_POINTS", A[A.FIND_CHESSBOARD_CORNERS = 1] = "FIND_CHESSBOARD_CORNERS", A[A.CALIBRATE = 2] = "CALIBRATE", A[A.DETECT = 3] = "DETECT", A))(_ || {}), P = /* @__PURE__ */ ((A) => (A[A.WORKER_READY = 0] = "WORKER_READY", A[A.WORKER_FAILED = 1] = "WORKER_FAILED", A[A.FIND_CHESSBOARD_CORNERS_CAPTURED = 2] = "FIND_CHESSBOARD_CORNERS_CAPTURED", A[A.FIND_CHESSBOARD_CORNERS_READY = 3] = "FIND_CHESSBOARD_CORNERS_READY", A[A.FIND_CHESSBOARD_CORNERS_NOT_READY = 4] = "FIND_CHESSBOARD_CORNERS_NOT_READY", A[A.CALIBRATE = 5] = "CALIBRATE", A[A.DETECT = 6] = "DETECT", A))(P || {});
class Ve {
  constructor(t) {
    E(this, "session");
    E(this, "findChessboardOngoing");
    E(this, "calibrationOngoing");
    E(this, "captureNextCalibrationPoints");
    E(this, "calibrationStatus");
    E(this, "calibration", null);
    this.session = t, this.findChessboardOngoing = !1, this.calibrationOngoing = !1, this.captureNextCalibrationPoints = !1, this.calibrationStatus = {
      captureReady: !1,
      calibrated: !1,
      captures: 0
    };
  }
  resetCalibrationPoints() {
    this.session.worker && this.session.worker.postMessage({
      operation: _.RESET_CALIBRATION_POINTS
    }), this.calibrationStatus.captures = 0, this.session.updateStatus();
  }
  resetCameraCalibration() {
    this.calibration = null, this.calibrationStatus.calibrated = !1, this.session.updateStatus();
  }
  loadCameraCalibration() {
    let t = window.localStorage.getItem(
      `vuexr/${this.session.name}/calibration/${this.session.feed.feedStatus.selected}`
    );
    if (t) {
      const n = JSON.parse(t);
      return this.resetCameraCalibration(), this.calibration = n, this.calibrationStatus.calibrated = !0, this.session.state = MA.DETECTION, this.session.updateStatus(), !0;
    } else
      return !1;
  }
  storeCameraCalibration() {
    return this.calibration ? (window.localStorage.setItem(
      `vuexr/${this.session.name}/calibration/${this.session.feed.feedStatus.selected}`,
      JSON.stringify(this.calibration)
    ), !0) : !1;
  }
  findChessBoardCorners(t = !0) {
    var n;
    !this.findChessboardOngoing && this.session.canvas && this.session.worker && (this.findChessboardOngoing = !0, this.session.worker.postMessage({
      operation: _.FIND_CHESSBOARD_CORNERS,
      image: (n = this.session.context2d) == null ? void 0 : n.getImageData(
        0,
        0,
        this.session.canvas.width,
        this.session.canvas.height
      ),
      captureNextCalibrationPoints: this.captureNextCalibrationPoints,
      highlight: t
    }));
  }
  findChessBoardCornersCaptured() {
    this.findChessboardOngoing = !1, this.captureNextCalibrationPoints = !1, this.calibrationStatus.captures++, this.session.updateStatus();
  }
  findChessBoardCornersCaptureReady() {
    this.findChessboardOngoing = !1, this.calibrationStatus.captureReady = !0, this.session.updateStatus();
  }
  findChessBoardCornersCaptureNotReady() {
    this.findChessboardOngoing = !1, this.calibrationStatus.captureReady = !1, this.session.updateStatus();
  }
  setCaptureNextcalibrationPoints() {
    this.captureNextCalibrationPoints = !0;
  }
  calibrate(t) {
    var n;
    this.calibrationOngoing || (this.calibrationOngoing = !0, (n = this.session.worker) == null || n.postMessage({
      operation: _.CALIBRATE,
      width: t.width,
      height: t.height
    }));
  }
  calibrationFinished(t) {
    this.calibrationOngoing = !1, this.calibration = t.calibration, this.storeCameraCalibration(), this.calibrationStatus.calibrated = !0, this.session.updateStatus();
  }
}
class Xe {
  constructor(t) {
    E(this, "session");
    E(this, "detectionOngoing", !1);
    this.session = t;
  }
  detect(t = !0) {
    var n, o, h, f, d, c;
    if (!this.detectionOngoing) {
      this.detectionOngoing = !0;
      try {
        (c = this.session.worker) == null || c.postMessage({
          operation: _.DETECT,
          image: (h = this.session.context2d) == null ? void 0 : h.getImageData(
            0,
            0,
            ((n = this.session.canvas) == null ? void 0 : n.width) ?? 0,
            ((o = this.session.canvas) == null ? void 0 : o.height) ?? 0
          ),
          calibration: {
            cameraMatrix: JSON.parse(
              JSON.stringify((f = this.session.calibration.calibration) == null ? void 0 : f.cameraMatrix)
            ),
            distCoeffs: JSON.parse(
              JSON.stringify((d = this.session.calibration.calibration) == null ? void 0 : d.distCoeffs)
            )
          },
          highlight: t
        });
      } catch (C) {
        this.detectionOngoing = !1, console.log(C);
      }
    }
  }
  detectionFinished(t) {
    this.detectionOngoing = !1, this.session.calibration.calibrationStatus.calibrated && this.session.poser.setMarkers(t.markers ?? []);
  }
}
var Ke = 1e-6, O = typeof Float32Array < "u" ? Float32Array : Array;
Math.hypot || (Math.hypot = function() {
  for (var A = 0, t = arguments.length; t--; )
    A += arguments[t] * arguments[t];
  return Math.sqrt(A);
});
function Ue() {
  var A = new O(9);
  return O != Float32Array && (A[1] = 0, A[2] = 0, A[3] = 0, A[5] = 0, A[6] = 0, A[7] = 0), A[0] = 1, A[4] = 1, A[8] = 1, A;
}
function j() {
  var A = new O(16);
  return O != Float32Array && (A[1] = 0, A[2] = 0, A[3] = 0, A[4] = 0, A[6] = 0, A[7] = 0, A[8] = 0, A[9] = 0, A[11] = 0, A[12] = 0, A[13] = 0, A[14] = 0), A[0] = 1, A[5] = 1, A[10] = 1, A[15] = 1, A;
}
function Y(A, t, n, o, h, f, d, c, C, a, e, i, v, l, s, I) {
  var m = new O(16);
  return m[0] = A, m[1] = t, m[2] = n, m[3] = o, m[4] = h, m[5] = f, m[6] = d, m[7] = c, m[8] = C, m[9] = a, m[10] = e, m[11] = i, m[12] = v, m[13] = l, m[14] = s, m[15] = I, m;
}
function ze(A, t) {
  var n = t[0], o = t[1], h = t[2], f = t[3], d = t[4], c = t[5], C = t[6], a = t[7], e = t[8], i = t[9], v = t[10], l = t[11], s = t[12], I = t[13], m = t[14], u = t[15], D = n * c - o * d, k = n * C - h * d, B = n * a - f * d, Q = o * C - h * c, M = o * a - f * c, p = h * a - f * C, g = e * I - i * s, r = e * m - v * s, V = e * u - l * s, w = i * m - v * I, b = i * u - l * I, y = v * u - l * m, F = D * y - k * b + B * w + Q * V - M * r + p * g;
  return F ? (F = 1 / F, A[0] = (c * y - C * b + a * w) * F, A[1] = (h * b - o * y - f * w) * F, A[2] = (I * p - m * M + u * Q) * F, A[3] = (v * M - i * p - l * Q) * F, A[4] = (C * V - d * y - a * r) * F, A[5] = (n * y - h * V + f * r) * F, A[6] = (m * B - s * p - u * k) * F, A[7] = (e * p - v * B + l * k) * F, A[8] = (d * b - c * V + a * g) * F, A[9] = (o * V - n * b - f * g) * F, A[10] = (s * M - I * B + u * D) * F, A[11] = (i * B - e * M - l * D) * F, A[12] = (c * r - d * w - C * g) * F, A[13] = (n * w - o * r + h * g) * F, A[14] = (I * k - s * Q - m * D) * F, A[15] = (e * Q - i * k + v * D) * F, A) : null;
}
function wA(A, t, n) {
  var o = t[0], h = t[1], f = t[2], d = t[3], c = t[4], C = t[5], a = t[6], e = t[7], i = t[8], v = t[9], l = t[10], s = t[11], I = t[12], m = t[13], u = t[14], D = t[15], k = n[0], B = n[1], Q = n[2], M = n[3];
  return A[0] = k * o + B * c + Q * i + M * I, A[1] = k * h + B * C + Q * v + M * m, A[2] = k * f + B * a + Q * l + M * u, A[3] = k * d + B * e + Q * s + M * D, k = n[4], B = n[5], Q = n[6], M = n[7], A[4] = k * o + B * c + Q * i + M * I, A[5] = k * h + B * C + Q * v + M * m, A[6] = k * f + B * a + Q * l + M * u, A[7] = k * d + B * e + Q * s + M * D, k = n[8], B = n[9], Q = n[10], M = n[11], A[8] = k * o + B * c + Q * i + M * I, A[9] = k * h + B * C + Q * v + M * m, A[10] = k * f + B * a + Q * l + M * u, A[11] = k * d + B * e + Q * s + M * D, k = n[12], B = n[13], Q = n[14], M = n[15], A[12] = k * o + B * c + Q * i + M * I, A[13] = k * h + B * C + Q * v + M * m, A[14] = k * f + B * a + Q * l + M * u, A[15] = k * d + B * e + Q * s + M * D, A;
}
function pA(A, t, n) {
  var o = n[0], h = n[1], f = n[2], d, c, C, a, e, i, v, l, s, I, m, u;
  return t === A ? (A[12] = t[0] * o + t[4] * h + t[8] * f + t[12], A[13] = t[1] * o + t[5] * h + t[9] * f + t[13], A[14] = t[2] * o + t[6] * h + t[10] * f + t[14], A[15] = t[3] * o + t[7] * h + t[11] * f + t[15]) : (d = t[0], c = t[1], C = t[2], a = t[3], e = t[4], i = t[5], v = t[6], l = t[7], s = t[8], I = t[9], m = t[10], u = t[11], A[0] = d, A[1] = c, A[2] = C, A[3] = a, A[4] = e, A[5] = i, A[6] = v, A[7] = l, A[8] = s, A[9] = I, A[10] = m, A[11] = u, A[12] = d * o + e * h + s * f + t[12], A[13] = c * o + i * h + I * f + t[13], A[14] = C * o + v * h + m * f + t[14], A[15] = a * o + l * h + u * f + t[15]), A;
}
function vA(A, t) {
  var n = t[0], o = t[1], h = t[2], f = t[3], d = n + n, c = o + o, C = h + h, a = n * d, e = o * d, i = o * c, v = h * d, l = h * c, s = h * C, I = f * d, m = f * c, u = f * C;
  return A[0] = 1 - i - s, A[1] = e + u, A[2] = v - m, A[3] = 0, A[4] = e - u, A[5] = 1 - a - s, A[6] = l + I, A[7] = 0, A[8] = v + m, A[9] = l - I, A[10] = 1 - a - i, A[11] = 0, A[12] = 0, A[13] = 0, A[14] = 0, A[15] = 1, A;
}
var W = wA;
function N() {
  var A = new O(3);
  return O != Float32Array && (A[0] = 0, A[1] = 0, A[2] = 0), A;
}
function Oe(A) {
  var t = A[0], n = A[1], o = A[2];
  return Math.hypot(t, n, o);
}
function gA(A, t, n) {
  var o = new O(3);
  return o[0] = A, o[1] = t, o[2] = n, o;
}
function xe(A, t) {
  var n = t[0], o = t[1], h = t[2], f = n * n + o * o + h * h;
  return f > 0 && (f = 1 / Math.sqrt(f)), A[0] = t[0] * f, A[1] = t[1] * f, A[2] = t[2] * f, A;
}
function Ze(A, t) {
  return A[0] * t[0] + A[1] * t[1] + A[2] * t[2];
}
function sA(A, t, n) {
  var o = t[0], h = t[1], f = t[2], d = n[0], c = n[1], C = n[2];
  return A[0] = h * C - f * c, A[1] = f * d - o * C, A[2] = o * c - h * d, A;
}
var Ge = Oe;
(function() {
  var A = N();
  return function(t, n, o, h, f, d) {
    var c, C;
    for (n || (n = 3), o || (o = 0), h ? C = Math.min(h * n + o, t.length) : C = t.length, c = o; c < C; c += n)
      A[0] = t[c], A[1] = t[c + 1], A[2] = t[c + 2], f(A, A, d), t[c] = A[0], t[c + 1] = A[1], t[c + 2] = A[2];
    return t;
  };
})();
function Pe() {
  var A = new O(4);
  return O != Float32Array && (A[0] = 0, A[1] = 0, A[2] = 0, A[3] = 0), A;
}
function bA(A, t, n, o) {
  var h = new O(4);
  return h[0] = A, h[1] = t, h[2] = n, h[3] = o, h;
}
function Je(A, t) {
  var n = t[0], o = t[1], h = t[2], f = t[3], d = n * n + o * o + h * h + f * f;
  return d > 0 && (d = 1 / Math.sqrt(d)), A[0] = n * d, A[1] = o * d, A[2] = h * d, A[3] = f * d, A;
}
function Ne(A, t, n) {
  var o = t[0], h = t[1], f = t[2], d = n[0], c = n[1], C = n[2], a = n[3], e = a * o + c * f - C * h, i = a * h + C * o - d * f, v = a * f + d * h - c * o, l = -d * o - c * h - C * f;
  return A[0] = e * a + l * -d + i * -C - v * -c, A[1] = i * a + l * -c + v * -d - e * -C, A[2] = v * a + l * -C + e * -c - i * -d, A[3] = t[3], A;
}
(function() {
  var A = Pe();
  return function(t, n, o, h, f, d) {
    var c, C;
    for (n || (n = 4), o || (o = 0), h ? C = Math.min(h * n + o, t.length) : C = t.length, c = o; c < C; c += n)
      A[0] = t[c], A[1] = t[c + 1], A[2] = t[c + 2], A[3] = t[c + 3], f(A, A, d), t[c] = A[0], t[c + 1] = A[1], t[c + 2] = A[2], t[c + 3] = A[3];
    return t;
  };
})();
function uA() {
  var A = new O(4);
  return O != Float32Array && (A[0] = 0, A[1] = 0, A[2] = 0), A[3] = 1, A;
}
function He(A, t, n) {
  n = n * 0.5;
  var o = Math.sin(n);
  return A[0] = o * t[0], A[1] = o * t[1], A[2] = o * t[2], A[3] = Math.cos(n), A;
}
function nA(A, t, n, o) {
  var h = t[0], f = t[1], d = t[2], c = t[3], C = n[0], a = n[1], e = n[2], i = n[3], v, l, s, I, m;
  return l = h * C + f * a + d * e + c * i, l < 0 && (l = -l, C = -C, a = -a, e = -e, i = -i), 1 - l > Ke ? (v = Math.acos(l), s = Math.sin(v), I = Math.sin((1 - o) * v) / s, m = Math.sin(o * v) / s) : (I = 1 - o, m = o), A[0] = I * h + m * C, A[1] = I * f + m * a, A[2] = I * d + m * e, A[3] = I * c + m * i, A;
}
function je(A, t) {
  var n = t[0] + t[4] + t[8], o;
  if (n > 0)
    o = Math.sqrt(n + 1), A[3] = 0.5 * o, o = 0.5 / o, A[0] = (t[5] - t[7]) * o, A[1] = (t[6] - t[2]) * o, A[2] = (t[1] - t[3]) * o;
  else {
    var h = 0;
    t[4] > t[0] && (h = 1), t[8] > t[h * 3 + h] && (h = 2);
    var f = (h + 1) % 3, d = (h + 2) % 3;
    o = Math.sqrt(t[h * 3 + h] - t[f * 3 + f] - t[d * 3 + d] + 1), A[h] = 0.5 * o, o = 0.5 / o, A[3] = (t[f * 3 + d] - t[d * 3 + f]) * o, A[f] = (t[f * 3 + h] + t[h * 3 + f]) * o, A[d] = (t[d * 3 + h] + t[h * 3 + d]) * o;
  }
  return A;
}
var rA = bA, BA = Je;
(function() {
  var A = N(), t = gA(1, 0, 0), n = gA(0, 1, 0);
  return function(o, h, f) {
    var d = Ze(h, f);
    return d < -0.999999 ? (sA(A, t, h), Ge(A) < 1e-6 && sA(A, n, h), xe(A, A), He(o, A, Math.PI), o) : d > 0.999999 ? (o[0] = 0, o[1] = 0, o[2] = 0, o[3] = 1, o) : (sA(A, h, f), o[0] = A[0], o[1] = A[1], o[2] = A[2], o[3] = 1 + d, BA(o, o));
  };
})();
(function() {
  var A = uA(), t = uA();
  return function(n, o, h, f, d, c) {
    return nA(A, o, d, c), nA(t, h, f, c), nA(n, A, t, 2 * c * (1 - c)), n;
  };
})();
(function() {
  var A = Ue();
  return function(t, n, o, h) {
    return A[0] = o[0], A[3] = o[1], A[6] = o[2], A[1] = h[0], A[4] = h[1], A[7] = h[2], A[2] = -n[0], A[5] = -n[1], A[8] = -n[2], BA(t, je(t, A));
  };
})();
function Te(A, t) {
  var f;
  let n = Math.min(A.width / t.width, A.height / t.height), o = (A.width - t.width * n) / 2, h = (A.height - t.height * n) / 2;
  (f = A.getContext("2d")) == null || f.drawImage(
    t,
    0,
    0,
    t.width,
    t.height,
    o,
    h,
    t.width * n,
    t.height * n
  );
}
function qe(A, t, n, o, h) {
  const f = j(), d = Y(
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
  ), c = Y(
    n[0],
    n[3],
    n[6],
    0,
    n[1],
    n[4],
    n[7],
    0,
    n[2],
    n[5],
    n[8],
    0,
    0,
    0,
    0,
    1
  );
  W(f, c, d);
  const C = Y(
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
    o[0],
    o[1],
    o[2],
    1
  );
  W(f, C, f), W(f, h, f);
  const a = t[0], e = Y(
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
    1 / a,
    0,
    0,
    0,
    0
  );
  W(f, e, f);
  const i = Y(
    A,
    0,
    0,
    0,
    0,
    A,
    0,
    0,
    0,
    0,
    A,
    0,
    t[2] * A,
    t[5] * A,
    0,
    1
  );
  return W(f, i, f), f;
}
const Le = {
  constraints: {
    audio: !1,
    video: { facingMode: "environment" }
  }
};
class Ye {
  constructor(t, n) {
    E(this, "session");
    E(this, "options");
    E(this, "paused", !1);
    E(this, "mediaStream");
    E(this, "track");
    E(this, "videoElement");
    E(this, "imageCapture");
    E(this, "feedStatus", {});
    E(this, "animationFrameRequest");
    this.session = t, this.options = { ...Le, ...n }, this.videoElement = document.createElement("video");
  }
  async init() {
    (!navigator.mediaDevices || !ImageCapture) && (this.feedStatus = {
      error: "mediaDevices and/or ImageCapture API not supported!"
    });
  }
  loadCamera() {
    let t = window.localStorage.getItem(
      `vuexr/${this.session.name}/camera`
    );
    return t ? (t = JSON.parse(t), t) : null;
  }
  storeCamera() {
    return this.feedStatus.selected ? (window.localStorage.setItem(
      `vuexr/${this.session.name}/camera`,
      JSON.stringify(this.feedStatus.selected)
    ), !0) : !1;
  }
  stop() {
    var t;
    this.mediaStream && (this.animationFrameRequest !== void 0 && window.cancelAnimationFrame(this.animationFrameRequest), (t = this.track) == null || t.stop(), this.track = void 0, this.mediaStream = void 0, this.imageCapture = void 0);
  }
  async selectCamera(t) {
    this.feedStatus.selected !== t && (this.stop(), this.feedStatus.selected = t, this.storeCamera(), this.session.calibration.resetCalibrationPoints(), await this.run(), this.session.updateStatus());
  }
  async listAvailable() {
    return navigator.mediaDevices && ImageCapture ? (await navigator.mediaDevices.enumerateDevices()).filter((n) => n.kind === "videoinput") : [];
  }
  async run() {
    try {
      this.feedStatus.selected ? this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: this.feedStatus.selected }
      }) : this.mediaStream = await navigator.mediaDevices.getUserMedia(
        this.options.constraints
      ), this.track = this.mediaStream.getVideoTracks()[0], this.feedStatus.selected = this.track.getSettings().deviceId, this.storeCamera();
      const t = await this.listAvailable(), n = this.loadCamera();
      this.feedStatus = {
        available: t,
        selected: n ?? void 0
      }, this.session.calibration.loadCameraCalibration(), this.session.updateStatus(), this.imageCapture = new ImageCapture(this.track), this.videoElement.srcObject = this.mediaStream, await new Promise((o, h) => {
        this.videoElement.onloadedmetadata = (f) => {
          this.videoElement.play(), this.session.canvas && (this.session.canvas.width = this.videoElement.videoWidth, this.session.canvas.height = this.videoElement.videoHeight), this.loop(), o();
        };
      });
    } catch (t) {
      console.log(t);
    }
  }
  async loop() {
    if (this.imageCapture)
      try {
        const t = await this.imageCapture.grabFrame();
        this.session.canvas && Te(this.session.canvas, t), this.session.process();
      } catch {
      } finally {
        this.paused || (this.animationFrameRequest = window.requestAnimationFrame(() => {
          this.loop();
        }));
      }
  }
}
class We {
  constructor(t) {
    E(this, "session");
    E(this, "elements", {});
    E(this, "views", []);
    E(this, "trackedMarkers", []);
    this.session = t;
  }
  registerView(t, n) {
    this.views.push({ id: t, callback: n });
  }
  unregisterView(t) {
    this.views = this.views.filter((n) => n.id !== t);
  }
  registerElement(t, n, o, h) {
    this.elements[t] = {
      id: t,
      element: n,
      markerSize: o,
      callback: h,
      lastRMat: j(),
      lastRVec: N(),
      lastTVec: N(),
      tracked: !1
    };
  }
  unregisterElement(t) {
    delete this.elements[t];
  }
  setMarkers(t) {
    for (const h of t)
      this.elements[h.id] && (!this.session.motion.motionStatus.acceleration.error && !this.session.motion.motionStatus.gyro.error ? this.elements[h.id].lastTransform = this.session.motion.getCurrentTransform() : this.elements[h.id].lastTransform = {
        orientation: uA(),
        position: N()
      }, this.elements[h.id].lastRVec = h.rvec, this.elements[h.id].lastTVec = h.tvec, this.elements[h.id].lastRMat = h.rmat, this.elements[h.id].tracked || (this.elements[h.id].tracked = !0, this.elements[h.id].callback(!0)));
    const n = t.map((h) => h.id.toString()), o = Object.keys(this.elements).filter(
      (h) => !n.includes(h)
    );
    for (const h of o)
      this.elements[h].tracked && (this.elements[h].tracked = !1, this.elements[h].callback(!1));
    (this.session.motion.motionStatus.acceleration.error || this.session.motion.motionStatus.gyro.error) && this.readjustElements(), this.trackedMarkers = n, this.views.forEach((h) => h.callback(this.trackedMarkers));
  }
  readjustElements() {
    const t = this.session.canvas.clientWidth / this.session.canvas.width, n = Object.keys(this.elements).map(
      (o) => this.elements[o]
    );
    for (const o of n)
      if (o.lastTransform) {
        const h = this.session.motion.getOffsetMatrix(
          o.lastTransform
        ), f = qe(
          t,
          this.session.calibration.calibration.cameraMatrix,
          o.lastRMat,
          o.lastTVec,
          h
        );
        this.projectElement(o.id, Array.from(f));
      }
  }
  projectElement(t, n) {
    const o = n.map(
      (h) => h.toFixed(5)
    );
    this.elements[t].element.style.transform = `matrix3d(${o.join(
      ","
    )})`;
  }
}
function eA(A) {
  throw new Error('Could not dynamically require "' + A + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var T = {}, _e = {
  get exports() {
    return T;
  },
  set exports(A) {
    T = A;
  }
};
/**
 * @name    fili
 * @version 2.0.3 | December 13th 2018
 * @author  Florian Markert
 * @license MIT
 */
(function(A, t) {
  (function(n) {
    A.exports = n();
  })(function() {
    return function n(o, h, f) {
      function d(a, e) {
        if (!h[a]) {
          if (!o[a]) {
            var i = typeof eA == "function" && eA;
            if (!e && i)
              return i(a, !0);
            if (c)
              return c(a, !0);
            var v = new Error("Cannot find module '" + a + "'");
            throw v.code = "MODULE_NOT_FOUND", v;
          }
          var l = h[a] = { exports: {} };
          o[a][0].call(l.exports, function(s) {
            var I = o[a][1][s];
            return d(I || s);
          }, l, l.exports, n, o, h, f);
        }
        return h[a].exports;
      }
      for (var c = typeof eA == "function" && eA, C = 0; C < f.length; C++)
        d(f[C]);
      return d;
    }({ 1: [function(n, o, h) {
      o.exports = { CalcCascades: n("./src/calcCascades"), Fft: n("./src/fft"), FirCoeffs: n("./src/firCoeffs"), FirFilter: n("./src/firFilter"), IirCoeffs: n("./src/iirCoeffs"), IirFilter: n("./src/iirFilter"), TestFilter: n("./src/testFilter") };
    }, { "./src/calcCascades": 2, "./src/fft": 3, "./src/firCoeffs": 4, "./src/firFilter": 5, "./src/iirCoeffs": 6, "./src/iirFilter": 7, "./src/testFilter": 8 }], 2: [function(n, o, h) {
      var f = n("./iirCoeffs"), d = new f(), c = { bessel: { q: [[0.57735026919], [0.805538281842, 0.521934581669], [1.02331395383, 0.611194546878, 0.510317824749], [1.22566942541, 0.710852074442, 0.559609164796, 0.505991069397], [1.41530886916, 0.809790964842, 0.620470155556, 0.537552151325, 0.503912727276], [1.59465693507, 0.905947107025, 0.684008068137, 0.579367238641, 0.525936202016, 0.502755558204], [1.76552743493, 0.998998442993, 0.747625068271, 0.624777082395, 0.556680772868, 0.519027293158, 0.502045428643], [1.9292718407, 1.08906376917, 0.810410302962, 0.671382379377, 0.591144659703, 0.542678365981, 0.514570953471, 0.501578400482], [2.08691792612, 1.17637337045, 0.872034231424, 0.718163551101, 0.627261751983, 0.569890924765, 0.533371782078, 0.511523796759, 0.50125489338], [2.23926560629, 1.26117120993, 0.932397288146, 0.764647810579, 0.664052481472, 0.598921924986, 0.555480327396, 0.526848630061, 0.509345928377, 0.501021580965], [2.38695091667, 1.34368488961, 0.991497755204, 0.81060830488, 0.701011199665, 0.628878390935, 0.57943181849, 0.545207253735, 0.52208637596, 0.507736060535, 0.500847111042], [2.53048919562, 1.42411783481, 1.04937620183, 0.85593899901, 0.737862159044, 0.659265671705, 0.604435823473, 0.565352679646, 0.537608804383, 0.51849505465, 0.506508536474, 0.500715908905]], f3dB: [[1.27201964951], [1.60335751622, 1.43017155999], [1.9047076123, 1.68916826762, 1.60391912877], [2.18872623053, 1.95319575902, 1.8320926012, 1.77846591177], [2.45062684305, 2.20375262593, 2.06220731793, 1.98055310881, 1.94270419166], [2.69298925084, 2.43912611431, 2.28431825401, 2.18496722634, 2.12472538477, 2.09613322542], [2.91905714471, 2.66069088948, 2.49663434571, 2.38497976939, 2.30961462222, 2.26265746534, 2.24005716132], [3.13149167404, 2.87016099416, 2.69935018044, 2.57862945683, 2.49225505119, 2.43227707449, 2.39427710712, 2.37582307687], [3.33237300564, 3.06908580184, 2.89318259511, 2.76551588399, 2.67073340527, 2.60094950474, 2.55161764546, 2.52001358804, 2.50457164552], [3.52333123464, 3.25877569704, 3.07894353744, 2.94580435024, 2.84438325189, 2.76691082498, 2.70881411245, 2.66724655259, 2.64040228249, 2.62723439989], [3.70566068548, 3.44032173223, 3.2574059854, 3.11986367838, 3.01307175388, 2.92939234605, 2.86428726094, 2.81483068055, 2.77915465405, 2.75596888377, 2.74456638588], [3.88040469682, 3.61463243697, 3.4292654707, 3.28812274966, 3.17689762788, 3.08812364257, 3.01720732972, 2.96140104561, 2.91862858495, 2.88729479473, 2.8674198668, 2.8570800015]], f1dB: [[2.16477559371], [2.70320928596, 2.41122332505], [3.25676581436, 2.88822569572, 2.74246238837], [3.76153580353, 3.35675411406, 3.14862673032, 3.05646412475], [4.22174260104, 3.79644757806, 3.55260471864, 3.41193742197, 3.34673435508], [4.64584812552, 4.20789257981, 3.94082363122, 3.76942681446, 3.66549975744, 3.61617359345], [5.04060395196, 4.5944592201, 4.3111677248, 4.11836351827, 3.98822359814, 3.90713836715, 3.86811234525], [5.41107948467, 4.95951159709, 4.66435804468, 4.45575796102, 4.30650679478, 4.20286750045, 4.13720522991, 4.10531748119], [5.76110791853, 5.30592898465, 5.00182215701, 4.7811081045, 4.61724509926, 4.49660100894, 4.41131378918, 4.35667671372, 4.32997951075], [6.09364309488, 5.63609116014, 5.32506930789, 5.09480346139, 4.91939504255, 4.78540258409, 4.68493280536, 4.61302286993, 4.56661931366, 4.54382759952], [6.41100731543, 5.95195558182, 5.63550073656, 5.39754464742, 5.21278891332, 5.06801430334, 4.95539684456, 4.8697869429, 4.80814951843, 4.76793469612, 4.74828032403], [6.71506056052, 6.25514029778, 5.9343616072, 5.69011422355, 5.49763642361, 5.34401973764, 5.22125973611, 5.12485045619, 5.05037962112, 4.99699982231, 4.96155789635, 4.94441828777]] } }, C = { bessel: { as: [[1.3617], [1.3397, 0.7743], [1.2217, 0.9686, 0.5131], [1.1112, 0.9754, 0.7202, 0.3728], [1.0215, 0.9393, 0.7815, 0.5604, 0.2883]], bs: [[0.618], [0.4889, 0.389], [0.3887, 0.3505, 0.2756], [0.3162, 0.2979, 0.2621, 0.2087], [0.265, 0.2549, 0.2351, 0.2059, 0.1665]] }, butterworth: { as: [[1.4142], [1.8478, 0.7654], [1.9319, 1.4142, 0.5176], [1.9616, 1.6629, 1.1111, 0.3902], [1.9754, 1.782, 1.4142, 0.908, 0.3129]], bs: [[1], [1, 1], [1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1, 1]] }, tschebyscheff05: { as: [[1.3614], [2.6282, 0.3648], [3.8645, 0.7528, 0.1589], [5.1117, 1.0639, 0.3439, 0.0885], [6.3648, 1.3582, 0.4822, 0.1994, 0.0563]], bs: [[1.3827], [3.4341, 1.1509], [6.9797, 1.8573, 1.0711], [11.9607, 2.9365, 1.4206, 1.0407], [18.3695, 4.3453, 1.944, 1.252, 1.0263]] }, tschebyscheff1: { as: [[1.3022], [2.5904, 0.3039], [3.8437, 0.6292, 0.1296], [5.1019, 0.8916, 0.2806, 0.0717], [6.3634, 1.1399, 0.3939, 0.1616, 0.0455]], bs: [[1.5515], [4.1301, 1.1697], [8.5529, 1.9124, 1.0766], [14.7608, 3.0426, 1.4334, 1.0432], [22.7468, 4.5167, 1.9665, 1.2569, 1.0277]] }, tschebyscheff2: { as: [[1.1813], [2.4025, 0.2374], [3.588, 0.4925, 0.0995], [4.7743, 0.6991, 0.2153, 0.0547], [5.9618, 0.8947, 0.3023, 0.1233, 0.0347]], bs: [[1.7775], [4.9862, 1.1896], [10.4648, 1.9622, 1.0826], [18.151, 3.1353, 1.4449, 1.0461], [28.0376, 4.6644, 1.9858, 1.2614, 1.0294]] }, tschebyscheff3: { as: [[1.065], [2.1853, 0.1964], [3.2721, 0.4077, 0.0815], [4.3583, 0.5791, 0.1765, 0.0448], [5.4449, 0.7414, 0.2479, 0.1008, 0.0283]], bs: [[1.9305], [5.5339, 1.2009], [11.6773, 1.9873, 1.0861], [20.2948, 3.1808, 1.4507, 1.0478], [31.3788, 4.7363, 1.9952, 1.2638, 1.0304]] }, allpass: { as: [[1.6278], [2.337, 1.3506], [2.6117, 2.0706, 1.0967], [2.7541, 2.4174, 1.785, 0.9239], [2.8406, 2.612, 2.1733, 1.5583, 0.8018]], bs: [[0.8832], [1.4878, 1.1837], [1.7763, 1.6015, 1.2596], [1.942, 1.83, 1.6101, 1.2822], [2.049, 1.9714, 1.8184, 1.5923, 1.2877]] } }, a = function(l, s) {
        var I = [], m = 0;
        if (s !== "fromPZ")
          for (l.order > 12 && (l.order = 12), m = 0; m < l.order; m++) {
            var u, D, k;
            l.transform === "matchedZ" ? I.push(d.lowpassMZ({ Fs: l.Fs, Fc: l.Fc, preGain: l.preGain, as: C[l.characteristic].as[l.order - 1][m], bs: C[l.characteristic].bs[l.order - 1][m] })) : (l.characteristic === "butterworth" ? (u = 0.5 / Math.sin(Math.PI / (2 * l.order) * (m + 0.5)), D = 1) : (u = c[l.characteristic].q[l.order - 1][m], D = l.oneDb ? c[l.characteristic].f1dB[l.order - 1][m] : c[l.characteristic].f3dB[l.order - 1][m]), k = s === "highpass" ? l.Fc / D : l.Fc * D, s !== "bandpass" && s !== "bandstop" || l.characteristic === "bessel" && (k = Math.sqrt(l.order) * k / l.order), I.push(d[s]({ Fs: l.Fs, Fc: k, Q: u, BW: l.BW || 0, gain: l.gain || 0, preGain: l.preGain || !1 })));
          }
        else
          for (m = 0; m < l.length; m++)
            I.push(d[s](l[m]));
        return I;
      }, e = function(l) {
        return function(s) {
          return a(s, l);
        };
      }, i = {}, v = function() {
        var l = [];
        for (var s in d)
          i[s] = e(s), l.push(s);
        return i.available = function() {
          return l;
        }, i;
      };
      o.exports = v;
    }, { "./iirCoeffs": 6 }], 3: [function(n, o, h) {
      var f = function(d) {
        if (!function(p) {
          return !(p & p - 1);
        }(d))
          return !1;
        var c = {};
        c.length = d, c.buffer = new Float64Array(d), c.re = new Float64Array(d), c.im = new Float64Array(d), c.reI = new Float64Array(d), c.imI = new Float64Array(d), c.twiddle = new Int32Array(d), c.sinTable = new Float64Array(d - 1), c.cosTable = new Float64Array(d - 1);
        var C = 2 * Math.PI, a = Math.floor(Math.log(d) / Math.LN2);
        for (i = c.sinTable.length; i--; )
          c.sinTable[i] = Math.sin(C * (i / d)), c.cosTable[i] = Math.cos(C * (i / d));
        for (var e = d >> 1, i = 0, v = 0; c.twiddle[i] = v, !(++i >= d); ) {
          for (a = e; a <= v; )
            v -= a, a >>= 1;
          v += a;
        }
        var l = Math.PI, s = 2 * Math.PI, I = Math.abs, m = Math.pow, u = Math.cos, D = Math.sin, k = function(p) {
          return D(l * p) / (l * p);
        }, B = Math.E, Q = { rectangular: { calc: function() {
          return 1;
        }, values: [], correction: 1 }, none: { calc: function() {
          return 1;
        }, values: [], correction: 1 }, hanning: { calc: function(p, g) {
          return 0.5 * (1 - u(s * p / (g - 1)));
        }, values: [], correction: 2 }, hamming: { calc: function(p, g) {
          return 0.54 - 0.46 * u(s * p / (g - 1));
        }, values: [], correction: 1.8518999946875638 }, tukery: { calc: function(p, g, r) {
          return p < r * (g - 1) / 2 ? 0.5 * (1 + u(l * (2 * p / (r * (g - 1)) - 1))) : (g - 1) * (1 - r / 2) < p ? 0.5 * (1 + u(l * (2 * p / (r * (g - 1)) - 2 / r + 1))) : 1;
        }, values: [], correction: 4 / 3 }, cosine: { calc: function(p, g) {
          return D(l * p / (g - 1));
        }, values: [], correction: 1.570844266360796 }, lanczos: { calc: function(p, g) {
          return k(2 * p / (g - 1) - 1);
        }, values: [], correction: 1.6964337576195783 }, triangular: { calc: function(p, g) {
          return 2 / (g + 1) * ((g + 1) / 2 - I(p - (g - 1) / 2));
        }, values: [], correction: 2 }, bartlett: { calc: function(p, g) {
          return 2 / (g - 1) * ((g - 1) / 2 - I(p - (g - 1) / 2));
        }, values: [], correction: 2 }, gaussian: { calc: function(p, g, r) {
          return m(B, -0.5 * m((p - (g - 1) / 2) / (r * (g - 1) / 2), 2));
        }, values: [], correction: 5 / 3 }, bartlettHanning: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.62 - 0.48 * I(p / (g - 1) - 0.5) - 0.38 * u(r);
        }, values: [], correction: 2 }, blackman: { calc: function(p, g, r) {
          var V = (1 - r) / 2, w = r / 2, b = s * p / (g - 1);
          return V - 0.5 * u(b) + w * u(2 * b);
        }, values: [], correction: 4 / 3 }, blackmanHarris: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.35875 - 0.48829 * u(r) + 0.14128 * u(2 * r) - 0.01168 * u(3 * r);
        }, values: [], correction: 1.5594508635 }, nuttall3: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.375 - 0.5 * u(r) + 0.125 * u(2 * r);
        }, values: [], correction: 1.56 }, nuttall3a: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.40897 - 0.5 * u(r) + 0.09103 * u(2 * r);
        }, values: [], correction: 1.692 }, nuttall3b: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.4243801 - 0.4973406 * u(r) + 0.078793 * u(2 * r);
        }, values: [], correction: 1.7372527 }, nuttall4: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.3125 - 0.46875 * u(r) + 0.1875 * u(2 * r) - 0.03125 * u(3 * r);
        }, values: [], correction: 1.454543 }, nuttall4a: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.338946 - 0.481973 * u(r) + 0.161054 * u(2 * r) - 0.018027 * u(3 * r);
        }, values: [], correction: 1.512732763 }, nuttall4b: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.355768 - 0.481973 * u(r) + 0.144232 * u(2 * r) - 0.012604 * u(3 * r);
        }, values: [], correction: 1.55223262 }, nuttall4c: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.3635819 - 0.4891775 * u(r) + 0.1365995 * u(2 * r) - 0.0106411 * u(3 * r);
        }, values: [], correction: 1.57129067 }, sft3f: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.26526 - 0.5 * u(r) + 0.23474 * u(2 * r);
        }, values: [], correction: 1.3610238 }, sft4f: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.21706 - 0.42103 * u(r) + 0.28294 * u(2 * r) - 0.07897 * u(3 * r);
        }, values: [], correction: 1.2773573 }, sft5f: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.1881 - 0.36923 * u(r) + 0.28702 * u(2 * r) - 0.13077 * u(3 * r) + 0.02488 * u(4 * r);
        }, values: [], correction: 1.23167769 }, sft3m: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.28235 - 0.52105 * u(r) + 0.19659 * u(2 * r);
        }, values: [], correction: 1.39343451 }, sft4m: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.241906 - 0.460841 * u(r) + 0.2552381 * u(2 * r) - 0.041872 * u(3 * r);
        }, values: [], correction: 1.3190596 }, sft5m: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.209671 - 0.407331 * u(r) + 0.281225 * u(2 * r) - 0.092669 * u(3 * r) + 91036e-7 * u(4 * r);
        }, values: [], correction: 1.26529456464 }, nift: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return 0.2810639 - 0.5208972 * u(r) + 0.1980399 * u(2 * r);
        }, values: [], correction: 1.39094182 }, hpft: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return (1 - 1.912510941 * u(r) + 1.079173272 * u(2 * r) - 0.1832630879 * u(3 * r)) / g;
        }, values: [], correction: 1 }, srft: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return (1 - 1.93 * u(r) + 1.29 * u(2 * r) - 0.388 * u(3 * r) + 0.028 * u(4 * r)) / g;
        }, values: [], correction: 1 }, hft70: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return (1 - 1.90796 * u(r) + 1.07349 * u(2 * r) - 0.18199 * u(3 * r)) / g;
        }, values: [], correction: 1 }, hft95: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return (1 - 1.9383379 * u(r) + 1.3045202 * u(2 * r) - 0.402827 * u(3 * r) + 0.0350665 * u(4 * r)) / g;
        }, values: [], correction: 1 }, hft90d: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return (1 - 1.942604 * u(r) + 1.340318 * u(2 * r) - 0.440811 * u(3 * r) + 0.043097 * u(4 * r)) / g;
        }, values: [], correction: 1 }, hft116d: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return (1 - 1.9575375 * u(r) + 1.4780705 * u(2 * r) - 0.6367431 * u(3 * r) + 0.1228389 * u(4 * r) - 66288e-7 * u(5 * r)) / g;
        }, values: [], correction: 1 }, hft144d: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return (1 - 1.96760033 * u(r) + 1.57983607 * u(2 * r) - 0.81123644 * u(3 * r) + 0.22583558 * u(4 * r) - 0.02773848 * u(5 * r) + 9036e-7 * u(6 * r)) / g;
        }, values: [], correction: 1 }, hft196d: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return (1 - 1.97441842 * u(r) + 1.65409888 * u(2 * r) - 0.95788186 * u(3 * r) + 0.3367342 * u(4 * r) - 0.06364621 * u(5 * r) + 521942e-8 * u(6 * r) - 10599e-8 * u(7 * r)) / g;
        }, values: [], correction: 1 }, hft223d: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return (1 - 1.98298997309 * u(r) + 1.75556083063 * u(2 * r) - 1.19037717712 * u(3 * r) + 0.56155440797 * u(4 * r) - 0.17296769663 * u(5 * r) + 0.03233247087 * u(6 * r) - 0.00324954578 * u(7 * r) + 1380104e-10 * u(8 * r) - 132725e-11 * u(9 * r)) / g;
        }, values: [], correction: 1 }, hft248d: { calc: function(p, g) {
          var r = s * p / (g - 1);
          return (1 - 1.985844164102 * u(r) + 1.791176438506 * u(2 * r) - 1.282075284005 * u(3 * r) + 0.667777530266 * u(4 * r) - 0.240160796576 * u(5 * r) + 0.056656381764 * u(6 * r) - 0.008134974479 * u(7 * r) + 62454465e-11 * u(8 * r) - 19808998e-12 * u(9 * r) + 132974e-12 * u(10 * r)) / g;
        }, values: [], correction: 1 } }, M = function(p) {
          return Q[p.name].values.length !== p.N ? (p.n === 0 && (Q[p.name].values.length = 0), Q[p.name].values[p.n] = Q[p.name].correction * Q[p.name].calc(p.n, p.N, p.a), Q[p.name].values[p.n]) : Q[p.name].values;
        };
        return { forward: function(p, g) {
          var r, V, w, b, y, F, X, z, x, U, Z, H;
          w = c.buffer.length;
          var iA = { name: g, N: w, a: 0.5, n: 0 }, dA = M(iA);
          if (typeof dA == "number")
            for (r = 0; r < w; ++r)
              iA.n = r, c.buffer[r] = p[r] * M(iA);
          else
            for (r = 0; r < w; ++r)
              c.buffer[r] = p[r] * dA[r];
          for (r = w; r--; )
            c.re[r] = c.buffer[c.twiddle[r]], c.im[r] = 0;
          for (b = 1; b < w; b = y)
            for (F = 0, y = b + b, X = w / y, V = 0; V < b; V++) {
              for (z = c.cosTable[F], x = c.sinTable[F], r = V; r < w; r += y)
                U = r + b, Z = x * c.im[U] + z * c.re[U], H = z * c.im[U] - x * c.re[U], c.re[U] = c.re[r] - Z, c.re[r] += Z, c.im[U] = c.im[r] - H, c.im[r] += H;
              F += X;
            }
          return { re: c.re, im: c.im };
        }, inverse: function(p, g) {
          var r, V, w, b, y, F, X, z, x, U, Z, H;
          for (w = p.length, r = w; r--; )
            V = c.twiddle[r], c.reI[r] = p[V], c.imI[r] = -g[V];
          for (b = 1; b < w; b = y)
            for (F = 0, y = b + b, X = w / y, V = 0; V < b; V++) {
              for (z = c.cosTable[F], x = c.sinTable[F], r = V; r < w; r += y)
                U = r + b, Z = x * c.imI[U] + z * c.reI[U], H = z * c.imI[U] - x * c.reI[U], c.reI[U] = c.reI[r] - Z, c.reI[r] += Z, c.imI[U] = c.imI[r] - H, c.imI[r] += H;
              F += X;
            }
          for (r = w; r--; )
            c.buffer[r] = c.reI[r] / w;
          return c.buffer;
        }, magnitude: function(p) {
          for (var g = [], r = 0; r < p.re.length; r++)
            g.push(Math.sqrt(p.re[r] * p.re[r] + p.im[r] * p.im[r]));
          return g;
        }, magToDb: function(p) {
          for (var g = [], r = 0; r < p.length; r++)
            g.push(20 * Math.log(p[r]) * Math.LOG10E);
          return g;
        }, phase: function(p) {
          for (var g = [], r = 0; r < p.re.length; r++)
            g.push(Math.atan2(p.im[r], p.re[r]));
          return g;
        }, windows: function() {
          var p = [];
          for (var g in Q)
            p.push(g);
          return p;
        } };
      };
      o.exports = f;
    }, {}], 4: [function(n, o, h) {
      var f = function() {
        var d = function(e) {
          var i = e.Fs, v = e.Fa, l = e.Fb, s = e.order || 51, I = e.Att || 100, m = function(p) {
            for (var g = 0, r = 1, V = 1; r > 1e-6 * V; )
              g += 2, r *= p * p / (g * g), V += r;
            return V;
          };
          s / 2 - Math.floor(s / 2) == 0 && s++;
          var u, D = (s - 1) / 2, k = [], B = 0, Q = 0, M = [];
          for (k[0] = 2 * (l - v) / i, Q = 1; Q <= D; Q++)
            k[Q] = (Math.sin(2 * Q * Math.PI * l / i) - Math.sin(2 * Q * Math.PI * v / i)) / (Q * Math.PI);
          for (B = I < 21 ? 0 : I > 50 ? 0.1102 * (I - 8.7) : 0.5842 * Math.pow(I - 21, 0.4) + 0.07886 * (I - 21), u = m(B), Q = 0; Q <= D; Q++)
            M[D + Q] = k[Q] * m(B * Math.sqrt(1 - Q * Q / (D * D))) / u;
          for (Q = 0; Q < D; Q++)
            M[Q] = M[s - 1 - Q];
          return M;
        }, c = function(e) {
          var i = e.Fs, v = e.Fc, l = e.order, s = 2 * Math.PI * v / i, I = 0, m = 0, u = [];
          for (I = 0; I <= l; I++)
            I - l / 2 == 0 ? u[I] = s : (u[I] = Math.sin(s * (I - l / 2)) / (I - l / 2), u[I] *= 0.54 - 0.46 * Math.cos(2 * Math.PI * I / l)), m += u[I];
          for (I = 0; I <= l; I++)
            u[I] /= m;
          return u;
        }, C = function(e) {
          var i;
          for (i = 0; i < e.length; i++)
            e[i] = -e[i];
          return e[(e.length - 1) / 2]++, e;
        }, a = function(e) {
          for (var i = c({ order: e.order, Fs: e.Fs, Fc: e.F2 }), v = C(c({ order: e.order, Fs: e.Fs, Fc: e.F1 })), l = [], s = 0; s < i.length; s++)
            l.push(i[s] + v[s]);
          return l;
        };
        return { lowpass: function(e) {
          return c(e);
        }, highpass: function(e) {
          return C(c(e));
        }, bandstop: function(e) {
          return a(e);
        }, bandpass: function(e) {
          return C(a(e));
        }, kbFilter: function(e) {
          return d(e);
        }, available: function() {
          return ["lowpass", "highpass", "bandstop", "bandpass", "kbFilter"];
        } };
      };
      o.exports = f;
    }, {}], 5: [function(n, o, h) {
      var f = n("./utils"), d = f.runMultiFilter, c = f.runMultiFilterReverse, C = f.complex, a = f.evaluatePhase, e = function(i) {
        var v = i, l = [], s = 0;
        for (s = 0; s < v.length; s++)
          l[s] = { re: v[s], im: 0 };
        var I = function(B) {
          var Q, M = [];
          for (Q = 0; Q < B; Q++)
            M.push(0);
          return { buf: M, pointer: 0 };
        }, m = I(v.length - 1), u = function(B, Q) {
          Q.buf[Q.pointer] = B;
          var M = 0;
          for (s = 0; s < Q.buf.length; s++)
            M += v[s] * Q.buf[(Q.pointer + s) % Q.buf.length];
          return Q.pointer = (Q.pointer + 1) % Q.buf.length, M;
        }, D = function(B) {
          var Q = I(v.length - 1);
          return d(B, Q, u);
        }, k = function(B) {
          for (var Q = B.Fs, M = B.Fr, p = -Math.PI * (M / Q) * 2, g = { re: 0, im: 0 }, r = 0; r < v.length - 1; r++)
            g = C.add(g, C.mul(l[r], { re: Math.cos(p * r), im: Math.sin(p * r) }));
          var V = C.magnitude(g);
          return { magnitude: V, phase: C.phase(g), dBmagnitude: 20 * Math.log(V) * Math.LOG10E };
        };
        return { responsePoint: function(B) {
          return k(B);
        }, response: function(B) {
          B = B || 100;
          var Q = [], M = 0, p = 2 * B;
          for (M = 0; M < B; M++)
            Q[M] = k({ Fs: p, Fr: M });
          return a(Q), Q;
        }, simulate: function(B) {
          return D(B);
        }, singleStep: function(B) {
          return u(B, m);
        }, multiStep: function(B, Q) {
          return d(B, m, u, Q);
        }, filtfilt: function(B, Q) {
          return c(d(B, m, u, Q), m, u, !0);
        }, reinit: function() {
          m = I(v.length - 1);
        } };
      };
      o.exports = e;
    }, { "./utils": 9 }], 6: [function(n, o, h) {
      var f = function() {
        var d = function(a, e) {
          var i = a.Q, v = a.Fc, l = a.Fs, s = {}, I = 2 * Math.PI * v / l;
          return a.BW ? s.alpha = Math.sin(I) * Math.sinh(Math.log(2) / 2 * a.BW * I / Math.sin(I)) : s.alpha = Math.sin(I) / (2 * i), s.cw = Math.cos(I), s.a0 = 1 + s.alpha, e.a0 = s.a0, e.a.push(-2 * s.cw / s.a0), e.k = 1, e.a.push((1 - s.alpha) / s.a0), s;
        }, c = function(a) {
          var e = a.Q, i = a.Fc, v = a.Fs, l = {}, s = 2 * Math.PI * i / v;
          return l.alpha = Math.sin(s) / (2 * e), l.cw = Math.cos(s), l.A = Math.pow(10, a.gain / 40), l;
        }, C = function() {
          var a = {};
          return a.z = [0, 0], a.a = [], a.b = [], a;
        };
        return { fromPZ: function(a) {
          var e = C();
          return e.a0 = 1, e.b.push(1), e.b.push(-a.z0.re - a.z1.re), e.b.push(a.z0.re * a.z1.re - a.z0.im * a.z1.im), e.a.push(-a.p0.re - a.p1.re), e.a.push(a.p0.re * a.p1.re - a.p0.im * a.p1.im), a.type === "lowpass" ? e.k = (1 + e.a[0] + e.a[1]) / (1 + e.b[1] + e.b[2]) : e.k = (1 - e.a[0] + e.a[1]) / (1 - e.b[1] + e.b[2]), e;
        }, lowpassMZ: function(a) {
          var e = C();
          e.a0 = 1;
          var i = a.as, v = a.bs, l = 2 * Math.PI * a.Fc / a.Fs, s = -i / (2 * v);
          return e.a.push(2 * -Math.pow(Math.E, s * l) * Math.cos(-l * Math.sqrt(Math.abs(Math.pow(i, 2) / (4 * Math.pow(v, 2)) - 1 / v)))), e.a.push(Math.pow(Math.E, 2 * s * l)), a.preGain ? (e.b.push(1), e.k = e.a0 + e.a[0] + e.a[1]) : (e.b.push(e.a0 + e.a[0] + e.a[1]), e.k = 1), e.b.push(0), e.b.push(0), e;
        }, lowpassBT: function(a) {
          var e = C();
          return a.Q = 1, e.wp = Math.tan(2 * Math.PI * a.Fc / (2 * a.Fs)), e.wp2 = e.wp * e.wp, a.BW && delete a.BW, e.k = 1, e.a0 = 3 * e.wp + 3 * e.wp2 + 1, e.b.push(3 * e.wp2 * a.Q / e.a0), e.b.push(2 * e.b[0]), e.b.push(e.b[0]), e.a.push((6 * e.wp2 - 2) / e.a0), e.a.push((3 * e.wp2 - 3 * e.wp + 1) / e.a0), e;
        }, highpassBT: function(a) {
          var e = C();
          return a.Q = 1, e.wp = Math.tan(2 * Math.PI * a.Fc / (2 * a.Fs)), e.wp2 = e.wp * e.wp, a.BW && delete a.BW, e.k = 1, e.a0 = e.wp + e.wp2 + 3, e.b.push(3 * a.Q / e.a0), e.b.push(2 * e.b[0]), e.b.push(e.b[0]), e.a.push((2 * e.wp2 - 6) / e.a0), e.a.push((e.wp2 - e.wp + 3) / e.a0), e;
        }, lowpass: function(a) {
          var e = C();
          a.BW && delete a.BW;
          var i = d(a, e);
          return a.preGain ? (e.k = 0.5 * (1 - i.cw), e.b.push(1 / i.a0)) : (e.k = 1, e.b.push((1 - i.cw) / (2 * i.a0))), e.b.push(2 * e.b[0]), e.b.push(e.b[0]), e;
        }, highpass: function(a) {
          var e = C();
          a.BW && delete a.BW;
          var i = d(a, e);
          return a.preGain ? (e.k = 0.5 * (1 + i.cw), e.b.push(1 / i.a0)) : (e.k = 1, e.b.push((1 + i.cw) / (2 * i.a0))), e.b.push(-2 * e.b[0]), e.b.push(e.b[0]), e;
        }, allpass: function(a) {
          var e = C();
          a.BW && delete a.BW;
          var i = d(a, e);
          return e.k = 1, e.b.push((1 - i.alpha) / i.a0), e.b.push(-2 * i.cw / i.a0), e.b.push((1 + i.alpha) / i.a0), e;
        }, bandpassQ: function(a) {
          var e = C(), i = d(a, e);
          return e.k = 1, e.b.push(i.alpha * a.Q / i.a0), e.b.push(0), e.b.push(-e.b[0]), e;
        }, bandpass: function(a) {
          var e = C(), i = d(a, e);
          return e.k = 1, e.b.push(i.alpha / i.a0), e.b.push(0), e.b.push(-e.b[0]), e;
        }, bandstop: function(a) {
          var e = C(), i = d(a, e);
          return e.k = 1, e.b.push(1 / i.a0), e.b.push(-2 * i.cw / i.a0), e.b.push(e.b[0]), e;
        }, peak: function(a) {
          var e = C(), i = c(a);
          return e.k = 1, e.a0 = 1 + i.alpha / i.A, e.a.push(-2 * i.cw / e.a0), e.a.push((1 - i.alpha / i.A) / e.a0), e.b.push((1 + i.alpha * i.A) / e.a0), e.b.push(-2 * i.cw / e.a0), e.b.push((1 - i.alpha * i.A) / e.a0), e;
        }, lowshelf: function(a) {
          var e = C();
          a.BW && delete a.BW;
          var i = c(a);
          e.k = 1;
          var v = 2 * Math.sqrt(i.A) * i.alpha;
          return e.a0 = i.A + 1 + (i.A - 1) * i.cw + v, e.a.push(-2 * (i.A - 1 + (i.A + 1) * i.cw) / e.a0), e.a.push((i.A + 1 + (i.A - 1) * i.cw - v) / e.a0), e.b.push(i.A * (i.A + 1 - (i.A - 1) * i.cw + v) / e.a0), e.b.push(2 * i.A * (i.A - 1 - (i.A + 1) * i.cw) / e.a0), e.b.push(i.A * (i.A + 1 - (i.A - 1) * i.cw - v) / e.a0), e;
        }, highshelf: function(a) {
          var e = C();
          a.BW && delete a.BW;
          var i = c(a);
          e.k = 1;
          var v = 2 * Math.sqrt(i.A) * i.alpha;
          return e.a0 = i.A + 1 - (i.A - 1) * i.cw + v, e.a.push(2 * (i.A - 1 - (i.A + 1) * i.cw) / e.a0), e.a.push((i.A + 1 - (i.A - 1) * i.cw - v) / e.a0), e.b.push(i.A * (i.A + 1 + (i.A - 1) * i.cw + v) / e.a0), e.b.push(-2 * i.A * (i.A - 1 + (i.A + 1) * i.cw) / e.a0), e.b.push(i.A * (i.A + 1 + (i.A - 1) * i.cw - v) / e.a0), e;
        }, aweighting: function(a) {
          var e = C();
          e.k = 1;
          var i = 2 * Math.PI * a.Fc / a.Fs, v = 2 * Math.tan(i / 2), l = a.Q, s = Math.pow(v, 2);
          return e.a0 = 4 * l + s * l + 2 * v, e.a.push(2 * s * l - 8 * l), e.a.push(4 * l + s * l - 2 * v), e.b.push(s * l), e.b.push(2 * s * l), e.b.push(s * l), e;
        } };
      };
      o.exports = f;
    }, {}], 7: [function(n, o, h) {
      var f = n("./utils"), d = f.complex, c = f.runMultiFilter, C = f.runMultiFilterReverse, a = f.evaluatePhase, e = function(i) {
        for (var v = i, l = { re: 1, im: 0 }, s = [], I = [], m = 0; m < v.length; m++) {
          s[m] = {};
          var u = v[m];
          s[m].b0 = { re: u.b[0], im: 0 }, s[m].b1 = { re: u.b[1], im: 0 }, s[m].b2 = { re: u.b[2], im: 0 }, s[m].a1 = { re: u.a[0], im: 0 }, s[m].a2 = { re: u.a[1], im: 0 }, s[m].k = { re: u.k, im: 0 }, s[m].z = [0, 0], I[m] = {}, I[m].b1 = u.b[1] / u.b[0], I[m].b2 = u.b[2] / u.b[0], I[m].a1 = u.a[0], I[m].a2 = u.a[1];
        }
        var D = function(w, b) {
          var y = b * w.k.re - w.a1.re * w.z[0] - w.a2.re * w.z[1], F = w.b0.re * y + w.b1.re * w.z[0] + w.b2.re * w.z[1];
          return w.z[1] = w.z[0], w.z[0] = y, F;
        }, k = function(w, b) {
          var y = w, F = 0;
          for (F = 0; F < b.length; F++)
            y = D(b[F], y);
          return y;
        }, B = function(w, b) {
          var y = w.Fs, F = w.Fr, X = -Math.PI * (F / y) * 2, z = { re: Math.cos(X), im: Math.sin(X) }, x = d.mul(b.k, d.add(b.b0, d.mul(z, d.add(b.b1, d.mul(b.b2, z))))), U = d.add(l, d.mul(z, d.add(b.a1, d.mul(b.a2, z)))), Z = d.div(x, U);
          return { magnitude: d.magnitude(Z), phase: d.phase(Z) };
        }, Q = function(w) {
          var b = 0, y = { magnitude: 1, phase: 0 };
          for (b = 0; b < s.length; b++) {
            var F = B(w, s[b]);
            y.magnitude *= F.magnitude, y.phase += F.phase;
          }
          return y.dBmagnitude = 20 * Math.log(y.magnitude) * Math.LOG10E, y;
        }, M = function() {
          for (var w = [], b = 0; b < v.length; b++)
            w[b] = { b0: { re: u.b[0], im: 0 }, b1: { re: u.b[1], im: 0 }, b2: { re: u.b[2], im: 0 }, a1: { re: u.a[0], im: 0 }, a2: { re: u.a[1], im: 0 }, k: { re: u.k, im: 0 }, z: [0, 0] };
          return w;
        }, p = function(w) {
          var b = M();
          return c(w, b, k);
        }, g = function(w, b) {
          var y = {}, F = [], X = 0;
          for (X = 0; X < b; X++)
            F.push(w(X));
          y.out = p(F);
          var z = !1, x = !1;
          for (X = 0; X < b - 1; X++)
            if (y.out[X] > y.out[X + 1] && !z && (z = !0, y.max = { sample: X, value: y.out[X] }), z && !x && y.out[X] < y.out[X + 1]) {
              x = !0, y.min = { sample: X, value: y.out[X] };
              break;
            }
          return y;
        }, r = function(w, b) {
          var y = Math.pow(w / 2, 2) - b;
          return y < 0 ? [{ re: -w / 2, im: Math.sqrt(Math.abs(y)) }, { re: -w / 2, im: -Math.sqrt(Math.abs(y)) }] : [{ re: -w / 2 + Math.sqrt(y), im: 0 }, { re: -w / 2 - Math.sqrt(y), im: 0 }];
        }, V = function() {
          for (var w = [], b = 0; b < I.length; b++)
            w[b] = {}, w[b].z = r(I[b].b1, I[b].b2), w[b].p = r(I[b].a1, I[b].a2);
          return w;
        };
        return { singleStep: function(w) {
          return k(w, s);
        }, multiStep: function(w, b) {
          return c(w, s, k, b);
        }, filtfilt: function(w, b) {
          return C(c(w, s, k, b), s, k, !0);
        }, simulate: function(w) {
          return p(w);
        }, stepResponse: function(w) {
          return g(function() {
            return 1;
          }, w);
        }, impulseResponse: function(w) {
          return g(function(b) {
            return b === 0 ? 1 : 0;
          }, w);
        }, responsePoint: function(w) {
          return Q(w);
        }, response: function(w) {
          w = w || 100;
          var b = [], y = 0, F = 2 * w;
          for (y = 0; y < w; y++)
            b[y] = Q({ Fs: F, Fr: y });
          return a(b), b;
        }, polesZeros: function() {
          return V();
        }, reinit: function() {
          for (m = 0; m < s.length; m++)
            s[m].z = [0, 0];
        } };
      };
      o.exports = e;
    }, { "./utils": 9 }], 8: [function(n, o, h) {
      var f = function(d) {
        var c, C = d, a = [], e = function(s) {
          for (c = 0; c < s.steps; c++)
            a.push(C.singleStep((Math.random() - 0.5) * s.pp + s.offset));
        }, i = function(s) {
          var I = s.offset + s.pp, m = s.offset - s.pp;
          for (c = 0; c < s.steps; c++)
            c % 200 < 100 ? a.push(C.singleStep(I)) : a.push(C.singleStep(m));
        }, v = function(s) {
          var I = s.offset + s.pp, m = s.offset - s.pp;
          for (c = 0; c < s.steps; c++)
            c % 100 == 0 ? a.push(C.singleStep(I)) : a.push(C.singleStep(m));
        }, l = function(s) {
          var I = s.offset + s.pp, m = s.offset - s.pp, u = m, D = (I - m) / 100;
          for (c = 0; c < s.steps; c++)
            c % 200 < 100 ? u += D : u -= D, a.push(C.singleStep(u));
        };
        return { randomStability: function(s) {
          for (C.reinit(), a.length = 0, e(s), c = s.setup; c < a.length; c++)
            if (a[c] > s.maxStable || a[c] < s.minStable)
              return a[c];
          return !0;
        }, directedRandomStability: function(s) {
          C.reinit(), a.length = 0;
          var I;
          for (I = 0; I < s.tests; I++) {
            var m = Math.random();
            m < 0.25 ? e(s) : m < 0.5 ? i(s) : m < 0.75 ? v(s) : l(s);
          }
          for (e(s), c = s.setup; c < a.length; c++)
            if (a[c] > s.maxStable || a[c] < s.minStable)
              return a[c];
          return !0;
        }, evaluateBehavior: function() {
        } };
      };
      o.exports = f;
    }, {}], 9: [function(n, o, h) {
      h.evaluatePhase = function(a) {
        var e = 0, i = 0, v = Math.PI, l = 2 * v, s = [];
        for (i = 0; i < a.length; i++)
          s.push(a[i].phase);
        for (a[0].unwrappedPhase = a[0].phase, a[0].groupDelay = 0, i = 1; i < s.length; i++) {
          var I = s[i] - s[i - 1];
          if (I > v)
            for (e = i; e < s.length; e++)
              s[e] -= l;
          else if (I < -v)
            for (e = i; e < s.length; e++)
              s[e] += l;
          s[i] < 0 ? a[i].unwrappedPhase = -s[i] : a[i].unwrappedPhase = s[i], a[i].phaseDelay = a[i].unwrappedPhase / (i / a.length), a[i].groupDelay = (a[i].unwrappedPhase - a[i - 1].unwrappedPhase) / (v / a.length), a[i].groupDelay < 0 && (a[i].groupDelay = -a[i].groupDelay);
        }
        a[0].magnitude !== 0 ? (a[0].phaseDelay = a[1].phaseDelay, a[0].groupDelay = a[1].groupDelay) : (a[0].phaseDelay = a[2].phaseDelay, a[0].groupDelay = a[2].groupDelay, a[1].phaseDelay = a[2].phaseDelay, a[1].groupDelay = a[2].groupDelay);
      }, h.runMultiFilter = function(a, e, i, v) {
        var l = [];
        v && (l = a);
        var s;
        for (s = 0; s < a.length; s++)
          l[s] = i(a[s], e);
        return l;
      }, h.runMultiFilterReverse = function(a, e, i, v) {
        var l = [];
        v && (l = a);
        var s;
        for (s = a.length - 1; s >= 0; s--)
          l[s] = i(a[s], e);
        return l;
      };
      var f = function(a, e) {
        for (var i = !0; i; ) {
          var v = a, l = e;
          if (i = !1, l || (l = 1), v !== Math.floor(v) || l !== Math.floor(l))
            return 1;
          if (v === 0 || v === 1)
            return l;
          a = v - 1, e = l * v, i = !0;
        }
      };
      h.besselFactors = function(a) {
        for (var e = [], i = 0; i < a + 1; i++) {
          var v = f(2 * a - i), l = Math.pow(2, a - i) * f(i) * f(a - i);
          e.unshift(Math.floor(v / l));
        }
        return e;
      };
      var d = function(a, e) {
        for (var i = 0, v = 0; v < e; v++) {
          var l = 1 / Math.pow(2, v + 1);
          a > l && (a -= l, i += l);
        }
        return i;
      }, c = function(a, e) {
        return a & Math.pow(2, e);
      }, C = function(a, e, i) {
        var v = Math.abs(a), l = a - v;
        return { number: c(v, e).toString(), fraction: d(l, i).toString(), numberBits: e, fractionBits: i };
      };
      h.fixedPoint = { convert: function(a, e, i) {
        return C(a, e, i);
      }, add: function(a, e) {
      }, sub: function(a, e) {
      }, mul: function(a, e) {
      }, div: function(a, e) {
      } }, h.complex = { div: function(a, e) {
        var i = a.re, v = a.im, l = e.re, s = e.im, I = l * l + s * s;
        return { re: (i * l + v * s) / I, im: (v * l - i * s) / I };
      }, mul: function(a, e) {
        var i = a.re, v = a.im, l = e.re, s = e.im;
        return { re: i * l - v * s, im: (i + v) * (l + s) - i * l - v * s };
      }, add: function(a, e) {
        return { re: a.re + e.re, im: a.im + e.im };
      }, sub: function(a, e) {
        return { re: a.re - e.re, im: a.im - e.im };
      }, phase: function(a) {
        return Math.atan2(a.im, a.re);
      }, magnitude: function(a) {
        return Math.sqrt(a.re * a.re + a.im * a.im);
      } };
    }, {}] }, {}, [1])(1);
  });
})(_e);
const G = 60, oA = 0.95, cA = 0.995;
class $e {
  constructor(t) {
    E(this, "session");
    E(this, "iirFilter");
    E(this, "accelerometerDrift");
    E(this, "velocity");
    E(this, "position");
    E(this, "motionStatus");
    E(this, "accelerometer");
    E(this, "orientationSensor");
    E(this, "orientation");
    this.session = t;
    const o = new T.CalcCascades().lowpass({
      order: 3,
      characteristic: "butterworth",
      Fs: G,
      Fc: 5,
      gain: 0,
      preGain: !1
    });
    this.iirFilter = {
      x: new T.IirFilter(o),
      y: new T.IirFilter(o),
      z: new T.IirFilter(o)
    }, this.accelerometerDrift = N(), this.velocity = N(), this.position = N(), this.motionStatus = {
      acceleration: {
        error: null
      },
      gyro: {
        error: null
      }
    };
  }
  readingHandler(t) {
    var h, f, d, c;
    const n = bA(
      ((h = this.accelerometer) == null ? void 0 : h.x) ?? 0,
      -(((f = this.accelerometer) == null ? void 0 : f.z) ?? 0),
      ((d = this.accelerometer) == null ? void 0 : d.y) ?? 0,
      1
    ), o = ((c = this.orientationSensor) == null ? void 0 : c.quaternion) ?? [0, 0, 0, 1];
    this.orientation = rA(
      o[0],
      o[1],
      o[2],
      o[3]
    ), Ne(n, n, this.orientation), n[0] = this.iirFilter.x.singleStep(n[0]), n[1] = this.iirFilter.y.singleStep(n[1]), n[2] = this.iirFilter.z.singleStep(n[2]), this.velocity[0] += n[0] / G, this.velocity[1] += n[1] / G, this.velocity[2] += n[2] / G, this.position[0] += this.velocity[0] / G * 1e3, this.position[1] += this.velocity[1] / G * 1e3, this.position[2] += this.velocity[2] / G * 1e3, this.velocity[0] *= oA, this.velocity[1] *= oA, this.velocity[2] *= oA, this.position[0] *= cA, this.position[1] *= cA, this.position[2] *= cA, this.session.poser.readjustElements();
  }
  async init() {
    if (LinearAccelerationSensor && RelativeOrientationSensor)
      try {
        this.accelerometer = new LinearAccelerationSensor({
          frequency: G,
          referenceFrame: "screen"
        }), this.accelerometer.addEventListener("error", (t) => {
          var n;
          t.error.name === "NotAllowedError" ? this.motionStatus.acceleration = {
            error: t.error
          } : t.error.name === "NotReadableError" && (this.motionStatus.acceleration = {
            error: t.error
          }), (n = this.accelerometer) == null || n.stop(), this.session.updateStatus();
        }), this.orientationSensor = new RelativeOrientationSensor({
          frequency: G,
          referenceFrame: "screen"
        }), this.orientationSensor.addEventListener("error", (t) => {
          var n;
          t.error.name === "NotAllowedError" ? this.motionStatus.gyro = {
            error: t.error
          } : t.error.name === "NotReadableError" && (this.motionStatus.gyro = {
            error: t.error
          }), (n = this.orientationSensor) == null || n.stop(), this.session.updateStatus();
        }), this.accelerometer.addEventListener("reading", (t) => {
          this.readingHandler(t);
        }), this.run();
      } catch (t) {
        t.name === "SecurityError" ? this.motionStatus = {
          acceleration: {
            error: "Permission denied"
          },
          gyro: {
            error: "Permission denied"
          }
        } : t.name === "ReferenceError" ? this.motionStatus = {
          acceleration: {
            error: "Sensor is not supported by the User Agent."
          },
          gyro: {
            error: "Sensor is not supported by the User Agent."
          }
        } : this.motionStatus = {
          acceleration: {
            error: t
          },
          gyro: {
            error: t
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
  getOffsetMatrix(t) {
    if (!this.motionStatus.acceleration.error && !this.motionStatus.gyro.error) {
      const n = rA(
        t.orientation[0],
        -t.orientation[1],
        -t.orientation[2],
        t.orientation[3]
      ), o = j();
      vA(o, n), pA(
        o,
        o,
        t.position
      );
      const h = rA(
        this.orientation[0],
        -this.orientation[1],
        -this.orientation[2],
        this.orientation[3]
      ), f = j();
      vA(f, h), pA(f, f, this.position), ze(f, f);
      const d = j();
      return wA(
        d,
        f,
        o
      ), d;
    } else
      return j();
  }
  getCurrentTransform() {
    return {
      orientation: this.orientation,
      position: this.position
    };
  }
}
var MA = /* @__PURE__ */ ((A) => (A[A.CALIBRATION = 0] = "CALIBRATION", A[A.DETECTION = 1] = "DETECTION", A))(MA || {}), yA = /* @__PURE__ */ ((A) => (A[A.statusChanged = 0] = "statusChanged", A[A.motion = 1] = "motion", A))(yA || {});
class At {
  constructor(t = "default") {
    E(this, "initialized", !1);
    E(this, "name");
    E(this, "state");
    E(this, "feed");
    E(this, "poser");
    E(this, "motion");
    E(this, "calibration");
    E(this, "detector");
    E(this, "workerInitialized", !1);
    E(this, "eventCallback");
    E(this, "focusEventRegistration");
    E(this, "blurEventRegistration");
    E(this, "setup");
    E(this, "canvas");
    E(this, "context2d");
    E(this, "worker");
    this.initialized = !1, this.name = t, this.state = 0, this.feed = new Ye(this), this.poser = new We(this), this.motion = new $e(this), this.calibration = new Ve(this), this.detector = new Xe(this), this.focusEventRegistration = async () => {
      await this.feed.run(), this.motion.run();
    }, this.blurEventRegistration = () => {
      this.feed.stop(), this.motion.stop();
    }, this.setup = {
      show: !0
    }, this.calibration.loadCameraCalibration();
  }
  updateStatus() {
    const t = {
      initialized: this.initialized,
      feed: this.feed.feedStatus,
      motion: this.motion.motionStatus,
      calibration: this.calibration.calibrationStatus,
      setup: this.setup
    };
    this.eventCallback && this.eventCallback({ name: 0, status: t });
  }
  loadSetup() {
    let t = window.localStorage.getItem(`vuexr/${this.name}/setup`);
    return t ? JSON.parse(t) : {
      show: !0
    };
  }
  storeSetup() {
    window.localStorage.setItem(
      `vuexr/${this.name}/setup`,
      JSON.stringify(this.setup)
    );
  }
  showSetup(t) {
    this.setup.show = t, this.storeSetup(), this.eventCallback && this.eventCallback({
      name: 0
      /* statusChanged */
    });
  }
  async init(t, n) {
    this.setup = this.loadSetup(), this.canvas = t, this.context2d = this.canvas.getContext("2d", { willReadFrequently: !0 }), this.eventCallback = n, this.initialized || (await Promise.all([
      this.feed.init(),
      this.motion.init(),
      this.initWorker()
    ]), this.initialized = !0), this.eventCallback({
      name: 0
      /* statusChanged */
    });
  }
  async initWorker() {
    return new Promise((t, n) => {
      this.worker = new Worker(new URL("/assets/worker-99eb8727.js", self.location), {
        type: "module"
      }), this.worker.onmessage = (o) => {
        o.data.operation === P.WORKER_READY ? (this.initialized = !0, this.workerInitialized = !0, t()) : o.data.operation === P.WORKER_FAILED ? (this.workerInitialized = !0, t()) : this.workerHandler(o);
      };
    });
  }
  workerHandler(t) {
    t.data.operation === P.DETECT ? this.detector.detectionFinished(t.data) : t.data.operation === P.FIND_CHESSBOARD_CORNERS_CAPTURED ? this.calibration.findChessBoardCornersCaptured() : t.data.operation === P.FIND_CHESSBOARD_CORNERS_READY ? this.calibration.findChessBoardCornersCaptureReady() : t.data.operation === P.FIND_CHESSBOARD_CORNERS_NOT_READY ? this.calibration.findChessBoardCornersCaptureNotReady() : t.data.operation === P.CALIBRATE && this.calibration.calibrationFinished(t.data);
  }
  async run() {
    await this.feed.run(), await this.motion.run(), window.addEventListener("focus", this.focusEventRegistration), window.addEventListener("blur", this.blurEventRegistration);
  }
  pause() {
    window.removeEventListener("focus", this.focusEventRegistration), window.removeEventListener("blur", this.blurEventRegistration), this.feed.stop(), this.motion.stop();
  }
  calibrate() {
    var t, n;
    this.calibration.calibrate({
      width: ((t = this.canvas) == null ? void 0 : t.width) ?? 0,
      height: ((n = this.canvas) == null ? void 0 : n.height) ?? 0
    }), this.state = 1;
  }
  resetCalibration() {
    this.calibration.resetCalibrationPoints(), this.calibration.resetCameraCalibration(), this.state = 0;
  }
  process() {
    this.initialized && (this.state === 0 ? this.calibration.findChessBoardCorners() : this.state === 1 && this.detector.detect());
  }
}
const et = { class: "ar-view" }, tt = {
  key: 0,
  class: "controls-container"
}, at = {
  key: 1,
  class: "setup-container"
}, it = {
  key: 2,
  class: "loading-text"
}, st = /* @__PURE__ */ AA({
  __name: "ARView",
  props: {
    name: null
  },
  setup(A) {
    const t = A, o = fA("vuexr").requestSession(t.name);
    OA("session", o);
    const h = mA({
      status: {},
      trackedMarkers: []
    }), f = $(), d = $(), c = Symbol();
    function C() {
      o.showSetup(!1);
    }
    function a() {
      o.showSetup(!0);
    }
    function e(l) {
      l.name === yA.statusChanged && l.status && (h.status = l.status);
    }
    function i() {
      var u, D, k, B;
      const l = (((u = f.value) == null ? void 0 : u.width) ?? 0) / (((D = f.value) == null ? void 0 : D.height) ?? 0), s = ((k = d.value) == null ? void 0 : k.clientWidth) ?? 0, I = ((B = d.value) == null ? void 0 : B.clientHeight) ?? 0, m = s / I;
      if (l >= m) {
        const Q = s, M = s / l;
        f.value && (f.value.style.width = `${Q}px`, f.value.style.height = `${M}px`);
      } else {
        const Q = I * l, M = I;
        f.value && (f.value.style.width = `${Q}px`, f.value.style.height = `${M}px`);
      }
    }
    const v = () => {
      i();
    };
    return hA(async () => {
      await o.init(f.value, (l) => {
        e(l);
      }), o.poser.registerView(c, (l) => {
        h.trackedMarkers = l;
      }), await o.run(), await i(), window.addEventListener("resize", v);
    }), IA(() => {
      window.removeEventListener("resize", v), o.poser.unregisterView(c), o.pause();
    }), (l, s) => {
      var I, m, u, D;
      return R(), S("div", {
        class: "ar-view-wrapper",
        ref_key: "wrapper",
        ref: d
      }, [
        K("div", et, [
          K("canvas", {
            class: "ar-canvas",
            ref_key: "canvas",
            ref: f
          }, null, 512),
          K("div", {
            style: xA({
              opacity: h.status.initialized && ((I = h.status.calibration) != null && I.calibrated) ? 1 : 0
            }),
            class: "elements",
            ref: "elements"
          }, [
            CA(l.$slots, "default", {
              trackedMarkers: h.trackedMarkers
            }, void 0, !0)
          ], 4)
        ]),
        K("div", {
          onClick: a,
          class: "setup-button"
        }, "⚙"),
        h.status.initialized && ((m = h.status.feed) != null && m.selected) && !((u = h.status.calibration) != null && u.calibrated) ? (R(), S("div", tt, [
          QA(Se, {
            session: tA(o),
            status: h.status
          }, null, 8, ["session", "status"])
        ])) : J("", !0),
        h.status.initialized ? (R(), S("div", at, [
          (D = h.status.setup) != null && D.show ? (R(), ZA(we, {
            key: 0,
            session: tA(o),
            status: h.status,
            onClose: C
          }, null, 8, ["session", "status"])) : J("", !0)
        ])) : (R(), S("div", it, "Loading…"))
      ], 512);
    };
  }
});
const nt = /* @__PURE__ */ aA(st, [["__scopeId", "data-v-e53aa743"]]), rt = { key: 0 }, ot = /* @__PURE__ */ AA({
  __name: "ARElement",
  props: {
    id: null,
    timeout: { default: 1e3 },
    markerSize: { default: 50 }
  },
  setup(A) {
    const t = A, n = mA({
      show: !1,
      timeoutHandler: null,
      tracked: !1
    }), o = fA("session"), h = $(null);
    return hA(() => {
      o.poser.registerElement(
        t.id.toString(),
        h.value,
        t.markerSize,
        (f) => {
          n.tracked = f, f ? (n.show = !0, n.timeoutHandler != null && (window.clearTimeout(n.timeoutHandler), n.timeoutHandler = null)) : n.timeoutHandler = window.setTimeout(() => {
            n.show = !1;
          }, t.timeout);
        }
      );
    }), IA(() => {
      o.poser.unregisterElement(t.id.toString());
    }), (f, d) => (R(), S("div", {
      class: "element",
      ref_key: "element",
      ref: h
    }, [
      QA(GA, { name: "fade" }, {
        default: PA(() => [
          n.show ? (R(), S("div", rt, [
            CA(f.$slots, "default", {
              tracked: n.tracked
            }, void 0, !0)
          ])) : J("", !0)
        ]),
        _: 3
      })
    ], 512));
  }
});
const ct = /* @__PURE__ */ aA(ot, [["__scopeId", "data-v-644b90f9"]]), lt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAByYAAAUyCAIAAADEGwRQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2AkGFAQH++VSRAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABAElEQVR4nOzcsZGDWBRFweXXmIQh5R+QFMbYsDGM6qyQ9nX7VD2Di3EMtvM8/wEAAAAAoLCuPgAAAAAA4P9DcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAyPy88c7/fn89nfgqf7Ha7PR6Pq6/gfcx8GhsfyMynMfNpbHwgM5/GzKexcfgu23mef35m2/6LU/hwL7wqfC8zH8jGpzHzgcx8FBufycxHMfOBbBy+ocs1TAAAAQBJREFUiB8LAAAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAJf0XsMAAAEASURBVAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJATQl4pAAABAElEQVSRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAZyIz5QAAAQBJREFUAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISJcJGVcAAAEASURBVK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAy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", ut = ["src"], ht = /* @__PURE__ */ AA({
  __name: "ARChessboard",
  setup(A) {
    return (t, n) => (R(), S("img", {
      alt: "Chessboard pattern for camera calibration",
      src: tA(lt),
      style: { "max-width": "100%", "max-height": "100%" }
    }, null, 8, ut));
  }
});
class ft {
  constructor() {
    E(this, "sessions");
    this.sessions = {};
  }
  requestSession(t = "default") {
    return this.sessions[t] || (this.sessions[t] = new At()), this.sessions[t];
  }
  removeSession(t = "default") {
    this.sessions[t].pause(), delete this.sessions[t];
  }
  async check() {
    return window.isSecureContext ? navigator.mediaDevices && window.ImageCapture ? (await navigator.mediaDevices.enumerateDevices()).filter((n) => n.kind === "videoinput").length ? {
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
const vt = {
  install(A, t) {
    A.component("ar-view", nt), A.component("ar-element", ct), A.component("ar-chessboard", ht);
    const n = new ft();
    A.config.globalProperties.$vuexr = n, A.provide("vuexr", n);
  }
};
export {
  vt as VueXR
};
