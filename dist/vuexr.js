var FA = Object.defineProperty;
var DA = (t, A, r) => A in t ? FA(t, A, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[A] = r;
var E = (t, A, r) => (DA(t, typeof A != "symbol" ? A + "" : A, r), r);
import { defineComponent as $, ref as _, computed as RA, onMounted as hA, onUpdated as SA, openBlock as R, createElementBlock as S, createElementVNode as K, createTextVNode as q, withDirectives as VA, Fragment as XA, renderList as KA, toDisplayString as lA, vModelSelect as UA, createCommentVNode as J, createStaticVNode as zA, pushScopeId as OA, popScopeId as ZA, inject as fA, provide as GA, reactive as mA, onUnmounted as IA, normalizeStyle as PA, renderSlot as CA, createVNode as QA, unref as uA, createBlock as xA, Transition as JA, withCtx as NA } from "vue";
const T = (t) => (OA("data-v-bf4ce744"), t = t(), ZA(), t), HA = { class: "setup" }, jA = { key: 0 }, TA = { key: 0 }, qA = /* @__PURE__ */ zA('<h2 class="title" data-v-bf4ce744>Camera Calibration</h2><p data-v-bf4ce744> To make VueXR know how to project virtual elements to the real world, we have to calibrate your camera first. </p><ol data-v-bf4ce744><li data-v-bf4ce744> Print or display this <a href="https://docs.opencv.org/master/pattern.png" target="_blank" data-v-bf4ce744>chessboard pattern</a> on another device. </li><li data-v-bf4ce744>Take a steady aim at the pattern with your camera.</li><li data-v-bf4ce744>Press the <strong data-v-bf4ce744>Capture</strong> button below.</li><li data-v-bf4ce744>Repeat for at least 4 other different perspectives.</li><li data-v-bf4ce744>Press the <b data-v-bf4ce744>Calibrate</b> button.</li></ol>', 3), LA = { style: { "margin-top": "20px", "text-align": "center" } }, YA = { key: 1 }, WA = /* @__PURE__ */ T(() => /* @__PURE__ */ K("h2", { class: "title" }, "AR Setup", -1)), _A = { class: "status-line" }, $A = ["title"], Ae = {
  key: 1,
  class: "status-value"
}, ee = /* @__PURE__ */ T(() => /* @__PURE__ */ K("option", {
  disabled: "",
  value: ""
}, "Please select a Camera", -1)), te = ["value"], ae = { key: 0 }, se = { key: 1 }, ie = /* @__PURE__ */ T(() => /* @__PURE__ */ K("hr", null, null, -1)), ne = { class: "status-line" }, re = ["title"], oe = {
  key: 1,
  class: "status-value"
}, ce = /* @__PURE__ */ T(() => /* @__PURE__ */ K("hr", null, null, -1)), le = { class: "status-line" }, ue = ["title"], he = {
  key: 1,
  class: "status-value"
}, fe = /* @__PURE__ */ T(() => /* @__PURE__ */ K("hr", null, null, -1)), pe = { class: "status-line" }, de = {
  key: 0,
  class: "status-value"
}, ve = {
  key: 1,
  class: "status-value"
}, ge = /* @__PURE__ */ T(() => /* @__PURE__ */ K("hr", null, null, -1)), me = { class: "status-line" }, Ie = {
  key: 0,
  class: "status-value"
}, Ce = {
  key: 1,
  class: "status-value"
}, Qe = {
  key: 0,
  style: { "margin-top": "20px", "text-align": "center" }
}, we = {
  key: 1,
  style: { "margin-top": "20px", "text-align": "center" }
}, be = /* @__PURE__ */ $({
  __name: "ARSetup",
  props: {
    status: {},
    session: {}
  },
  emits: ["close"],
  setup(t, { emit: A }) {
    const r = t, o = _(null), h = _(!1), f = RA(() => {
      var a;
      return (a = r.status.feed) == null ? void 0 : a.available;
    });
    function p(a) {
      r.session.feed.selectCamera(o.value);
    }
    function c() {
      r.session.resetCalibration();
    }
    function C() {
      A("close");
    }
    return hA(() => {
      o.value = r.session.feed.feedStatus.selected ?? null;
    }), SA(() => {
      o.value = r.session.feed.feedStatus.selected ?? null;
    }), (a, e) => {
      var s, v, l, i;
      return R(), S("div", HA, [
        a.status ? (R(), S("div", jA, [
          K("div", {
            class: "close-button",
            onClick: C
          }, "×"),
          h.value ? (R(), S("div", TA, [
            qA,
            K("div", LA, [
              K("button", {
                class: "reset-button",
                onClick: e[0] || (e[0] = (m) => h.value = !1)
              }, " Back ")
            ])
          ])) : (R(), S("div", YA, [
            WA,
            K("div", _A, [
              q(" Video "),
              (s = a.status.feed) != null && s.error ? (R(), S("span", {
                key: 0,
                class: "status-value",
                title: a.status.feed.error.toString()
              }, "✗", 8, $A)) : (R(), S("span", Ae, "✓"))
            ]),
            VA(K("select", {
              class: "camera-selection",
              style: { "margin-top": "5px" },
              "onUpdate:modelValue": e[1] || (e[1] = (m) => o.value = m),
              onChange: p
            }, [
              ee,
              (R(!0), S(XA, null, KA(f.value, (m) => (R(), S("option", {
                value: m.deviceId
              }, [
                m.label ? (R(), S("span", ae, lA(m.label), 1)) : (R(), S("span", se, lA(m.deviceId), 1))
              ], 8, te))), 256))
            ], 544), [
              [UA, o.value]
            ]),
            ie,
            K("div", ne, [
              q(" Accelerometer "),
              a.status.motion && a.status.motion.acceleration.error ? (R(), S("span", {
                key: 0,
                class: "status-value",
                title: a.status.motion.acceleration.error.toString()
              }, "⚠", 8, re)) : (R(), S("span", oe, "✓"))
            ]),
            ce,
            K("div", le, [
              q(" Gyroscope "),
              a.status.motion && a.status.motion.gyro.error ? (R(), S("span", {
                key: 0,
                class: "status-value",
                title: a.status.motion.gyro.error.toString()
              }, "⚠", 8, ue)) : (R(), S("span", he, "✓"))
            ]),
            fe,
            K("div", pe, [
              q(" Computer Vision "),
              a.status.initialized ? (R(), S("span", ve, "✓")) : (R(), S("span", de, "✗"))
            ]),
            ge,
            K("div", me, [
              q(" Calibration "),
              (v = a.status.calibration) != null && v.calibrated ? (R(), S("span", Ce, "✓")) : (R(), S("span", Ie, "✗"))
            ]),
            (l = a.status.calibration) != null && l.calibrated ? (R(), S("div", Qe, [
              K("button", {
                class: "reset-button",
                onClick: c
              }, "Reset Calibration")
            ])) : !((i = a.status.feed) != null && i.error) && a.status.initialized ? (R(), S("div", we, [
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
const aA = (t, A) => {
  const r = t.__vccOpts || t;
  for (const [o, h] of A)
    r[o] = h;
  return r;
}, Be = /* @__PURE__ */ aA(be, [["__scopeId", "data-v-bf4ce744"]]), Me = {
  key: 0,
  class: "controls"
}, ye = ["disabled"], ke = ["disabled"], Ee = { key: 0 }, Fe = { key: 1 }, De = ["disabled"], Re = {
  key: 2,
  class: "hint-text"
}, Se = {
  key: 3,
  class: "hint-text"
}, Ve = /* @__PURE__ */ $({
  __name: "ARControls",
  props: {
    status: {}
  },
  setup(t) {
    const A = fA("session");
    function r() {
      A.calibration.setCaptureNextcalibrationPoints();
    }
    function o() {
      A.calibrate();
    }
    function h() {
      A.resetCalibration();
    }
    return (f, p) => {
      var c, C, a, e, s, v, l, i, m;
      return f.status ? (R(), S("div", Me, [
        (c = f.status.calibration) != null && c.calibrated ? J("", !0) : (R(), S("button", {
          key: 0,
          disabled: !((C = f.status.calibration) != null && C.captureReady),
          class: "capture-image",
          onClick: r
        }, " Capture ", 8, ye)),
        (a = f.status.calibration) != null && a.calibrated ? J("", !0) : (R(), S("button", {
          key: 1,
          disabled: (((e = f.status.calibration) == null ? void 0 : e.captures) ?? 0) < 5,
          onClick: o
        }, [
          (s = f.status.calibration) != null && s.calibrated ? (R(), S("span", Fe, "Recalibrate")) : (R(), S("span", Ee, "Calibrate"))
        ], 8, ke)),
        K("button", {
          disabled: !((v = f.status.calibration) != null && v.captures) && !((l = f.status.calibration) != null && l.calibrated),
          onClick: h
        }, " Reset ", 8, De),
        (i = f.status.calibration) != null && i.calibrated ? (R(), S("span", Se, "Calibrated")) : (R(), S("span", Re, lA((m = f.status.calibration) == null ? void 0 : m.captures) + " Captures", 1))
      ])) : J("", !0);
    };
  }
});
const Xe = /* @__PURE__ */ aA(Ve, [["__scopeId", "data-v-937b8749"]]);
var W = /* @__PURE__ */ ((t) => (t[t.RESET_CALIBRATION_POINTS = 0] = "RESET_CALIBRATION_POINTS", t[t.FIND_CHESSBOARD_CORNERS = 1] = "FIND_CHESSBOARD_CORNERS", t[t.CALIBRATE = 2] = "CALIBRATE", t[t.DETECT = 3] = "DETECT", t))(W || {}), x = /* @__PURE__ */ ((t) => (t[t.WORKER_READY = 0] = "WORKER_READY", t[t.WORKER_FAILED = 1] = "WORKER_FAILED", t[t.FIND_CHESSBOARD_CORNERS_CAPTURED = 2] = "FIND_CHESSBOARD_CORNERS_CAPTURED", t[t.FIND_CHESSBOARD_CORNERS_READY = 3] = "FIND_CHESSBOARD_CORNERS_READY", t[t.FIND_CHESSBOARD_CORNERS_NOT_READY = 4] = "FIND_CHESSBOARD_CORNERS_NOT_READY", t[t.CALIBRATE = 5] = "CALIBRATE", t[t.DETECT = 6] = "DETECT", t))(x || {});
class Ke {
  constructor(A) {
    E(this, "session");
    E(this, "findChessboardOngoing");
    E(this, "calibrationOngoing");
    E(this, "captureNextCalibrationPoints");
    E(this, "calibrationStatus");
    E(this, "calibration", null);
    this.session = A, this.findChessboardOngoing = !1, this.calibrationOngoing = !1, this.captureNextCalibrationPoints = !1, this.calibrationStatus = {
      captureReady: !1,
      calibrated: !1,
      captures: 0
    };
  }
  resetCalibrationPoints() {
    this.session.worker && this.session.worker.postMessage({
      operation: W.RESET_CALIBRATION_POINTS
    }), this.calibrationStatus.captures = 0, this.session.updateStatus();
  }
  resetCameraCalibration() {
    this.calibration = null, this.calibrationStatus.calibrated = !1, this.session.updateStatus();
  }
  loadCameraCalibration() {
    const A = window.localStorage.getItem(
      `vuexr/${this.session.name}/calibration/${this.session.feed.feedStatus.selected}`
    );
    if (A) {
      const r = JSON.parse(A);
      return this.resetCameraCalibration(), this.calibration = r, this.calibrationStatus.calibrated = !0, this.session.state = kA.DETECTION, this.session.updateStatus(), !0;
    } else
      return !1;
  }
  storeCameraCalibration() {
    return this.calibration ? (window.localStorage.setItem(
      `vuexr/${this.session.name}/calibration/${this.session.feed.feedStatus.selected}`,
      JSON.stringify(this.calibration)
    ), !0) : !1;
  }
  findChessBoardCorners(A = !0) {
    var r;
    !this.findChessboardOngoing && this.session.canvas && this.session.worker && (this.findChessboardOngoing = !0, this.session.worker.postMessage({
      operation: W.FIND_CHESSBOARD_CORNERS,
      image: (r = this.session.context2d) == null ? void 0 : r.getImageData(
        0,
        0,
        this.session.canvas.width,
        this.session.canvas.height
      ),
      captureNextCalibrationPoints: this.captureNextCalibrationPoints,
      highlight: A
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
  calibrate(A) {
    var r;
    this.calibrationOngoing || (this.calibrationOngoing = !0, (r = this.session.worker) == null || r.postMessage({
      operation: W.CALIBRATE,
      width: A.width,
      height: A.height
    }));
  }
  calibrationFinished(A) {
    A.calibration && (this.calibrationOngoing = !1, this.calibration = A.calibration, this.storeCameraCalibration(), this.calibrationStatus.calibrated = !0, this.session.updateStatus());
  }
}
class Ue {
  constructor(A) {
    E(this, "session");
    E(this, "detectionOngoing", !1);
    this.session = A;
  }
  detect(A = !0) {
    var r, o, h, f, p, c;
    if (!this.detectionOngoing) {
      this.detectionOngoing = !0;
      try {
        (c = this.session.worker) == null || c.postMessage({
          operation: W.DETECT,
          image: (h = this.session.context2d) == null ? void 0 : h.getImageData(
            0,
            0,
            ((r = this.session.canvas) == null ? void 0 : r.width) ?? 0,
            ((o = this.session.canvas) == null ? void 0 : o.height) ?? 0
          ),
          calibration: {
            cameraMatrix: JSON.parse(
              JSON.stringify((f = this.session.calibration.calibration) == null ? void 0 : f.cameraMatrix)
            ),
            distCoeffs: JSON.parse(
              JSON.stringify((p = this.session.calibration.calibration) == null ? void 0 : p.distCoeffs)
            )
          },
          highlight: A
        });
      } catch (C) {
        this.detectionOngoing = !1, console.log(C);
      }
    }
  }
  detectionFinished(A) {
    this.detectionOngoing = !1, this.session.calibration.calibrationStatus.calibrated && this.session.poser.setMarkers(A.markers ?? []);
  }
}
var ze = 1e-6, O = typeof Float32Array < "u" ? Float32Array : Array;
Math.hypot || (Math.hypot = function() {
  for (var t = 0, A = arguments.length; A--; )
    t += arguments[A] * arguments[A];
  return Math.sqrt(t);
});
function wA() {
  var t = new O(9);
  return O != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[5] = 0, t[6] = 0, t[7] = 0), t[0] = 1, t[4] = 1, t[8] = 1, t;
}
function j() {
  var t = new O(16);
  return O != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0), t[0] = 1, t[5] = 1, t[10] = 1, t[15] = 1, t;
}
function L(t, A, r, o, h, f, p, c, C, a, e, s, v, l, i, m) {
  var I = new O(16);
  return I[0] = t, I[1] = A, I[2] = r, I[3] = o, I[4] = h, I[5] = f, I[6] = p, I[7] = c, I[8] = C, I[9] = a, I[10] = e, I[11] = s, I[12] = v, I[13] = l, I[14] = i, I[15] = m, I;
}
function Oe(t, A) {
  var r = A[0], o = A[1], h = A[2], f = A[3], p = A[4], c = A[5], C = A[6], a = A[7], e = A[8], s = A[9], v = A[10], l = A[11], i = A[12], m = A[13], I = A[14], u = A[15], D = r * c - o * p, k = r * C - h * p, B = r * a - f * p, Q = o * C - h * c, M = o * a - f * c, d = h * a - f * C, g = e * m - s * i, n = e * I - v * i, V = e * u - l * i, w = s * I - v * m, b = s * u - l * m, y = v * u - l * I, F = D * y - k * b + B * w + Q * V - M * n + d * g;
  return F ? (F = 1 / F, t[0] = (c * y - C * b + a * w) * F, t[1] = (h * b - o * y - f * w) * F, t[2] = (m * d - I * M + u * Q) * F, t[3] = (v * M - s * d - l * Q) * F, t[4] = (C * V - p * y - a * n) * F, t[5] = (r * y - h * V + f * n) * F, t[6] = (I * B - i * d - u * k) * F, t[7] = (e * d - v * B + l * k) * F, t[8] = (p * b - c * V + a * g) * F, t[9] = (o * V - r * b - f * g) * F, t[10] = (i * M - m * B + u * D) * F, t[11] = (s * B - e * M - l * D) * F, t[12] = (c * n - p * w - C * g) * F, t[13] = (r * w - o * n + h * g) * F, t[14] = (m * k - i * Q - I * D) * F, t[15] = (e * Q - s * k + v * D) * F, t) : null;
}
function bA(t, A, r) {
  var o = A[0], h = A[1], f = A[2], p = A[3], c = A[4], C = A[5], a = A[6], e = A[7], s = A[8], v = A[9], l = A[10], i = A[11], m = A[12], I = A[13], u = A[14], D = A[15], k = r[0], B = r[1], Q = r[2], M = r[3];
  return t[0] = k * o + B * c + Q * s + M * m, t[1] = k * h + B * C + Q * v + M * I, t[2] = k * f + B * a + Q * l + M * u, t[3] = k * p + B * e + Q * i + M * D, k = r[4], B = r[5], Q = r[6], M = r[7], t[4] = k * o + B * c + Q * s + M * m, t[5] = k * h + B * C + Q * v + M * I, t[6] = k * f + B * a + Q * l + M * u, t[7] = k * p + B * e + Q * i + M * D, k = r[8], B = r[9], Q = r[10], M = r[11], t[8] = k * o + B * c + Q * s + M * m, t[9] = k * h + B * C + Q * v + M * I, t[10] = k * f + B * a + Q * l + M * u, t[11] = k * p + B * e + Q * i + M * D, k = r[12], B = r[13], Q = r[14], M = r[15], t[12] = k * o + B * c + Q * s + M * m, t[13] = k * h + B * C + Q * v + M * I, t[14] = k * f + B * a + Q * l + M * u, t[15] = k * p + B * e + Q * i + M * D, t;
}
function dA(t, A, r) {
  var o = r[0], h = r[1], f = r[2], p, c, C, a, e, s, v, l, i, m, I, u;
  return A === t ? (t[12] = A[0] * o + A[4] * h + A[8] * f + A[12], t[13] = A[1] * o + A[5] * h + A[9] * f + A[13], t[14] = A[2] * o + A[6] * h + A[10] * f + A[14], t[15] = A[3] * o + A[7] * h + A[11] * f + A[15]) : (p = A[0], c = A[1], C = A[2], a = A[3], e = A[4], s = A[5], v = A[6], l = A[7], i = A[8], m = A[9], I = A[10], u = A[11], t[0] = p, t[1] = c, t[2] = C, t[3] = a, t[4] = e, t[5] = s, t[6] = v, t[7] = l, t[8] = i, t[9] = m, t[10] = I, t[11] = u, t[12] = p * o + e * h + i * f + A[12], t[13] = c * o + s * h + m * f + A[13], t[14] = C * o + v * h + I * f + A[14], t[15] = a * o + l * h + u * f + A[15]), t;
}
function vA(t, A) {
  var r = A[0], o = A[1], h = A[2], f = A[3], p = r + r, c = o + o, C = h + h, a = r * p, e = o * p, s = o * c, v = h * p, l = h * c, i = h * C, m = f * p, I = f * c, u = f * C;
  return t[0] = 1 - s - i, t[1] = e + u, t[2] = v - I, t[3] = 0, t[4] = e - u, t[5] = 1 - a - i, t[6] = l + m, t[7] = 0, t[8] = v + I, t[9] = l - m, t[10] = 1 - a - s, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
}
var Y = bA;
function N() {
  var t = new O(3);
  return O != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0), t;
}
function Ze(t) {
  var A = t[0], r = t[1], o = t[2];
  return Math.hypot(A, r, o);
}
function gA(t, A, r) {
  var o = new O(3);
  return o[0] = t, o[1] = A, o[2] = r, o;
}
function Ge(t, A) {
  var r = A[0], o = A[1], h = A[2], f = r * r + o * o + h * h;
  return f > 0 && (f = 1 / Math.sqrt(f)), t[0] = A[0] * f, t[1] = A[1] * f, t[2] = A[2] * f, t;
}
function Pe(t, A) {
  return t[0] * A[0] + t[1] * A[1] + t[2] * A[2];
}
function iA(t, A, r) {
  var o = A[0], h = A[1], f = A[2], p = r[0], c = r[1], C = r[2];
  return t[0] = h * C - f * c, t[1] = f * p - o * C, t[2] = o * c - h * p, t;
}
var xe = Ze;
(function() {
  var t = N();
  return function(A, r, o, h, f, p) {
    var c, C;
    for (r || (r = 3), o || (o = 0), h ? C = Math.min(h * r + o, A.length) : C = A.length, c = o; c < C; c += r)
      t[0] = A[c], t[1] = A[c + 1], t[2] = A[c + 2], f(t, t, p), A[c] = t[0], A[c + 1] = t[1], A[c + 2] = t[2];
    return A;
  };
})();
function Je() {
  var t = new O(4);
  return O != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0), t;
}
function BA(t, A, r, o) {
  var h = new O(4);
  return h[0] = t, h[1] = A, h[2] = r, h[3] = o, h;
}
function Ne(t, A) {
  var r = A[0], o = A[1], h = A[2], f = A[3], p = r * r + o * o + h * h + f * f;
  return p > 0 && (p = 1 / Math.sqrt(p)), t[0] = r * p, t[1] = o * p, t[2] = h * p, t[3] = f * p, t;
}
function He(t, A, r) {
  var o = A[0], h = A[1], f = A[2], p = r[0], c = r[1], C = r[2], a = r[3], e = a * o + c * f - C * h, s = a * h + C * o - p * f, v = a * f + p * h - c * o, l = -p * o - c * h - C * f;
  return t[0] = e * a + l * -p + s * -C - v * -c, t[1] = s * a + l * -c + v * -p - e * -C, t[2] = v * a + l * -C + e * -c - s * -p, t[3] = A[3], t;
}
(function() {
  var t = Je();
  return function(A, r, o, h, f, p) {
    var c, C;
    for (r || (r = 4), o || (o = 0), h ? C = Math.min(h * r + o, A.length) : C = A.length, c = o; c < C; c += r)
      t[0] = A[c], t[1] = A[c + 1], t[2] = A[c + 2], t[3] = A[c + 3], f(t, t, p), A[c] = t[0], A[c + 1] = t[1], A[c + 2] = t[2], A[c + 3] = t[3];
    return A;
  };
})();
function tA() {
  var t = new O(4);
  return O != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0), t[3] = 1, t;
}
function je(t, A, r) {
  r = r * 0.5;
  var o = Math.sin(r);
  return t[0] = o * A[0], t[1] = o * A[1], t[2] = o * A[2], t[3] = Math.cos(r), t;
}
function nA(t, A, r, o) {
  var h = A[0], f = A[1], p = A[2], c = A[3], C = r[0], a = r[1], e = r[2], s = r[3], v, l, i, m, I;
  return l = h * C + f * a + p * e + c * s, l < 0 && (l = -l, C = -C, a = -a, e = -e, s = -s), 1 - l > ze ? (v = Math.acos(l), i = Math.sin(v), m = Math.sin((1 - o) * v) / i, I = Math.sin(o * v) / i) : (m = 1 - o, I = o), t[0] = m * h + I * C, t[1] = m * f + I * a, t[2] = m * p + I * e, t[3] = m * c + I * s, t;
}
function Te(t, A) {
  var r = A[0] + A[4] + A[8], o;
  if (r > 0)
    o = Math.sqrt(r + 1), t[3] = 0.5 * o, o = 0.5 / o, t[0] = (A[5] - A[7]) * o, t[1] = (A[6] - A[2]) * o, t[2] = (A[1] - A[3]) * o;
  else {
    var h = 0;
    A[4] > A[0] && (h = 1), A[8] > A[h * 3 + h] && (h = 2);
    var f = (h + 1) % 3, p = (h + 2) % 3;
    o = Math.sqrt(A[h * 3 + h] - A[f * 3 + f] - A[p * 3 + p] + 1), t[h] = 0.5 * o, o = 0.5 / o, t[3] = (A[f * 3 + p] - A[p * 3 + f]) * o, t[f] = (A[f * 3 + h] + A[h * 3 + f]) * o, t[p] = (A[p * 3 + h] + A[h * 3 + p]) * o;
  }
  return t;
}
var rA = BA, MA = Ne;
(function() {
  var t = N(), A = gA(1, 0, 0), r = gA(0, 1, 0);
  return function(o, h, f) {
    var p = Pe(h, f);
    return p < -0.999999 ? (iA(t, A, h), xe(t) < 1e-6 && iA(t, r, h), Ge(t, t), je(o, t, Math.PI), o) : p > 0.999999 ? (o[0] = 0, o[1] = 0, o[2] = 0, o[3] = 1, o) : (iA(t, h, f), o[0] = t[0], o[1] = t[1], o[2] = t[2], o[3] = 1 + p, MA(o, o));
  };
})();
(function() {
  var t = tA(), A = tA();
  return function(r, o, h, f, p, c) {
    return nA(t, o, p, c), nA(A, h, f, c), nA(r, t, A, 2 * c * (1 - c)), r;
  };
})();
(function() {
  var t = wA();
  return function(A, r, o, h) {
    return t[0] = o[0], t[3] = o[1], t[6] = o[2], t[1] = h[0], t[4] = h[1], t[7] = h[2], t[2] = -r[0], t[5] = -r[1], t[8] = -r[2], MA(A, Te(A, t));
  };
})();
function qe(t, A) {
  var f;
  const r = Math.min(t.width / A.width, t.height / A.height), o = (t.width - A.width * r) / 2, h = (t.height - A.height * r) / 2;
  (f = t.getContext("2d")) == null || f.drawImage(
    A,
    0,
    0,
    A.width,
    A.height,
    o,
    h,
    A.width * r,
    A.height * r
  );
}
function Le(t, A, r, o, h) {
  const f = j(), p = L(
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
  ), c = L(
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
  Y(f, c, p);
  const C = L(
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
  Y(f, C, f), Y(f, h, f);
  const a = A[0], e = L(
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
  Y(f, e, f);
  const s = L(
    t,
    0,
    0,
    0,
    0,
    t,
    0,
    0,
    0,
    0,
    t,
    0,
    A[2] * t,
    A[5] * t,
    0,
    1
  );
  return Y(f, s, f), f;
}
const Ye = {
  constraints: {
    audio: !1,
    video: { facingMode: "environment" }
  }
};
class We {
  constructor(A, r) {
    E(this, "session");
    E(this, "options");
    E(this, "paused", !1);
    E(this, "mediaStream");
    E(this, "track");
    E(this, "videoElement");
    E(this, "imageCapture");
    E(this, "feedStatus", {});
    E(this, "animationFrameRequest");
    this.session = A, this.options = { ...Ye, ...r }, this.videoElement = document.createElement("video");
  }
  async init() {
    (!navigator.mediaDevices || !ImageCapture) && (this.feedStatus = {
      error: "mediaDevices and/or ImageCapture API not supported!"
    });
  }
  loadCamera() {
    let A = window.localStorage.getItem(
      `vuexr/${this.session.name}/camera`
    );
    return A ? (A = JSON.parse(A), A) : null;
  }
  storeCamera() {
    return this.feedStatus.selected ? (window.localStorage.setItem(
      `vuexr/${this.session.name}/camera`,
      JSON.stringify(this.feedStatus.selected)
    ), !0) : !1;
  }
  stop() {
    var A;
    this.mediaStream && (this.animationFrameRequest !== void 0 && window.cancelAnimationFrame(this.animationFrameRequest), (A = this.track) == null || A.stop(), this.track = void 0, this.mediaStream = void 0, this.imageCapture = void 0);
  }
  async selectCamera(A) {
    this.feedStatus.selected !== A && (this.stop(), this.feedStatus.selected = A, this.storeCamera(), this.session.calibration.resetCalibrationPoints(), await this.run(), this.session.updateStatus());
  }
  async listAvailable() {
    return navigator.mediaDevices && ImageCapture ? (await navigator.mediaDevices.enumerateDevices()).filter((r) => r.kind === "videoinput") : [];
  }
  async run() {
    try {
      this.feedStatus.selected ? this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: this.feedStatus.selected }
      }) : this.mediaStream = await navigator.mediaDevices.getUserMedia(
        this.options.constraints
      ), this.track = this.mediaStream.getVideoTracks()[0], this.feedStatus.selected = this.track.getSettings().deviceId, this.storeCamera();
      const A = await this.listAvailable(), r = this.loadCamera();
      this.feedStatus = {
        available: A,
        selected: r ?? void 0
      }, this.session.calibration.loadCameraCalibration(), this.session.updateStatus(), this.imageCapture = new ImageCapture(this.track), this.videoElement.srcObject = this.mediaStream, await new Promise((o) => {
        this.videoElement.onloadedmetadata = () => {
          this.videoElement.play(), this.session.canvas && (this.session.canvas.width = this.videoElement.videoWidth, this.session.canvas.height = this.videoElement.videoHeight), this.loop(), o();
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
        this.session.canvas && qe(this.session.canvas, A), this.session.process();
      } catch {
      } finally {
        this.paused || (this.animationFrameRequest = window.requestAnimationFrame(() => {
          this.loop();
        }));
      }
  }
}
class _e {
  constructor(A) {
    E(this, "session");
    E(this, "elements", {});
    E(this, "views", []);
    E(this, "trackedMarkers", []);
    this.session = A;
  }
  registerView(A, r) {
    this.views.push({ id: A, callback: r });
  }
  unregisterView(A) {
    this.views = this.views.filter((r) => r.id !== A);
  }
  registerElement(A, r, o, h) {
    this.elements[A] = {
      id: A,
      element: r,
      markerSize: o,
      callback: h,
      lastRMat: j(),
      lastRVec: N(),
      lastTVec: N(),
      tracked: !1
    };
  }
  unregisterElement(A) {
    delete this.elements[A];
  }
  setMarkers(A) {
    for (const h of A)
      this.elements[h.id] && (!this.session.motion.motionStatus.acceleration.error && !this.session.motion.motionStatus.gyro.error ? this.elements[h.id].lastTransform = this.session.motion.getCurrentTransform() : this.elements[h.id].lastTransform = {
        orientation: tA(),
        position: N()
      }, this.elements[h.id].lastRVec = h.rvec, this.elements[h.id].lastTVec = h.tvec, this.elements[h.id].lastRMat = h.rmat, this.elements[h.id].tracked || (this.elements[h.id].tracked = !0, this.elements[h.id].callback(!0)));
    const r = A.map((h) => h.id.toString()), o = Object.keys(this.elements).filter(
      (h) => !r.includes(h)
    );
    for (const h of o)
      this.elements[h].tracked && (this.elements[h].tracked = !1, this.elements[h].callback(!1));
    (this.session.motion.motionStatus.acceleration.error || this.session.motion.motionStatus.gyro.error) && this.readjustElements(), this.trackedMarkers = r, this.views.forEach((h) => h.callback(this.trackedMarkers));
  }
  readjustElements() {
    var o, h, f;
    const A = (((o = this.session.canvas) == null ? void 0 : o.clientWidth) ?? 0) / (((h = this.session.canvas) == null ? void 0 : h.width) ?? 0), r = Object.keys(this.elements).map(
      (p) => this.elements[p]
    );
    for (const p of r)
      if (p.lastTransform) {
        const c = this.session.motion.getOffsetMatrix(
          p.lastTransform
        ), C = Le(
          A,
          ((f = this.session.calibration.calibration) == null ? void 0 : f.cameraMatrix) ?? wA(),
          p.lastRMat,
          p.lastTVec,
          c
        );
        this.projectElement(p.id, Array.from(C));
      }
  }
  projectElement(A, r) {
    const o = r.map(
      (h) => h.toFixed(5)
    );
    this.elements[A].element.style.transform = `matrix3d(${o.join(
      ","
    )})`;
  }
}
function $e(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function AA(t) {
  throw new Error('Could not dynamically require "' + t + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var yA = { exports: {} };
/**
 * @name    fili
 * @version 2.0.3 | December 13th 2018
 * @author  Florian Markert
 * @license MIT
 */
(function(t, A) {
  (function(r) {
    t.exports = r();
  })(function() {
    return function r(o, h, f) {
      function p(a, e) {
        if (!h[a]) {
          if (!o[a]) {
            var s = typeof AA == "function" && AA;
            if (!e && s)
              return s(a, !0);
            if (c)
              return c(a, !0);
            var v = new Error("Cannot find module '" + a + "'");
            throw v.code = "MODULE_NOT_FOUND", v;
          }
          var l = h[a] = { exports: {} };
          o[a][0].call(l.exports, function(i) {
            var m = o[a][1][i];
            return p(m || i);
          }, l, l.exports, r, o, h, f);
        }
        return h[a].exports;
      }
      for (var c = typeof AA == "function" && AA, C = 0; C < f.length; C++)
        p(f[C]);
      return p;
    }({ 1: [function(r, o, h) {
      o.exports = { CalcCascades: r("./src/calcCascades"), Fft: r("./src/fft"), FirCoeffs: r("./src/firCoeffs"), FirFilter: r("./src/firFilter"), IirCoeffs: r("./src/iirCoeffs"), IirFilter: r("./src/iirFilter"), TestFilter: r("./src/testFilter") };
    }, { "./src/calcCascades": 2, "./src/fft": 3, "./src/firCoeffs": 4, "./src/firFilter": 5, "./src/iirCoeffs": 6, "./src/iirFilter": 7, "./src/testFilter": 8 }], 2: [function(r, o, h) {
      var f = r("./iirCoeffs"), p = new f(), c = { bessel: { q: [[0.57735026919], [0.805538281842, 0.521934581669], [1.02331395383, 0.611194546878, 0.510317824749], [1.22566942541, 0.710852074442, 0.559609164796, 0.505991069397], [1.41530886916, 0.809790964842, 0.620470155556, 0.537552151325, 0.503912727276], [1.59465693507, 0.905947107025, 0.684008068137, 0.579367238641, 0.525936202016, 0.502755558204], [1.76552743493, 0.998998442993, 0.747625068271, 0.624777082395, 0.556680772868, 0.519027293158, 0.502045428643], [1.9292718407, 1.08906376917, 0.810410302962, 0.671382379377, 0.591144659703, 0.542678365981, 0.514570953471, 0.501578400482], [2.08691792612, 1.17637337045, 0.872034231424, 0.718163551101, 0.627261751983, 0.569890924765, 0.533371782078, 0.511523796759, 0.50125489338], [2.23926560629, 1.26117120993, 0.932397288146, 0.764647810579, 0.664052481472, 0.598921924986, 0.555480327396, 0.526848630061, 0.509345928377, 0.501021580965], [2.38695091667, 1.34368488961, 0.991497755204, 0.81060830488, 0.701011199665, 0.628878390935, 0.57943181849, 0.545207253735, 0.52208637596, 0.507736060535, 0.500847111042], [2.53048919562, 1.42411783481, 1.04937620183, 0.85593899901, 0.737862159044, 0.659265671705, 0.604435823473, 0.565352679646, 0.537608804383, 0.51849505465, 0.506508536474, 0.500715908905]], f3dB: [[1.27201964951], [1.60335751622, 1.43017155999], [1.9047076123, 1.68916826762, 1.60391912877], [2.18872623053, 1.95319575902, 1.8320926012, 1.77846591177], [2.45062684305, 2.20375262593, 2.06220731793, 1.98055310881, 1.94270419166], [2.69298925084, 2.43912611431, 2.28431825401, 2.18496722634, 2.12472538477, 2.09613322542], [2.91905714471, 2.66069088948, 2.49663434571, 2.38497976939, 2.30961462222, 2.26265746534, 2.24005716132], [3.13149167404, 2.87016099416, 2.69935018044, 2.57862945683, 2.49225505119, 2.43227707449, 2.39427710712, 2.37582307687], [3.33237300564, 3.06908580184, 2.89318259511, 2.76551588399, 2.67073340527, 2.60094950474, 2.55161764546, 2.52001358804, 2.50457164552], [3.52333123464, 3.25877569704, 3.07894353744, 2.94580435024, 2.84438325189, 2.76691082498, 2.70881411245, 2.66724655259, 2.64040228249, 2.62723439989], [3.70566068548, 3.44032173223, 3.2574059854, 3.11986367838, 3.01307175388, 2.92939234605, 2.86428726094, 2.81483068055, 2.77915465405, 2.75596888377, 2.74456638588], [3.88040469682, 3.61463243697, 3.4292654707, 3.28812274966, 3.17689762788, 3.08812364257, 3.01720732972, 2.96140104561, 2.91862858495, 2.88729479473, 2.8674198668, 2.8570800015]], f1dB: [[2.16477559371], [2.70320928596, 2.41122332505], [3.25676581436, 2.88822569572, 2.74246238837], [3.76153580353, 3.35675411406, 3.14862673032, 3.05646412475], [4.22174260104, 3.79644757806, 3.55260471864, 3.41193742197, 3.34673435508], [4.64584812552, 4.20789257981, 3.94082363122, 3.76942681446, 3.66549975744, 3.61617359345], [5.04060395196, 4.5944592201, 4.3111677248, 4.11836351827, 3.98822359814, 3.90713836715, 3.86811234525], [5.41107948467, 4.95951159709, 4.66435804468, 4.45575796102, 4.30650679478, 4.20286750045, 4.13720522991, 4.10531748119], [5.76110791853, 5.30592898465, 5.00182215701, 4.7811081045, 4.61724509926, 4.49660100894, 4.41131378918, 4.35667671372, 4.32997951075], [6.09364309488, 5.63609116014, 5.32506930789, 5.09480346139, 4.91939504255, 4.78540258409, 4.68493280536, 4.61302286993, 4.56661931366, 4.54382759952], [6.41100731543, 5.95195558182, 5.63550073656, 5.39754464742, 5.21278891332, 5.06801430334, 4.95539684456, 4.8697869429, 4.80814951843, 4.76793469612, 4.74828032403], [6.71506056052, 6.25514029778, 5.9343616072, 5.69011422355, 5.49763642361, 5.34401973764, 5.22125973611, 5.12485045619, 5.05037962112, 4.99699982231, 4.96155789635, 4.94441828777]] } }, C = { bessel: { as: [[1.3617], [1.3397, 0.7743], [1.2217, 0.9686, 0.5131], [1.1112, 0.9754, 0.7202, 0.3728], [1.0215, 0.9393, 0.7815, 0.5604, 0.2883]], bs: [[0.618], [0.4889, 0.389], [0.3887, 0.3505, 0.2756], [0.3162, 0.2979, 0.2621, 0.2087], [0.265, 0.2549, 0.2351, 0.2059, 0.1665]] }, butterworth: { as: [[1.4142], [1.8478, 0.7654], [1.9319, 1.4142, 0.5176], [1.9616, 1.6629, 1.1111, 0.3902], [1.9754, 1.782, 1.4142, 0.908, 0.3129]], bs: [[1], [1, 1], [1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1, 1]] }, tschebyscheff05: { as: [[1.3614], [2.6282, 0.3648], [3.8645, 0.7528, 0.1589], [5.1117, 1.0639, 0.3439, 0.0885], [6.3648, 1.3582, 0.4822, 0.1994, 0.0563]], bs: [[1.3827], [3.4341, 1.1509], [6.9797, 1.8573, 1.0711], [11.9607, 2.9365, 1.4206, 1.0407], [18.3695, 4.3453, 1.944, 1.252, 1.0263]] }, tschebyscheff1: { as: [[1.3022], [2.5904, 0.3039], [3.8437, 0.6292, 0.1296], [5.1019, 0.8916, 0.2806, 0.0717], [6.3634, 1.1399, 0.3939, 0.1616, 0.0455]], bs: [[1.5515], [4.1301, 1.1697], [8.5529, 1.9124, 1.0766], [14.7608, 3.0426, 1.4334, 1.0432], [22.7468, 4.5167, 1.9665, 1.2569, 1.0277]] }, tschebyscheff2: { as: [[1.1813], [2.4025, 0.2374], [3.588, 0.4925, 0.0995], [4.7743, 0.6991, 0.2153, 0.0547], [5.9618, 0.8947, 0.3023, 0.1233, 0.0347]], bs: [[1.7775], [4.9862, 1.1896], [10.4648, 1.9622, 1.0826], [18.151, 3.1353, 1.4449, 1.0461], [28.0376, 4.6644, 1.9858, 1.2614, 1.0294]] }, tschebyscheff3: { as: [[1.065], [2.1853, 0.1964], [3.2721, 0.4077, 0.0815], [4.3583, 0.5791, 0.1765, 0.0448], [5.4449, 0.7414, 0.2479, 0.1008, 0.0283]], bs: [[1.9305], [5.5339, 1.2009], [11.6773, 1.9873, 1.0861], [20.2948, 3.1808, 1.4507, 1.0478], [31.3788, 4.7363, 1.9952, 1.2638, 1.0304]] }, allpass: { as: [[1.6278], [2.337, 1.3506], [2.6117, 2.0706, 1.0967], [2.7541, 2.4174, 1.785, 0.9239], [2.8406, 2.612, 2.1733, 1.5583, 0.8018]], bs: [[0.8832], [1.4878, 1.1837], [1.7763, 1.6015, 1.2596], [1.942, 1.83, 1.6101, 1.2822], [2.049, 1.9714, 1.8184, 1.5923, 1.2877]] } }, a = function(l, i) {
        var m = [], I = 0;
        if (i !== "fromPZ")
          for (l.order > 12 && (l.order = 12), I = 0; I < l.order; I++) {
            var u, D, k;
            l.transform === "matchedZ" ? m.push(p.lowpassMZ({ Fs: l.Fs, Fc: l.Fc, preGain: l.preGain, as: C[l.characteristic].as[l.order - 1][I], bs: C[l.characteristic].bs[l.order - 1][I] })) : (l.characteristic === "butterworth" ? (u = 0.5 / Math.sin(Math.PI / (2 * l.order) * (I + 0.5)), D = 1) : (u = c[l.characteristic].q[l.order - 1][I], D = l.oneDb ? c[l.characteristic].f1dB[l.order - 1][I] : c[l.characteristic].f3dB[l.order - 1][I]), k = i === "highpass" ? l.Fc / D : l.Fc * D, i !== "bandpass" && i !== "bandstop" || l.characteristic === "bessel" && (k = Math.sqrt(l.order) * k / l.order), m.push(p[i]({ Fs: l.Fs, Fc: k, Q: u, BW: l.BW || 0, gain: l.gain || 0, preGain: l.preGain || !1 })));
          }
        else
          for (I = 0; I < l.length; I++)
            m.push(p[i](l[I]));
        return m;
      }, e = function(l) {
        return function(i) {
          return a(i, l);
        };
      }, s = {}, v = function() {
        var l = [];
        for (var i in p)
          s[i] = e(i), l.push(i);
        return s.available = function() {
          return l;
        }, s;
      };
      o.exports = v;
    }, { "./iirCoeffs": 6 }], 3: [function(r, o, h) {
      var f = function(p) {
        if (!function(d) {
          return !(d & d - 1);
        }(p))
          return !1;
        var c = {};
        c.length = p, c.buffer = new Float64Array(p), c.re = new Float64Array(p), c.im = new Float64Array(p), c.reI = new Float64Array(p), c.imI = new Float64Array(p), c.twiddle = new Int32Array(p), c.sinTable = new Float64Array(p - 1), c.cosTable = new Float64Array(p - 1);
        var C = 2 * Math.PI, a = Math.floor(Math.log(p) / Math.LN2);
        for (s = c.sinTable.length; s--; )
          c.sinTable[s] = Math.sin(C * (s / p)), c.cosTable[s] = Math.cos(C * (s / p));
        for (var e = p >> 1, s = 0, v = 0; c.twiddle[s] = v, !(++s >= p); ) {
          for (a = e; a <= v; )
            v -= a, a >>= 1;
          v += a;
        }
        var l = Math.PI, i = 2 * Math.PI, m = Math.abs, I = Math.pow, u = Math.cos, D = Math.sin, k = function(d) {
          return D(l * d) / (l * d);
        }, B = Math.E, Q = { rectangular: { calc: function() {
          return 1;
        }, values: [], correction: 1 }, none: { calc: function() {
          return 1;
        }, values: [], correction: 1 }, hanning: { calc: function(d, g) {
          return 0.5 * (1 - u(i * d / (g - 1)));
        }, values: [], correction: 2 }, hamming: { calc: function(d, g) {
          return 0.54 - 0.46 * u(i * d / (g - 1));
        }, values: [], correction: 1.8518999946875638 }, tukery: { calc: function(d, g, n) {
          return d < n * (g - 1) / 2 ? 0.5 * (1 + u(l * (2 * d / (n * (g - 1)) - 1))) : (g - 1) * (1 - n / 2) < d ? 0.5 * (1 + u(l * (2 * d / (n * (g - 1)) - 2 / n + 1))) : 1;
        }, values: [], correction: 4 / 3 }, cosine: { calc: function(d, g) {
          return D(l * d / (g - 1));
        }, values: [], correction: 1.570844266360796 }, lanczos: { calc: function(d, g) {
          return k(2 * d / (g - 1) - 1);
        }, values: [], correction: 1.6964337576195783 }, triangular: { calc: function(d, g) {
          return 2 / (g + 1) * ((g + 1) / 2 - m(d - (g - 1) / 2));
        }, values: [], correction: 2 }, bartlett: { calc: function(d, g) {
          return 2 / (g - 1) * ((g - 1) / 2 - m(d - (g - 1) / 2));
        }, values: [], correction: 2 }, gaussian: { calc: function(d, g, n) {
          return I(B, -0.5 * I((d - (g - 1) / 2) / (n * (g - 1) / 2), 2));
        }, values: [], correction: 5 / 3 }, bartlettHanning: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.62 - 0.48 * m(d / (g - 1) - 0.5) - 0.38 * u(n);
        }, values: [], correction: 2 }, blackman: { calc: function(d, g, n) {
          var V = (1 - n) / 2, w = n / 2, b = i * d / (g - 1);
          return V - 0.5 * u(b) + w * u(2 * b);
        }, values: [], correction: 4 / 3 }, blackmanHarris: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.35875 - 0.48829 * u(n) + 0.14128 * u(2 * n) - 0.01168 * u(3 * n);
        }, values: [], correction: 1.5594508635 }, nuttall3: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.375 - 0.5 * u(n) + 0.125 * u(2 * n);
        }, values: [], correction: 1.56 }, nuttall3a: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.40897 - 0.5 * u(n) + 0.09103 * u(2 * n);
        }, values: [], correction: 1.692 }, nuttall3b: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.4243801 - 0.4973406 * u(n) + 0.078793 * u(2 * n);
        }, values: [], correction: 1.7372527 }, nuttall4: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.3125 - 0.46875 * u(n) + 0.1875 * u(2 * n) - 0.03125 * u(3 * n);
        }, values: [], correction: 1.454543 }, nuttall4a: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.338946 - 0.481973 * u(n) + 0.161054 * u(2 * n) - 0.018027 * u(3 * n);
        }, values: [], correction: 1.512732763 }, nuttall4b: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.355768 - 0.481973 * u(n) + 0.144232 * u(2 * n) - 0.012604 * u(3 * n);
        }, values: [], correction: 1.55223262 }, nuttall4c: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.3635819 - 0.4891775 * u(n) + 0.1365995 * u(2 * n) - 0.0106411 * u(3 * n);
        }, values: [], correction: 1.57129067 }, sft3f: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.26526 - 0.5 * u(n) + 0.23474 * u(2 * n);
        }, values: [], correction: 1.3610238 }, sft4f: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.21706 - 0.42103 * u(n) + 0.28294 * u(2 * n) - 0.07897 * u(3 * n);
        }, values: [], correction: 1.2773573 }, sft5f: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.1881 - 0.36923 * u(n) + 0.28702 * u(2 * n) - 0.13077 * u(3 * n) + 0.02488 * u(4 * n);
        }, values: [], correction: 1.23167769 }, sft3m: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.28235 - 0.52105 * u(n) + 0.19659 * u(2 * n);
        }, values: [], correction: 1.39343451 }, sft4m: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.241906 - 0.460841 * u(n) + 0.2552381 * u(2 * n) - 0.041872 * u(3 * n);
        }, values: [], correction: 1.3190596 }, sft5m: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.209671 - 0.407331 * u(n) + 0.281225 * u(2 * n) - 0.092669 * u(3 * n) + 91036e-7 * u(4 * n);
        }, values: [], correction: 1.26529456464 }, nift: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return 0.2810639 - 0.5208972 * u(n) + 0.1980399 * u(2 * n);
        }, values: [], correction: 1.39094182 }, hpft: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return (1 - 1.912510941 * u(n) + 1.079173272 * u(2 * n) - 0.1832630879 * u(3 * n)) / g;
        }, values: [], correction: 1 }, srft: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return (1 - 1.93 * u(n) + 1.29 * u(2 * n) - 0.388 * u(3 * n) + 0.028 * u(4 * n)) / g;
        }, values: [], correction: 1 }, hft70: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return (1 - 1.90796 * u(n) + 1.07349 * u(2 * n) - 0.18199 * u(3 * n)) / g;
        }, values: [], correction: 1 }, hft95: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return (1 - 1.9383379 * u(n) + 1.3045202 * u(2 * n) - 0.402827 * u(3 * n) + 0.0350665 * u(4 * n)) / g;
        }, values: [], correction: 1 }, hft90d: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return (1 - 1.942604 * u(n) + 1.340318 * u(2 * n) - 0.440811 * u(3 * n) + 0.043097 * u(4 * n)) / g;
        }, values: [], correction: 1 }, hft116d: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return (1 - 1.9575375 * u(n) + 1.4780705 * u(2 * n) - 0.6367431 * u(3 * n) + 0.1228389 * u(4 * n) - 66288e-7 * u(5 * n)) / g;
        }, values: [], correction: 1 }, hft144d: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return (1 - 1.96760033 * u(n) + 1.57983607 * u(2 * n) - 0.81123644 * u(3 * n) + 0.22583558 * u(4 * n) - 0.02773848 * u(5 * n) + 9036e-7 * u(6 * n)) / g;
        }, values: [], correction: 1 }, hft196d: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return (1 - 1.97441842 * u(n) + 1.65409888 * u(2 * n) - 0.95788186 * u(3 * n) + 0.3367342 * u(4 * n) - 0.06364621 * u(5 * n) + 521942e-8 * u(6 * n) - 10599e-8 * u(7 * n)) / g;
        }, values: [], correction: 1 }, hft223d: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return (1 - 1.98298997309 * u(n) + 1.75556083063 * u(2 * n) - 1.19037717712 * u(3 * n) + 0.56155440797 * u(4 * n) - 0.17296769663 * u(5 * n) + 0.03233247087 * u(6 * n) - 0.00324954578 * u(7 * n) + 1380104e-10 * u(8 * n) - 132725e-11 * u(9 * n)) / g;
        }, values: [], correction: 1 }, hft248d: { calc: function(d, g) {
          var n = i * d / (g - 1);
          return (1 - 1.985844164102 * u(n) + 1.791176438506 * u(2 * n) - 1.282075284005 * u(3 * n) + 0.667777530266 * u(4 * n) - 0.240160796576 * u(5 * n) + 0.056656381764 * u(6 * n) - 0.008134974479 * u(7 * n) + 62454465e-11 * u(8 * n) - 19808998e-12 * u(9 * n) + 132974e-12 * u(10 * n)) / g;
        }, values: [], correction: 1 } }, M = function(d) {
          return Q[d.name].values.length !== d.N ? (d.n === 0 && (Q[d.name].values.length = 0), Q[d.name].values[d.n] = Q[d.name].correction * Q[d.name].calc(d.n, d.N, d.a), Q[d.name].values[d.n]) : Q[d.name].values;
        };
        return { forward: function(d, g) {
          var n, V, w, b, y, F, X, z, Z, U, G, H;
          w = c.buffer.length;
          var sA = { name: g, N: w, a: 0.5, n: 0 }, pA = M(sA);
          if (typeof pA == "number")
            for (n = 0; n < w; ++n)
              sA.n = n, c.buffer[n] = d[n] * M(sA);
          else
            for (n = 0; n < w; ++n)
              c.buffer[n] = d[n] * pA[n];
          for (n = w; n--; )
            c.re[n] = c.buffer[c.twiddle[n]], c.im[n] = 0;
          for (b = 1; b < w; b = y)
            for (F = 0, y = b + b, X = w / y, V = 0; V < b; V++) {
              for (z = c.cosTable[F], Z = c.sinTable[F], n = V; n < w; n += y)
                U = n + b, G = Z * c.im[U] + z * c.re[U], H = z * c.im[U] - Z * c.re[U], c.re[U] = c.re[n] - G, c.re[n] += G, c.im[U] = c.im[n] - H, c.im[n] += H;
              F += X;
            }
          return { re: c.re, im: c.im };
        }, inverse: function(d, g) {
          var n, V, w, b, y, F, X, z, Z, U, G, H;
          for (w = d.length, n = w; n--; )
            V = c.twiddle[n], c.reI[n] = d[V], c.imI[n] = -g[V];
          for (b = 1; b < w; b = y)
            for (F = 0, y = b + b, X = w / y, V = 0; V < b; V++) {
              for (z = c.cosTable[F], Z = c.sinTable[F], n = V; n < w; n += y)
                U = n + b, G = Z * c.imI[U] + z * c.reI[U], H = z * c.imI[U] - Z * c.reI[U], c.reI[U] = c.reI[n] - G, c.reI[n] += G, c.imI[U] = c.imI[n] - H, c.imI[n] += H;
              F += X;
            }
          for (n = w; n--; )
            c.buffer[n] = c.reI[n] / w;
          return c.buffer;
        }, magnitude: function(d) {
          for (var g = [], n = 0; n < d.re.length; n++)
            g.push(Math.sqrt(d.re[n] * d.re[n] + d.im[n] * d.im[n]));
          return g;
        }, magToDb: function(d) {
          for (var g = [], n = 0; n < d.length; n++)
            g.push(20 * Math.log(d[n]) * Math.LOG10E);
          return g;
        }, phase: function(d) {
          for (var g = [], n = 0; n < d.re.length; n++)
            g.push(Math.atan2(d.im[n], d.re[n]));
          return g;
        }, windows: function() {
          var d = [];
          for (var g in Q)
            d.push(g);
          return d;
        } };
      };
      o.exports = f;
    }, {}], 4: [function(r, o, h) {
      var f = function() {
        var p = function(e) {
          var s = e.Fs, v = e.Fa, l = e.Fb, i = e.order || 51, m = e.Att || 100, I = function(d) {
            for (var g = 0, n = 1, V = 1; n > 1e-6 * V; )
              g += 2, n *= d * d / (g * g), V += n;
            return V;
          };
          i / 2 - Math.floor(i / 2) == 0 && i++;
          var u, D = (i - 1) / 2, k = [], B = 0, Q = 0, M = [];
          for (k[0] = 2 * (l - v) / s, Q = 1; Q <= D; Q++)
            k[Q] = (Math.sin(2 * Q * Math.PI * l / s) - Math.sin(2 * Q * Math.PI * v / s)) / (Q * Math.PI);
          for (B = m < 21 ? 0 : m > 50 ? 0.1102 * (m - 8.7) : 0.5842 * Math.pow(m - 21, 0.4) + 0.07886 * (m - 21), u = I(B), Q = 0; Q <= D; Q++)
            M[D + Q] = k[Q] * I(B * Math.sqrt(1 - Q * Q / (D * D))) / u;
          for (Q = 0; Q < D; Q++)
            M[Q] = M[i - 1 - Q];
          return M;
        }, c = function(e) {
          var s = e.Fs, v = e.Fc, l = e.order, i = 2 * Math.PI * v / s, m = 0, I = 0, u = [];
          for (m = 0; m <= l; m++)
            m - l / 2 == 0 ? u[m] = i : (u[m] = Math.sin(i * (m - l / 2)) / (m - l / 2), u[m] *= 0.54 - 0.46 * Math.cos(2 * Math.PI * m / l)), I += u[m];
          for (m = 0; m <= l; m++)
            u[m] /= I;
          return u;
        }, C = function(e) {
          var s;
          for (s = 0; s < e.length; s++)
            e[s] = -e[s];
          return e[(e.length - 1) / 2]++, e;
        }, a = function(e) {
          for (var s = c({ order: e.order, Fs: e.Fs, Fc: e.F2 }), v = C(c({ order: e.order, Fs: e.Fs, Fc: e.F1 })), l = [], i = 0; i < s.length; i++)
            l.push(s[i] + v[i]);
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
          return p(e);
        }, available: function() {
          return ["lowpass", "highpass", "bandstop", "bandpass", "kbFilter"];
        } };
      };
      o.exports = f;
    }, {}], 5: [function(r, o, h) {
      var f = r("./utils"), p = f.runMultiFilter, c = f.runMultiFilterReverse, C = f.complex, a = f.evaluatePhase, e = function(s) {
        var v = s, l = [], i = 0;
        for (i = 0; i < v.length; i++)
          l[i] = { re: v[i], im: 0 };
        var m = function(B) {
          var Q, M = [];
          for (Q = 0; Q < B; Q++)
            M.push(0);
          return { buf: M, pointer: 0 };
        }, I = m(v.length - 1), u = function(B, Q) {
          Q.buf[Q.pointer] = B;
          var M = 0;
          for (i = 0; i < Q.buf.length; i++)
            M += v[i] * Q.buf[(Q.pointer + i) % Q.buf.length];
          return Q.pointer = (Q.pointer + 1) % Q.buf.length, M;
        }, D = function(B) {
          var Q = m(v.length - 1);
          return p(B, Q, u);
        }, k = function(B) {
          for (var Q = B.Fs, M = B.Fr, d = -Math.PI * (M / Q) * 2, g = { re: 0, im: 0 }, n = 0; n < v.length - 1; n++)
            g = C.add(g, C.mul(l[n], { re: Math.cos(d * n), im: Math.sin(d * n) }));
          var V = C.magnitude(g);
          return { magnitude: V, phase: C.phase(g), dBmagnitude: 20 * Math.log(V) * Math.LOG10E };
        };
        return { responsePoint: function(B) {
          return k(B);
        }, response: function(B) {
          B = B || 100;
          var Q = [], M = 0, d = 2 * B;
          for (M = 0; M < B; M++)
            Q[M] = k({ Fs: d, Fr: M });
          return a(Q), Q;
        }, simulate: function(B) {
          return D(B);
        }, singleStep: function(B) {
          return u(B, I);
        }, multiStep: function(B, Q) {
          return p(B, I, u, Q);
        }, filtfilt: function(B, Q) {
          return c(p(B, I, u, Q), I, u, !0);
        }, reinit: function() {
          I = m(v.length - 1);
        } };
      };
      o.exports = e;
    }, { "./utils": 9 }], 6: [function(r, o, h) {
      var f = function() {
        var p = function(a, e) {
          var s = a.Q, v = a.Fc, l = a.Fs, i = {}, m = 2 * Math.PI * v / l;
          return a.BW ? i.alpha = Math.sin(m) * Math.sinh(Math.log(2) / 2 * a.BW * m / Math.sin(m)) : i.alpha = Math.sin(m) / (2 * s), i.cw = Math.cos(m), i.a0 = 1 + i.alpha, e.a0 = i.a0, e.a.push(-2 * i.cw / i.a0), e.k = 1, e.a.push((1 - i.alpha) / i.a0), i;
        }, c = function(a) {
          var e = a.Q, s = a.Fc, v = a.Fs, l = {}, i = 2 * Math.PI * s / v;
          return l.alpha = Math.sin(i) / (2 * e), l.cw = Math.cos(i), l.A = Math.pow(10, a.gain / 40), l;
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
          var s = a.as, v = a.bs, l = 2 * Math.PI * a.Fc / a.Fs, i = -s / (2 * v);
          return e.a.push(2 * -Math.pow(Math.E, i * l) * Math.cos(-l * Math.sqrt(Math.abs(Math.pow(s, 2) / (4 * Math.pow(v, 2)) - 1 / v)))), e.a.push(Math.pow(Math.E, 2 * i * l)), a.preGain ? (e.b.push(1), e.k = e.a0 + e.a[0] + e.a[1]) : (e.b.push(e.a0 + e.a[0] + e.a[1]), e.k = 1), e.b.push(0), e.b.push(0), e;
        }, lowpassBT: function(a) {
          var e = C();
          return a.Q = 1, e.wp = Math.tan(2 * Math.PI * a.Fc / (2 * a.Fs)), e.wp2 = e.wp * e.wp, a.BW && delete a.BW, e.k = 1, e.a0 = 3 * e.wp + 3 * e.wp2 + 1, e.b.push(3 * e.wp2 * a.Q / e.a0), e.b.push(2 * e.b[0]), e.b.push(e.b[0]), e.a.push((6 * e.wp2 - 2) / e.a0), e.a.push((3 * e.wp2 - 3 * e.wp + 1) / e.a0), e;
        }, highpassBT: function(a) {
          var e = C();
          return a.Q = 1, e.wp = Math.tan(2 * Math.PI * a.Fc / (2 * a.Fs)), e.wp2 = e.wp * e.wp, a.BW && delete a.BW, e.k = 1, e.a0 = e.wp + e.wp2 + 3, e.b.push(3 * a.Q / e.a0), e.b.push(2 * e.b[0]), e.b.push(e.b[0]), e.a.push((2 * e.wp2 - 6) / e.a0), e.a.push((e.wp2 - e.wp + 3) / e.a0), e;
        }, lowpass: function(a) {
          var e = C();
          a.BW && delete a.BW;
          var s = p(a, e);
          return a.preGain ? (e.k = 0.5 * (1 - s.cw), e.b.push(1 / s.a0)) : (e.k = 1, e.b.push((1 - s.cw) / (2 * s.a0))), e.b.push(2 * e.b[0]), e.b.push(e.b[0]), e;
        }, highpass: function(a) {
          var e = C();
          a.BW && delete a.BW;
          var s = p(a, e);
          return a.preGain ? (e.k = 0.5 * (1 + s.cw), e.b.push(1 / s.a0)) : (e.k = 1, e.b.push((1 + s.cw) / (2 * s.a0))), e.b.push(-2 * e.b[0]), e.b.push(e.b[0]), e;
        }, allpass: function(a) {
          var e = C();
          a.BW && delete a.BW;
          var s = p(a, e);
          return e.k = 1, e.b.push((1 - s.alpha) / s.a0), e.b.push(-2 * s.cw / s.a0), e.b.push((1 + s.alpha) / s.a0), e;
        }, bandpassQ: function(a) {
          var e = C(), s = p(a, e);
          return e.k = 1, e.b.push(s.alpha * a.Q / s.a0), e.b.push(0), e.b.push(-e.b[0]), e;
        }, bandpass: function(a) {
          var e = C(), s = p(a, e);
          return e.k = 1, e.b.push(s.alpha / s.a0), e.b.push(0), e.b.push(-e.b[0]), e;
        }, bandstop: function(a) {
          var e = C(), s = p(a, e);
          return e.k = 1, e.b.push(1 / s.a0), e.b.push(-2 * s.cw / s.a0), e.b.push(e.b[0]), e;
        }, peak: function(a) {
          var e = C(), s = c(a);
          return e.k = 1, e.a0 = 1 + s.alpha / s.A, e.a.push(-2 * s.cw / e.a0), e.a.push((1 - s.alpha / s.A) / e.a0), e.b.push((1 + s.alpha * s.A) / e.a0), e.b.push(-2 * s.cw / e.a0), e.b.push((1 - s.alpha * s.A) / e.a0), e;
        }, lowshelf: function(a) {
          var e = C();
          a.BW && delete a.BW;
          var s = c(a);
          e.k = 1;
          var v = 2 * Math.sqrt(s.A) * s.alpha;
          return e.a0 = s.A + 1 + (s.A - 1) * s.cw + v, e.a.push(-2 * (s.A - 1 + (s.A + 1) * s.cw) / e.a0), e.a.push((s.A + 1 + (s.A - 1) * s.cw - v) / e.a0), e.b.push(s.A * (s.A + 1 - (s.A - 1) * s.cw + v) / e.a0), e.b.push(2 * s.A * (s.A - 1 - (s.A + 1) * s.cw) / e.a0), e.b.push(s.A * (s.A + 1 - (s.A - 1) * s.cw - v) / e.a0), e;
        }, highshelf: function(a) {
          var e = C();
          a.BW && delete a.BW;
          var s = c(a);
          e.k = 1;
          var v = 2 * Math.sqrt(s.A) * s.alpha;
          return e.a0 = s.A + 1 - (s.A - 1) * s.cw + v, e.a.push(2 * (s.A - 1 - (s.A + 1) * s.cw) / e.a0), e.a.push((s.A + 1 - (s.A - 1) * s.cw - v) / e.a0), e.b.push(s.A * (s.A + 1 + (s.A - 1) * s.cw + v) / e.a0), e.b.push(-2 * s.A * (s.A - 1 + (s.A + 1) * s.cw) / e.a0), e.b.push(s.A * (s.A + 1 + (s.A - 1) * s.cw - v) / e.a0), e;
        }, aweighting: function(a) {
          var e = C();
          e.k = 1;
          var s = 2 * Math.PI * a.Fc / a.Fs, v = 2 * Math.tan(s / 2), l = a.Q, i = Math.pow(v, 2);
          return e.a0 = 4 * l + i * l + 2 * v, e.a.push(2 * i * l - 8 * l), e.a.push(4 * l + i * l - 2 * v), e.b.push(i * l), e.b.push(2 * i * l), e.b.push(i * l), e;
        } };
      };
      o.exports = f;
    }, {}], 7: [function(r, o, h) {
      var f = r("./utils"), p = f.complex, c = f.runMultiFilter, C = f.runMultiFilterReverse, a = f.evaluatePhase, e = function(s) {
        for (var v = s, l = { re: 1, im: 0 }, i = [], m = [], I = 0; I < v.length; I++) {
          i[I] = {};
          var u = v[I];
          i[I].b0 = { re: u.b[0], im: 0 }, i[I].b1 = { re: u.b[1], im: 0 }, i[I].b2 = { re: u.b[2], im: 0 }, i[I].a1 = { re: u.a[0], im: 0 }, i[I].a2 = { re: u.a[1], im: 0 }, i[I].k = { re: u.k, im: 0 }, i[I].z = [0, 0], m[I] = {}, m[I].b1 = u.b[1] / u.b[0], m[I].b2 = u.b[2] / u.b[0], m[I].a1 = u.a[0], m[I].a2 = u.a[1];
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
          var y = w.Fs, F = w.Fr, X = -Math.PI * (F / y) * 2, z = { re: Math.cos(X), im: Math.sin(X) }, Z = p.mul(b.k, p.add(b.b0, p.mul(z, p.add(b.b1, p.mul(b.b2, z))))), U = p.add(l, p.mul(z, p.add(b.a1, p.mul(b.a2, z)))), G = p.div(Z, U);
          return { magnitude: p.magnitude(G), phase: p.phase(G) };
        }, Q = function(w) {
          var b = 0, y = { magnitude: 1, phase: 0 };
          for (b = 0; b < i.length; b++) {
            var F = B(w, i[b]);
            y.magnitude *= F.magnitude, y.phase += F.phase;
          }
          return y.dBmagnitude = 20 * Math.log(y.magnitude) * Math.LOG10E, y;
        }, M = function() {
          for (var w = [], b = 0; b < v.length; b++)
            w[b] = { b0: { re: u.b[0], im: 0 }, b1: { re: u.b[1], im: 0 }, b2: { re: u.b[2], im: 0 }, a1: { re: u.a[0], im: 0 }, a2: { re: u.a[1], im: 0 }, k: { re: u.k, im: 0 }, z: [0, 0] };
          return w;
        }, d = function(w) {
          var b = M();
          return c(w, b, k);
        }, g = function(w, b) {
          var y = {}, F = [], X = 0;
          for (X = 0; X < b; X++)
            F.push(w(X));
          y.out = d(F);
          var z = !1, Z = !1;
          for (X = 0; X < b - 1; X++)
            if (y.out[X] > y.out[X + 1] && !z && (z = !0, y.max = { sample: X, value: y.out[X] }), z && !Z && y.out[X] < y.out[X + 1]) {
              Z = !0, y.min = { sample: X, value: y.out[X] };
              break;
            }
          return y;
        }, n = function(w, b) {
          var y = Math.pow(w / 2, 2) - b;
          return y < 0 ? [{ re: -w / 2, im: Math.sqrt(Math.abs(y)) }, { re: -w / 2, im: -Math.sqrt(Math.abs(y)) }] : [{ re: -w / 2 + Math.sqrt(y), im: 0 }, { re: -w / 2 - Math.sqrt(y), im: 0 }];
        }, V = function() {
          for (var w = [], b = 0; b < m.length; b++)
            w[b] = {}, w[b].z = n(m[b].b1, m[b].b2), w[b].p = n(m[b].a1, m[b].a2);
          return w;
        };
        return { singleStep: function(w) {
          return k(w, i);
        }, multiStep: function(w, b) {
          return c(w, i, k, b);
        }, filtfilt: function(w, b) {
          return C(c(w, i, k, b), i, k, !0);
        }, simulate: function(w) {
          return d(w);
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
          for (I = 0; I < i.length; I++)
            i[I].z = [0, 0];
        } };
      };
      o.exports = e;
    }, { "./utils": 9 }], 8: [function(r, o, h) {
      var f = function(p) {
        var c, C = p, a = [], e = function(i) {
          for (c = 0; c < i.steps; c++)
            a.push(C.singleStep((Math.random() - 0.5) * i.pp + i.offset));
        }, s = function(i) {
          var m = i.offset + i.pp, I = i.offset - i.pp;
          for (c = 0; c < i.steps; c++)
            c % 200 < 100 ? a.push(C.singleStep(m)) : a.push(C.singleStep(I));
        }, v = function(i) {
          var m = i.offset + i.pp, I = i.offset - i.pp;
          for (c = 0; c < i.steps; c++)
            c % 100 == 0 ? a.push(C.singleStep(m)) : a.push(C.singleStep(I));
        }, l = function(i) {
          var m = i.offset + i.pp, I = i.offset - i.pp, u = I, D = (m - I) / 100;
          for (c = 0; c < i.steps; c++)
            c % 200 < 100 ? u += D : u -= D, a.push(C.singleStep(u));
        };
        return { randomStability: function(i) {
          for (C.reinit(), a.length = 0, e(i), c = i.setup; c < a.length; c++)
            if (a[c] > i.maxStable || a[c] < i.minStable)
              return a[c];
          return !0;
        }, directedRandomStability: function(i) {
          C.reinit(), a.length = 0;
          var m;
          for (m = 0; m < i.tests; m++) {
            var I = Math.random();
            I < 0.25 ? e(i) : I < 0.5 ? s(i) : I < 0.75 ? v(i) : l(i);
          }
          for (e(i), c = i.setup; c < a.length; c++)
            if (a[c] > i.maxStable || a[c] < i.minStable)
              return a[c];
          return !0;
        }, evaluateBehavior: function() {
        } };
      };
      o.exports = f;
    }, {}], 9: [function(r, o, h) {
      h.evaluatePhase = function(a) {
        var e = 0, s = 0, v = Math.PI, l = 2 * v, i = [];
        for (s = 0; s < a.length; s++)
          i.push(a[s].phase);
        for (a[0].unwrappedPhase = a[0].phase, a[0].groupDelay = 0, s = 1; s < i.length; s++) {
          var m = i[s] - i[s - 1];
          if (m > v)
            for (e = s; e < i.length; e++)
              i[e] -= l;
          else if (m < -v)
            for (e = s; e < i.length; e++)
              i[e] += l;
          i[s] < 0 ? a[s].unwrappedPhase = -i[s] : a[s].unwrappedPhase = i[s], a[s].phaseDelay = a[s].unwrappedPhase / (s / a.length), a[s].groupDelay = (a[s].unwrappedPhase - a[s - 1].unwrappedPhase) / (v / a.length), a[s].groupDelay < 0 && (a[s].groupDelay = -a[s].groupDelay);
        }
        a[0].magnitude !== 0 ? (a[0].phaseDelay = a[1].phaseDelay, a[0].groupDelay = a[1].groupDelay) : (a[0].phaseDelay = a[2].phaseDelay, a[0].groupDelay = a[2].groupDelay, a[1].phaseDelay = a[2].phaseDelay, a[1].groupDelay = a[2].groupDelay);
      }, h.runMultiFilter = function(a, e, s, v) {
        var l = [];
        v && (l = a);
        var i;
        for (i = 0; i < a.length; i++)
          l[i] = s(a[i], e);
        return l;
      }, h.runMultiFilterReverse = function(a, e, s, v) {
        var l = [];
        v && (l = a);
        var i;
        for (i = a.length - 1; i >= 0; i--)
          l[i] = s(a[i], e);
        return l;
      };
      var f = function(a, e) {
        for (var s = !0; s; ) {
          var v = a, l = e;
          if (s = !1, l || (l = 1), v !== Math.floor(v) || l !== Math.floor(l))
            return 1;
          if (v === 0 || v === 1)
            return l;
          a = v - 1, e = l * v, s = !0;
        }
      };
      h.besselFactors = function(a) {
        for (var e = [], s = 0; s < a + 1; s++) {
          var v = f(2 * a - s), l = Math.pow(2, a - s) * f(s) * f(a - s);
          e.unshift(Math.floor(v / l));
        }
        return e;
      };
      var p = function(a, e) {
        for (var s = 0, v = 0; v < e; v++) {
          var l = 1 / Math.pow(2, v + 1);
          a > l && (a -= l, s += l);
        }
        return s;
      }, c = function(a, e) {
        return a & Math.pow(2, e);
      }, C = function(a, e, s) {
        var v = Math.abs(a), l = a - v;
        return { number: c(v, e).toString(), fraction: p(l, s).toString(), numberBits: e, fractionBits: s };
      };
      h.fixedPoint = { convert: function(a, e, s) {
        return C(a, e, s);
      }, add: function(a, e) {
      }, sub: function(a, e) {
      }, mul: function(a, e) {
      }, div: function(a, e) {
      } }, h.complex = { div: function(a, e) {
        var s = a.re, v = a.im, l = e.re, i = e.im, m = l * l + i * i;
        return { re: (s * l + v * i) / m, im: (v * l - s * i) / m };
      }, mul: function(a, e) {
        var s = a.re, v = a.im, l = e.re, i = e.im;
        return { re: s * l - v * i, im: (s + v) * (l + i) - s * l - v * i };
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
})(yA);
var At = yA.exports;
const eA = /* @__PURE__ */ $e(At), P = 60, oA = 0.95, cA = 0.995;
class et {
  constructor(A) {
    E(this, "session");
    E(this, "iirFilter");
    E(this, "accelerometerDrift");
    E(this, "velocity");
    E(this, "position");
    E(this, "orientation");
    E(this, "motionStatus");
    E(this, "accelerometer");
    E(this, "orientationSensor");
    this.session = A;
    const o = new eA.CalcCascades().lowpass({
      order: 3,
      characteristic: "butterworth",
      Fs: P,
      Fc: 5,
      gain: 0,
      preGain: !1
    });
    this.iirFilter = {
      x: new eA.IirFilter(o),
      y: new eA.IirFilter(o),
      z: new eA.IirFilter(o)
    }, this.accelerometerDrift = N(), this.velocity = N(), this.position = N(), this.orientation = tA(), this.motionStatus = {
      acceleration: {
        error: null
      },
      gyro: {
        error: null
      }
    };
  }
  readingHandler() {
    var o, h, f, p;
    const A = BA(
      ((o = this.accelerometer) == null ? void 0 : o.x) ?? 0,
      -(((h = this.accelerometer) == null ? void 0 : h.z) ?? 0),
      ((f = this.accelerometer) == null ? void 0 : f.y) ?? 0,
      1
    ), r = ((p = this.orientationSensor) == null ? void 0 : p.quaternion) ?? [0, 0, 0, 1];
    this.orientation = rA(
      r[0],
      r[1],
      r[2],
      r[3]
    ), He(A, A, this.orientation), A[0] = this.iirFilter.x.singleStep(A[0]), A[1] = this.iirFilter.y.singleStep(A[1]), A[2] = this.iirFilter.z.singleStep(A[2]), this.velocity[0] += A[0] / P, this.velocity[1] += A[1] / P, this.velocity[2] += A[2] / P, this.position[0] += this.velocity[0] / P * 1e3, this.position[1] += this.velocity[1] / P * 1e3, this.position[2] += this.velocity[2] / P * 1e3, this.velocity[0] *= oA, this.velocity[1] *= oA, this.velocity[2] *= oA, this.position[0] *= cA, this.position[1] *= cA, this.position[2] *= cA, this.session.poser.readjustElements();
  }
  async init() {
    if (LinearAccelerationSensor && RelativeOrientationSensor)
      try {
        this.accelerometer = new LinearAccelerationSensor({
          frequency: P,
          referenceFrame: "screen"
        }), this.accelerometer.addEventListener("error", (A) => {
          var r;
          A.error.name === "NotAllowedError" ? this.motionStatus.acceleration = {
            error: A.error
          } : A.error.name === "NotReadableError" && (this.motionStatus.acceleration = {
            error: A.error
          }), (r = this.accelerometer) == null || r.stop(), this.session.updateStatus();
        }), this.orientationSensor = new RelativeOrientationSensor({
          frequency: P,
          referenceFrame: "screen"
        }), this.orientationSensor.addEventListener("error", (A) => {
          var r;
          A.error.name === "NotAllowedError" ? this.motionStatus.gyro = {
            error: A.error
          } : A.error.name === "NotReadableError" && (this.motionStatus.gyro = {
            error: A.error
          }), (r = this.orientationSensor) == null || r.stop(), this.session.updateStatus();
        }), this.accelerometer.addEventListener("reading", () => {
          this.readingHandler();
        }), this.run();
      } catch (A) {
        A instanceof DOMException && (A.name === "SecurityError" ? this.motionStatus = {
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
        });
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
    if (!this.motionStatus.acceleration.error && !this.motionStatus.gyro.error && this.orientation) {
      const r = rA(
        A.orientation[0],
        -A.orientation[1],
        -A.orientation[2],
        A.orientation[3]
      ), o = j();
      vA(o, r), dA(
        o,
        o,
        A.position
      );
      const h = rA(
        this.orientation[0],
        -this.orientation[1],
        -this.orientation[2],
        this.orientation[3]
      ), f = j();
      vA(f, h), dA(f, f, this.position), Oe(f, f);
      const p = j();
      return bA(
        p,
        f,
        o
      ), p;
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
var kA = /* @__PURE__ */ ((t) => (t[t.CALIBRATION = 0] = "CALIBRATION", t[t.DETECTION = 1] = "DETECTION", t))(kA || {}), EA = /* @__PURE__ */ ((t) => (t[t.statusChanged = 0] = "statusChanged", t[t.motion = 1] = "motion", t))(EA || {});
class tt {
  constructor(A = "default") {
    E(this, "initialized", !1);
    E(this, "workerInitialized", !1);
    E(this, "name");
    E(this, "state");
    E(this, "feed");
    E(this, "poser");
    E(this, "motion");
    E(this, "calibration");
    E(this, "detector");
    E(this, "eventCallback");
    E(this, "focusEventRegistration");
    E(this, "blurEventRegistration");
    E(this, "setup");
    E(this, "canvas");
    E(this, "context2d");
    E(this, "worker");
    this.initialized = !1, this.name = A, this.state = 0, this.feed = new We(this), this.poser = new _e(this), this.motion = new et(this), this.calibration = new Ke(this), this.detector = new Ue(this), this.focusEventRegistration = async () => {
      await this.feed.run(), this.motion.run();
    }, this.blurEventRegistration = () => {
      this.feed.stop(), this.motion.stop();
    }, this.setup = {
      show: !0
    }, this.calibration.loadCameraCalibration();
  }
  updateStatus() {
    const A = {
      initialized: this.initialized,
      feed: this.feed.feedStatus,
      motion: this.motion.motionStatus,
      calibration: this.calibration.calibrationStatus,
      setup: this.setup
    };
    this.eventCallback && this.eventCallback({ name: 0, status: A });
  }
  loadSetup() {
    const A = window.localStorage.getItem(`vuexr/${this.name}/setup`);
    return A ? JSON.parse(A) : {
      show: !0
    };
  }
  storeSetup() {
    window.localStorage.setItem(
      `vuexr/${this.name}/setup`,
      JSON.stringify(this.setup)
    );
  }
  showSetup(A) {
    this.setup.show = A, this.storeSetup(), this.updateStatus();
  }
  async init(A, r) {
    this.setup = this.loadSetup(), this.canvas = A, this.context2d = this.canvas.getContext("2d", { willReadFrequently: !0 }), this.eventCallback = r, this.initialized || (await Promise.all([
      this.feed.init(),
      this.motion.init(),
      this.initWorker()
    ]), this.initialized = !0), this.eventCallback({
      name: 0
      /* statusChanged */
    });
  }
  async initWorker() {
    return new Promise((A) => {
      this.worker = new Worker(new URL("/assets/worker-2504f1ce.js", self.location), {
        type: "module"
      }), this.worker.onmessage = (r) => {
        r.data.operation === x.WORKER_READY ? (this.initialized = !0, this.workerInitialized = !0, A()) : r.data.operation === x.WORKER_FAILED ? (this.workerInitialized = !0, A()) : this.workerHandler(r);
      };
    });
  }
  workerHandler(A) {
    A.data.operation === x.DETECT ? this.detector.detectionFinished(A.data) : A.data.operation === x.FIND_CHESSBOARD_CORNERS_CAPTURED ? this.calibration.findChessBoardCornersCaptured() : A.data.operation === x.FIND_CHESSBOARD_CORNERS_READY ? this.calibration.findChessBoardCornersCaptureReady() : A.data.operation === x.FIND_CHESSBOARD_CORNERS_NOT_READY ? this.calibration.findChessBoardCornersCaptureNotReady() : A.data.operation === x.CALIBRATE && this.calibration.calibrationFinished(A.data);
  }
  async run() {
    await this.feed.run(), await this.motion.run(), window.addEventListener("focus", this.focusEventRegistration), window.addEventListener("blur", this.blurEventRegistration);
  }
  pause() {
    window.removeEventListener("focus", this.focusEventRegistration), window.removeEventListener("blur", this.blurEventRegistration), this.feed.stop(), this.motion.stop();
  }
  calibrate() {
    var A, r;
    this.calibration.calibrate({
      width: ((A = this.canvas) == null ? void 0 : A.width) ?? 0,
      height: ((r = this.canvas) == null ? void 0 : r.height) ?? 0
    }), this.state = 1;
  }
  resetCalibration() {
    this.calibration.resetCalibrationPoints(), this.calibration.resetCameraCalibration(), this.state = 0;
  }
  process() {
    this.initialized && (this.state === 0 ? this.calibration.findChessBoardCorners() : this.state === 1 && this.detector.detect());
  }
}
const at = { class: "ar-view" }, st = {
  key: 0,
  class: "controls-container"
}, it = {
  key: 1,
  class: "setup-container"
}, nt = {
  key: 2,
  class: "loading-text"
}, rt = /* @__PURE__ */ $({
  __name: "ARView",
  props: {
    name: {}
  },
  setup(t) {
    const A = t, o = fA("vuexr").requestSession(A.name);
    GA("session", o);
    const h = mA({
      status: {},
      trackedMarkers: []
    }), f = _(), p = _(), c = Symbol();
    function C() {
      o.showSetup(!1);
    }
    function a() {
      o.showSetup(!0);
    }
    function e(l) {
      l.name === EA.statusChanged && l.status && (h.status = l.status);
    }
    function s() {
      var u, D, k, B;
      const l = (((u = f.value) == null ? void 0 : u.width) ?? 0) / (((D = f.value) == null ? void 0 : D.height) ?? 0), i = ((k = p.value) == null ? void 0 : k.clientWidth) ?? 0, m = ((B = p.value) == null ? void 0 : B.clientHeight) ?? 0, I = i / m;
      if (l >= I) {
        const Q = i, M = i / l;
        f.value && (f.value.style.width = `${Q}px`, f.value.style.height = `${M}px`);
      } else {
        const Q = m * l, M = m;
        f.value && (f.value.style.width = `${Q}px`, f.value.style.height = `${M}px`);
      }
    }
    const v = () => {
      s();
    };
    return hA(async () => {
      await o.init(f.value, (l) => {
        e(l);
      }), o.poser.registerView(c, (l) => {
        h.trackedMarkers = l;
      }), await o.run(), await s(), window.addEventListener("resize", v);
    }), IA(() => {
      window.removeEventListener("resize", v), o.poser.unregisterView(c), o.pause();
    }), (l, i) => {
      var m, I, u, D;
      return R(), S("div", {
        class: "ar-view-wrapper",
        ref_key: "wrapper",
        ref: p
      }, [
        K("div", at, [
          K("canvas", {
            class: "ar-canvas",
            ref_key: "canvas",
            ref: f
          }, null, 512),
          K("div", {
            style: PA({
              opacity: h.status.initialized && ((m = h.status.calibration) != null && m.calibrated) ? 1 : 0
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
        h.status.initialized && ((I = h.status.feed) != null && I.selected) && !((u = h.status.calibration) != null && u.calibrated) ? (R(), S("div", st, [
          QA(Xe, {
            session: uA(o),
            status: h.status
          }, null, 8, ["session", "status"])
        ])) : J("", !0),
        h.status.initialized ? (R(), S("div", it, [
          (D = h.status.setup) != null && D.show ? (R(), xA(Be, {
            key: 0,
            session: uA(o),
            status: h.status,
            onClose: C
          }, null, 8, ["session", "status"])) : J("", !0)
        ])) : (R(), S("div", nt, "Loading…"))
      ], 512);
    };
  }
});
const ot = /* @__PURE__ */ aA(rt, [["__scopeId", "data-v-e53aa743"]]), ct = { key: 0 }, lt = /* @__PURE__ */ $({
  __name: "ARElement",
  props: {
    id: {},
    timeout: { default: 1e3 },
    markerSize: { default: 50 }
  },
  setup(t) {
    const A = t, r = mA({
      show: !1,
      timeoutHandler: null,
      tracked: !1
    }), o = fA("session"), h = _(null);
    return hA(() => {
      o.poser.registerElement(
        A.id.toString(),
        h.value,
        A.markerSize,
        (f) => {
          r.tracked = f ?? !1, f ? (r.show = !0, r.timeoutHandler != null && (window.clearTimeout(r.timeoutHandler), r.timeoutHandler = null)) : r.timeoutHandler = window.setTimeout(() => {
            r.show = !1;
          }, A.timeout);
        }
      );
    }), IA(() => {
      o.poser.unregisterElement(A.id.toString());
    }), (f, p) => (R(), S("div", {
      class: "element",
      ref_key: "element",
      ref: h
    }, [
      QA(JA, { name: "fade" }, {
        default: NA(() => [
          r.show ? (R(), S("div", ct, [
            CA(f.$slots, "default", {
              tracked: r.tracked
            }, void 0, !0)
          ])) : J("", !0)
        ]),
        _: 3
      })
    ], 512));
  }
});
const ut = /* @__PURE__ */ aA(lt, [["__scopeId", "data-v-ca5da758"]]), ht = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAByYAAAUyCAIAAADEGwRQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2AkGFAQH++VSRAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABAElEQVR4nOzcsZGDWBRFweXXmIQh5R+QFMbYsDGM6qyQ9nX7VD2Di3EMtvM8/wEAAAAAoLCuPgAAAAAA4P9DcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAyPy88c7/fn89nfgqf7Ha7PR6Pq6/gfcx8GhsfyMynMfNpbHwgM5/GzKexcfgu23mef35m2/6LU/hwL7wqfC8zH8jGpzHzgcx8FBufycxHMfOBbBy+ocs1TAAAAQBJREFUiB8LAAAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAJf0XsMAAAEASURBVAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJATQl4pAAABAElEQVSRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAZyIz5QAAAQBJREFUAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISJcJGVcAAAEASURBVK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAy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", ft = ["src"], pt = /* @__PURE__ */ $({
  __name: "ARChessboard",
  setup(t) {
    return (A, r) => (R(), S("img", {
      alt: "Chessboard pattern for camera calibration",
      src: uA(ht),
      style: { "max-width": "100%", "max-height": "100%" }
    }, null, 8, ft));
  }
});
class dt {
  constructor() {
    E(this, "sessions");
    this.sessions = {};
  }
  requestSession(A = "default") {
    return this.sessions[A] || (this.sessions[A] = new tt()), this.sessions[A];
  }
  removeSession(A = "default") {
    this.sessions[A].pause(), delete this.sessions[A];
  }
  async check() {
    return window.isSecureContext ? navigator.mediaDevices && ImageCapture ? (await navigator.mediaDevices.enumerateDevices()).filter((r) => r.kind === "videoinput").length ? {
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
const mt = {
  install(t) {
    t.component("ArView", ot), t.component("ArElement", ut), t.component("ArChessboard", pt);
    const A = new dt();
    t.config.globalProperties.$vuexr = A, t.provide("vuexr", A);
  }
};
export {
  mt as VueXR
};
