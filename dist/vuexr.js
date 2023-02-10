var EA = Object.defineProperty;
var FA = (A, e, r) => e in A ? EA(A, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : A[e] = r;
var E = (A, e, r) => (FA(A, typeof e != "symbol" ? e + "" : e, r), r);
import { defineComponent as AA, ref as $, computed as DA, onMounted as hA, onUpdated as RA, openBlock as R, createElementBlock as S, createElementVNode as K, createTextVNode as L, withDirectives as SA, Fragment as VA, renderList as XA, unref as tA, toDisplayString as uA, vModelSelect as KA, createCommentVNode as J, createStaticVNode as UA, pushScopeId as zA, popScopeId as OA, inject as fA, provide as xA, reactive as mA, onUnmounted as IA, normalizeStyle as ZA, renderSlot as CA, createVNode as QA, createBlock as GA, Transition as PA, withCtx as JA } from "vue";
const q = (A) => (zA("data-v-bf4ce744"), A = A(), OA(), A), NA = { class: "setup" }, HA = { key: 0 }, jA = { key: 0 }, TA = /* @__PURE__ */ UA('<h2 class="title" data-v-bf4ce744>Camera Calibration</h2><p data-v-bf4ce744> To make VueXR know how to project virtual elements to the real world, we have to calibrate your camera first. </p><ol data-v-bf4ce744><li data-v-bf4ce744> Print or display this <a href="https://docs.opencv.org/master/pattern.png" target="_blank" data-v-bf4ce744>chessboard pattern</a> on another device. </li><li data-v-bf4ce744>Take a steady aim at the pattern with your camera.</li><li data-v-bf4ce744>Press the <strong data-v-bf4ce744>Capture</strong> button below.</li><li data-v-bf4ce744>Repeat for at least 4 other different perspectives.</li><li data-v-bf4ce744>Press the <b data-v-bf4ce744>Calibrate</b> button.</li></ol>', 3), qA = { style: { "margin-top": "20px", "text-align": "center" } }, LA = { key: 1 }, YA = /* @__PURE__ */ q(() => /* @__PURE__ */ K("h2", { class: "title" }, "AR Setup", -1)), WA = { class: "status-line" }, _A = ["title"], $A = {
  key: 1,
  class: "status-value"
}, Ae = /* @__PURE__ */ q(() => /* @__PURE__ */ K("option", {
  disabled: "",
  value: ""
}, "Please select a Camera", -1)), ee = ["value"], te = { key: 0 }, ae = { key: 1 }, ie = /* @__PURE__ */ q(() => /* @__PURE__ */ K("hr", null, null, -1)), se = { class: "status-line" }, ne = ["title"], re = {
  key: 1,
  class: "status-value"
}, oe = /* @__PURE__ */ q(() => /* @__PURE__ */ K("hr", null, null, -1)), ce = { class: "status-line" }, le = ["title"], ue = {
  key: 1,
  class: "status-value"
}, he = /* @__PURE__ */ q(() => /* @__PURE__ */ K("hr", null, null, -1)), fe = { class: "status-line" }, de = {
  key: 0,
  class: "status-value"
}, pe = {
  key: 1,
  class: "status-value"
}, ve = /* @__PURE__ */ q(() => /* @__PURE__ */ K("hr", null, null, -1)), ge = { class: "status-line" }, me = {
  key: 0,
  class: "status-value"
}, Ie = {
  key: 1,
  class: "status-value"
}, Ce = {
  key: 0,
  style: { "margin-top": "20px", "text-align": "center" }
}, Qe = {
  key: 1,
  style: { "margin-top": "20px", "text-align": "center" }
}, we = /* @__PURE__ */ AA({
  __name: "ARSetup",
  props: {
    status: null,
    session: null
  },
  emits: ["close"],
  setup(A, { emit: e }) {
    const r = A, o = $(null), h = $(!1), d = DA(() => {
      var a;
      return (a = r.status.feed) == null ? void 0 : a.available;
    });
    function f(a) {
      r.session.feed.selectCamera(o.value);
    }
    function c() {
      r.session.resetCalibration();
    }
    function C() {
      e("close");
    }
    return hA(() => {
      o.value = r.session.feed.feedStatus.selected ?? null;
    }), RA(() => {
      o.value = r.session.feed.feedStatus.selected ?? null;
    }), (a, t) => {
      var i, v, l, s;
      return R(), S("div", NA, [
        A.status ? (R(), S("div", HA, [
          K("div", {
            class: "close-button",
            onClick: C
          }, "×"),
          h.value ? (R(), S("div", jA, [
            TA,
            K("div", qA, [
              K("button", {
                class: "reset-button",
                onClick: t[0] || (t[0] = (m) => h.value = !1)
              }, " Back ")
            ])
          ])) : (R(), S("div", LA, [
            YA,
            K("div", WA, [
              L(" Video "),
              (i = A.status.feed) != null && i.error ? (R(), S("span", {
                key: 0,
                class: "status-value",
                title: A.status.feed.error.toString()
              }, "✗", 8, _A)) : (R(), S("span", $A, "✓"))
            ]),
            SA(K("select", {
              class: "camera-selection",
              style: { "margin-top": "5px" },
              "onUpdate:modelValue": t[1] || (t[1] = (m) => o.value = m),
              onChange: f
            }, [
              Ae,
              (R(!0), S(VA, null, XA(tA(d), (m) => (R(), S("option", {
                value: m.deviceId
              }, [
                m.label ? (R(), S("span", te, uA(m.label), 1)) : (R(), S("span", ae, uA(m.deviceId), 1))
              ], 8, ee))), 256))
            ], 544), [
              [KA, o.value]
            ]),
            ie,
            K("div", se, [
              L(" Accelerometer "),
              A.status.motion && A.status.motion.acceleration.error ? (R(), S("span", {
                key: 0,
                class: "status-value",
                title: A.status.motion.acceleration.error.toString()
              }, "⚠", 8, ne)) : (R(), S("span", re, "✓"))
            ]),
            oe,
            K("div", ce, [
              L(" Gyroscope "),
              A.status.motion && A.status.motion.gyro.error ? (R(), S("span", {
                key: 0,
                class: "status-value",
                title: A.status.motion.gyro.error.toString()
              }, "⚠", 8, le)) : (R(), S("span", ue, "✓"))
            ]),
            he,
            K("div", fe, [
              L(" Computer Vision "),
              A.status.initialized ? (R(), S("span", pe, "✓")) : (R(), S("span", de, "✗"))
            ]),
            ve,
            K("div", ge, [
              L(" Calibration "),
              (v = A.status.calibration) != null && v.calibrated ? (R(), S("span", Ie, "✓")) : (R(), S("span", me, "✗"))
            ]),
            (l = A.status.calibration) != null && l.calibrated ? (R(), S("div", Ce, [
              K("button", {
                class: "reset-button",
                onClick: c
              }, "Reset Calibration")
            ])) : !((s = A.status.feed) != null && s.error) && A.status.initialized ? (R(), S("div", Qe, [
              K("button", {
                class: "reset-button",
                onClick: t[2] || (t[2] = (m) => h.value = !0)
              }, " How to calibrate ")
            ])) : J("", !0)
          ]))
        ])) : J("", !0)
      ]);
    };
  }
});
const iA = (A, e) => {
  const r = A.__vccOpts || A;
  for (const [o, h] of e)
    r[o] = h;
  return r;
}, be = /* @__PURE__ */ iA(we, [["__scopeId", "data-v-bf4ce744"]]), Be = {
  key: 0,
  class: "controls"
}, Me = ["disabled"], ye = ["disabled"], ke = { key: 0 }, Ee = { key: 1 }, Fe = ["disabled"], De = {
  key: 2,
  class: "hint-text"
}, Re = {
  key: 3,
  class: "hint-text"
}, Se = /* @__PURE__ */ AA({
  __name: "ARControls",
  props: {
    status: null
  },
  setup(A) {
    const e = fA("session");
    function r() {
      e.calibration.setCaptureNextcalibrationPoints();
    }
    function o() {
      e.calibrate();
    }
    function h() {
      e.resetCalibration();
    }
    return (d, f) => {
      var c, C, a, t, i, v, l, s, m;
      return A.status ? (R(), S("div", Be, [
        (c = A.status.calibration) != null && c.calibrated ? J("", !0) : (R(), S("button", {
          key: 0,
          disabled: !((C = A.status.calibration) != null && C.captureReady),
          class: "capture-image",
          onClick: r
        }, " Capture ", 8, Me)),
        (a = A.status.calibration) != null && a.calibrated ? J("", !0) : (R(), S("button", {
          key: 1,
          disabled: (((t = A.status.calibration) == null ? void 0 : t.captures) ?? 0) < 5,
          onClick: o
        }, [
          (i = A.status.calibration) != null && i.calibrated ? (R(), S("span", Ee, "Recalibrate")) : (R(), S("span", ke, "Calibrate"))
        ], 8, ye)),
        K("button", {
          disabled: !((v = A.status.calibration) != null && v.captures) && !((l = A.status.calibration) != null && l.calibrated),
          onClick: h
        }, " Reset ", 8, Fe),
        (s = A.status.calibration) != null && s.calibrated ? (R(), S("span", Re, "Calibrated")) : (R(), S("span", De, uA((m = A.status.calibration) == null ? void 0 : m.captures) + " Captures", 1))
      ])) : J("", !0);
    };
  }
});
const Ve = /* @__PURE__ */ iA(Se, [["__scopeId", "data-v-937b8749"]]);
var _ = /* @__PURE__ */ ((A) => (A[A.RESET_CALIBRATION_POINTS = 0] = "RESET_CALIBRATION_POINTS", A[A.FIND_CHESSBOARD_CORNERS = 1] = "FIND_CHESSBOARD_CORNERS", A[A.CALIBRATE = 2] = "CALIBRATE", A[A.DETECT = 3] = "DETECT", A))(_ || {}), P = /* @__PURE__ */ ((A) => (A[A.WORKER_READY = 0] = "WORKER_READY", A[A.WORKER_FAILED = 1] = "WORKER_FAILED", A[A.FIND_CHESSBOARD_CORNERS_CAPTURED = 2] = "FIND_CHESSBOARD_CORNERS_CAPTURED", A[A.FIND_CHESSBOARD_CORNERS_READY = 3] = "FIND_CHESSBOARD_CORNERS_READY", A[A.FIND_CHESSBOARD_CORNERS_NOT_READY = 4] = "FIND_CHESSBOARD_CORNERS_NOT_READY", A[A.CALIBRATE = 5] = "CALIBRATE", A[A.DETECT = 6] = "DETECT", A))(P || {});
class Xe {
  constructor(e) {
    E(this, "session");
    E(this, "findChessboardOngoing");
    E(this, "calibrationOngoing");
    E(this, "captureNextCalibrationPoints");
    E(this, "calibrationStatus");
    E(this, "calibration", null);
    this.session = e, this.findChessboardOngoing = !1, this.calibrationOngoing = !1, this.captureNextCalibrationPoints = !1, this.calibrationStatus = {
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
    const e = window.localStorage.getItem(
      `vuexr/${this.session.name}/calibration/${this.session.feed.feedStatus.selected}`
    );
    if (e) {
      const r = JSON.parse(e);
      return this.resetCameraCalibration(), this.calibration = r, this.calibrationStatus.calibrated = !0, this.session.state = yA.DETECTION, this.session.updateStatus(), !0;
    } else
      return !1;
  }
  storeCameraCalibration() {
    return this.calibration ? (window.localStorage.setItem(
      `vuexr/${this.session.name}/calibration/${this.session.feed.feedStatus.selected}`,
      JSON.stringify(this.calibration)
    ), !0) : !1;
  }
  findChessBoardCorners(e = !0) {
    var r;
    !this.findChessboardOngoing && this.session.canvas && this.session.worker && (this.findChessboardOngoing = !0, this.session.worker.postMessage({
      operation: _.FIND_CHESSBOARD_CORNERS,
      image: (r = this.session.context2d) == null ? void 0 : r.getImageData(
        0,
        0,
        this.session.canvas.width,
        this.session.canvas.height
      ),
      captureNextCalibrationPoints: this.captureNextCalibrationPoints,
      highlight: e
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
  calibrate(e) {
    var r;
    this.calibrationOngoing || (this.calibrationOngoing = !0, (r = this.session.worker) == null || r.postMessage({
      operation: _.CALIBRATE,
      width: e.width,
      height: e.height
    }));
  }
  calibrationFinished(e) {
    e.calibration && (this.calibrationOngoing = !1, this.calibration = e.calibration, this.storeCameraCalibration(), this.calibrationStatus.calibrated = !0, this.session.updateStatus());
  }
}
class Ke {
  constructor(e) {
    E(this, "session");
    E(this, "detectionOngoing", !1);
    this.session = e;
  }
  detect(e = !0) {
    var r, o, h, d, f, c;
    if (!this.detectionOngoing) {
      this.detectionOngoing = !0;
      try {
        (c = this.session.worker) == null || c.postMessage({
          operation: _.DETECT,
          image: (h = this.session.context2d) == null ? void 0 : h.getImageData(
            0,
            0,
            ((r = this.session.canvas) == null ? void 0 : r.width) ?? 0,
            ((o = this.session.canvas) == null ? void 0 : o.height) ?? 0
          ),
          calibration: {
            cameraMatrix: JSON.parse(
              JSON.stringify((d = this.session.calibration.calibration) == null ? void 0 : d.cameraMatrix)
            ),
            distCoeffs: JSON.parse(
              JSON.stringify((f = this.session.calibration.calibration) == null ? void 0 : f.distCoeffs)
            )
          },
          highlight: e
        });
      } catch (C) {
        this.detectionOngoing = !1, console.log(C);
      }
    }
  }
  detectionFinished(e) {
    this.detectionOngoing = !1, this.session.calibration.calibrationStatus.calibrated && this.session.poser.setMarkers(e.markers ?? []);
  }
}
var Ue = 1e-6, O = typeof Float32Array < "u" ? Float32Array : Array;
Math.hypot || (Math.hypot = function() {
  for (var A = 0, e = arguments.length; e--; )
    A += arguments[e] * arguments[e];
  return Math.sqrt(A);
});
function wA() {
  var A = new O(9);
  return O != Float32Array && (A[1] = 0, A[2] = 0, A[3] = 0, A[5] = 0, A[6] = 0, A[7] = 0), A[0] = 1, A[4] = 1, A[8] = 1, A;
}
function j() {
  var A = new O(16);
  return O != Float32Array && (A[1] = 0, A[2] = 0, A[3] = 0, A[4] = 0, A[6] = 0, A[7] = 0, A[8] = 0, A[9] = 0, A[11] = 0, A[12] = 0, A[13] = 0, A[14] = 0), A[0] = 1, A[5] = 1, A[10] = 1, A[15] = 1, A;
}
function Y(A, e, r, o, h, d, f, c, C, a, t, i, v, l, s, m) {
  var I = new O(16);
  return I[0] = A, I[1] = e, I[2] = r, I[3] = o, I[4] = h, I[5] = d, I[6] = f, I[7] = c, I[8] = C, I[9] = a, I[10] = t, I[11] = i, I[12] = v, I[13] = l, I[14] = s, I[15] = m, I;
}
function ze(A, e) {
  var r = e[0], o = e[1], h = e[2], d = e[3], f = e[4], c = e[5], C = e[6], a = e[7], t = e[8], i = e[9], v = e[10], l = e[11], s = e[12], m = e[13], I = e[14], u = e[15], D = r * c - o * f, k = r * C - h * f, B = r * a - d * f, Q = o * C - h * c, M = o * a - d * c, p = h * a - d * C, g = t * m - i * s, n = t * I - v * s, V = t * u - l * s, w = i * I - v * m, b = i * u - l * m, y = v * u - l * I, F = D * y - k * b + B * w + Q * V - M * n + p * g;
  return F ? (F = 1 / F, A[0] = (c * y - C * b + a * w) * F, A[1] = (h * b - o * y - d * w) * F, A[2] = (m * p - I * M + u * Q) * F, A[3] = (v * M - i * p - l * Q) * F, A[4] = (C * V - f * y - a * n) * F, A[5] = (r * y - h * V + d * n) * F, A[6] = (I * B - s * p - u * k) * F, A[7] = (t * p - v * B + l * k) * F, A[8] = (f * b - c * V + a * g) * F, A[9] = (o * V - r * b - d * g) * F, A[10] = (s * M - m * B + u * D) * F, A[11] = (i * B - t * M - l * D) * F, A[12] = (c * n - f * w - C * g) * F, A[13] = (r * w - o * n + h * g) * F, A[14] = (m * k - s * Q - I * D) * F, A[15] = (t * Q - i * k + v * D) * F, A) : null;
}
function bA(A, e, r) {
  var o = e[0], h = e[1], d = e[2], f = e[3], c = e[4], C = e[5], a = e[6], t = e[7], i = e[8], v = e[9], l = e[10], s = e[11], m = e[12], I = e[13], u = e[14], D = e[15], k = r[0], B = r[1], Q = r[2], M = r[3];
  return A[0] = k * o + B * c + Q * i + M * m, A[1] = k * h + B * C + Q * v + M * I, A[2] = k * d + B * a + Q * l + M * u, A[3] = k * f + B * t + Q * s + M * D, k = r[4], B = r[5], Q = r[6], M = r[7], A[4] = k * o + B * c + Q * i + M * m, A[5] = k * h + B * C + Q * v + M * I, A[6] = k * d + B * a + Q * l + M * u, A[7] = k * f + B * t + Q * s + M * D, k = r[8], B = r[9], Q = r[10], M = r[11], A[8] = k * o + B * c + Q * i + M * m, A[9] = k * h + B * C + Q * v + M * I, A[10] = k * d + B * a + Q * l + M * u, A[11] = k * f + B * t + Q * s + M * D, k = r[12], B = r[13], Q = r[14], M = r[15], A[12] = k * o + B * c + Q * i + M * m, A[13] = k * h + B * C + Q * v + M * I, A[14] = k * d + B * a + Q * l + M * u, A[15] = k * f + B * t + Q * s + M * D, A;
}
function pA(A, e, r) {
  var o = r[0], h = r[1], d = r[2], f, c, C, a, t, i, v, l, s, m, I, u;
  return e === A ? (A[12] = e[0] * o + e[4] * h + e[8] * d + e[12], A[13] = e[1] * o + e[5] * h + e[9] * d + e[13], A[14] = e[2] * o + e[6] * h + e[10] * d + e[14], A[15] = e[3] * o + e[7] * h + e[11] * d + e[15]) : (f = e[0], c = e[1], C = e[2], a = e[3], t = e[4], i = e[5], v = e[6], l = e[7], s = e[8], m = e[9], I = e[10], u = e[11], A[0] = f, A[1] = c, A[2] = C, A[3] = a, A[4] = t, A[5] = i, A[6] = v, A[7] = l, A[8] = s, A[9] = m, A[10] = I, A[11] = u, A[12] = f * o + t * h + s * d + e[12], A[13] = c * o + i * h + m * d + e[13], A[14] = C * o + v * h + I * d + e[14], A[15] = a * o + l * h + u * d + e[15]), A;
}
function vA(A, e) {
  var r = e[0], o = e[1], h = e[2], d = e[3], f = r + r, c = o + o, C = h + h, a = r * f, t = o * f, i = o * c, v = h * f, l = h * c, s = h * C, m = d * f, I = d * c, u = d * C;
  return A[0] = 1 - i - s, A[1] = t + u, A[2] = v - I, A[3] = 0, A[4] = t - u, A[5] = 1 - a - s, A[6] = l + m, A[7] = 0, A[8] = v + I, A[9] = l - m, A[10] = 1 - a - i, A[11] = 0, A[12] = 0, A[13] = 0, A[14] = 0, A[15] = 1, A;
}
var W = bA;
function N() {
  var A = new O(3);
  return O != Float32Array && (A[0] = 0, A[1] = 0, A[2] = 0), A;
}
function Oe(A) {
  var e = A[0], r = A[1], o = A[2];
  return Math.hypot(e, r, o);
}
function gA(A, e, r) {
  var o = new O(3);
  return o[0] = A, o[1] = e, o[2] = r, o;
}
function xe(A, e) {
  var r = e[0], o = e[1], h = e[2], d = r * r + o * o + h * h;
  return d > 0 && (d = 1 / Math.sqrt(d)), A[0] = e[0] * d, A[1] = e[1] * d, A[2] = e[2] * d, A;
}
function Ze(A, e) {
  return A[0] * e[0] + A[1] * e[1] + A[2] * e[2];
}
function nA(A, e, r) {
  var o = e[0], h = e[1], d = e[2], f = r[0], c = r[1], C = r[2];
  return A[0] = h * C - d * c, A[1] = d * f - o * C, A[2] = o * c - h * f, A;
}
var Ge = Oe;
(function() {
  var A = N();
  return function(e, r, o, h, d, f) {
    var c, C;
    for (r || (r = 3), o || (o = 0), h ? C = Math.min(h * r + o, e.length) : C = e.length, c = o; c < C; c += r)
      A[0] = e[c], A[1] = e[c + 1], A[2] = e[c + 2], d(A, A, f), e[c] = A[0], e[c + 1] = A[1], e[c + 2] = A[2];
    return e;
  };
})();
function Pe() {
  var A = new O(4);
  return O != Float32Array && (A[0] = 0, A[1] = 0, A[2] = 0, A[3] = 0), A;
}
function BA(A, e, r, o) {
  var h = new O(4);
  return h[0] = A, h[1] = e, h[2] = r, h[3] = o, h;
}
function Je(A, e) {
  var r = e[0], o = e[1], h = e[2], d = e[3], f = r * r + o * o + h * h + d * d;
  return f > 0 && (f = 1 / Math.sqrt(f)), A[0] = r * f, A[1] = o * f, A[2] = h * f, A[3] = d * f, A;
}
function Ne(A, e, r) {
  var o = e[0], h = e[1], d = e[2], f = r[0], c = r[1], C = r[2], a = r[3], t = a * o + c * d - C * h, i = a * h + C * o - f * d, v = a * d + f * h - c * o, l = -f * o - c * h - C * d;
  return A[0] = t * a + l * -f + i * -C - v * -c, A[1] = i * a + l * -c + v * -f - t * -C, A[2] = v * a + l * -C + t * -c - i * -f, A[3] = e[3], A;
}
(function() {
  var A = Pe();
  return function(e, r, o, h, d, f) {
    var c, C;
    for (r || (r = 4), o || (o = 0), h ? C = Math.min(h * r + o, e.length) : C = e.length, c = o; c < C; c += r)
      A[0] = e[c], A[1] = e[c + 1], A[2] = e[c + 2], A[3] = e[c + 3], d(A, A, f), e[c] = A[0], e[c + 1] = A[1], e[c + 2] = A[2], e[c + 3] = A[3];
    return e;
  };
})();
function aA() {
  var A = new O(4);
  return O != Float32Array && (A[0] = 0, A[1] = 0, A[2] = 0), A[3] = 1, A;
}
function He(A, e, r) {
  r = r * 0.5;
  var o = Math.sin(r);
  return A[0] = o * e[0], A[1] = o * e[1], A[2] = o * e[2], A[3] = Math.cos(r), A;
}
function rA(A, e, r, o) {
  var h = e[0], d = e[1], f = e[2], c = e[3], C = r[0], a = r[1], t = r[2], i = r[3], v, l, s, m, I;
  return l = h * C + d * a + f * t + c * i, l < 0 && (l = -l, C = -C, a = -a, t = -t, i = -i), 1 - l > Ue ? (v = Math.acos(l), s = Math.sin(v), m = Math.sin((1 - o) * v) / s, I = Math.sin(o * v) / s) : (m = 1 - o, I = o), A[0] = m * h + I * C, A[1] = m * d + I * a, A[2] = m * f + I * t, A[3] = m * c + I * i, A;
}
function je(A, e) {
  var r = e[0] + e[4] + e[8], o;
  if (r > 0)
    o = Math.sqrt(r + 1), A[3] = 0.5 * o, o = 0.5 / o, A[0] = (e[5] - e[7]) * o, A[1] = (e[6] - e[2]) * o, A[2] = (e[1] - e[3]) * o;
  else {
    var h = 0;
    e[4] > e[0] && (h = 1), e[8] > e[h * 3 + h] && (h = 2);
    var d = (h + 1) % 3, f = (h + 2) % 3;
    o = Math.sqrt(e[h * 3 + h] - e[d * 3 + d] - e[f * 3 + f] + 1), A[h] = 0.5 * o, o = 0.5 / o, A[3] = (e[d * 3 + f] - e[f * 3 + d]) * o, A[d] = (e[d * 3 + h] + e[h * 3 + d]) * o, A[f] = (e[f * 3 + h] + e[h * 3 + f]) * o;
  }
  return A;
}
var oA = BA, MA = Je;
(function() {
  var A = N(), e = gA(1, 0, 0), r = gA(0, 1, 0);
  return function(o, h, d) {
    var f = Ze(h, d);
    return f < -0.999999 ? (nA(A, e, h), Ge(A) < 1e-6 && nA(A, r, h), xe(A, A), He(o, A, Math.PI), o) : f > 0.999999 ? (o[0] = 0, o[1] = 0, o[2] = 0, o[3] = 1, o) : (nA(A, h, d), o[0] = A[0], o[1] = A[1], o[2] = A[2], o[3] = 1 + f, MA(o, o));
  };
})();
(function() {
  var A = aA(), e = aA();
  return function(r, o, h, d, f, c) {
    return rA(A, o, f, c), rA(e, h, d, c), rA(r, A, e, 2 * c * (1 - c)), r;
  };
})();
(function() {
  var A = wA();
  return function(e, r, o, h) {
    return A[0] = o[0], A[3] = o[1], A[6] = o[2], A[1] = h[0], A[4] = h[1], A[7] = h[2], A[2] = -r[0], A[5] = -r[1], A[8] = -r[2], MA(e, je(e, A));
  };
})();
function Te(A, e) {
  var d;
  const r = Math.min(A.width / e.width, A.height / e.height), o = (A.width - e.width * r) / 2, h = (A.height - e.height * r) / 2;
  (d = A.getContext("2d")) == null || d.drawImage(
    e,
    0,
    0,
    e.width,
    e.height,
    o,
    h,
    e.width * r,
    e.height * r
  );
}
function qe(A, e, r, o, h) {
  const d = j(), f = Y(
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
  W(d, c, f);
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
  W(d, C, d), W(d, h, d);
  const a = e[0], t = Y(
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
  W(d, t, d);
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
    e[2] * A,
    e[5] * A,
    0,
    1
  );
  return W(d, i, d), d;
}
const Le = {
  constraints: {
    audio: !1,
    video: { facingMode: "environment" }
  }
};
class Ye {
  constructor(e, r) {
    E(this, "session");
    E(this, "options");
    E(this, "paused", !1);
    E(this, "mediaStream");
    E(this, "track");
    E(this, "videoElement");
    E(this, "imageCapture");
    E(this, "feedStatus", {});
    E(this, "animationFrameRequest");
    this.session = e, this.options = { ...Le, ...r }, this.videoElement = document.createElement("video");
  }
  async init() {
    (!navigator.mediaDevices || !ImageCapture) && (this.feedStatus = {
      error: "mediaDevices and/or ImageCapture API not supported!"
    });
  }
  loadCamera() {
    let e = window.localStorage.getItem(
      `vuexr/${this.session.name}/camera`
    );
    return e ? (e = JSON.parse(e), e) : null;
  }
  storeCamera() {
    return this.feedStatus.selected ? (window.localStorage.setItem(
      `vuexr/${this.session.name}/camera`,
      JSON.stringify(this.feedStatus.selected)
    ), !0) : !1;
  }
  stop() {
    var e;
    this.mediaStream && (this.animationFrameRequest !== void 0 && window.cancelAnimationFrame(this.animationFrameRequest), (e = this.track) == null || e.stop(), this.track = void 0, this.mediaStream = void 0, this.imageCapture = void 0);
  }
  async selectCamera(e) {
    this.feedStatus.selected !== e && (this.stop(), this.feedStatus.selected = e, this.storeCamera(), this.session.calibration.resetCalibrationPoints(), await this.run(), this.session.updateStatus());
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
      const e = await this.listAvailable(), r = this.loadCamera();
      this.feedStatus = {
        available: e,
        selected: r ?? void 0
      }, this.session.calibration.loadCameraCalibration(), this.session.updateStatus(), this.imageCapture = new ImageCapture(this.track), this.videoElement.srcObject = this.mediaStream, await new Promise((o) => {
        this.videoElement.onloadedmetadata = () => {
          this.videoElement.play(), this.session.canvas && (this.session.canvas.width = this.videoElement.videoWidth, this.session.canvas.height = this.videoElement.videoHeight), this.loop(), o();
        };
      });
    } catch (e) {
      console.log(e);
    }
  }
  async loop() {
    if (this.imageCapture)
      try {
        const e = await this.imageCapture.grabFrame();
        this.session.canvas && Te(this.session.canvas, e), this.session.process();
      } catch {
      } finally {
        this.paused || (this.animationFrameRequest = window.requestAnimationFrame(() => {
          this.loop();
        }));
      }
  }
}
class We {
  constructor(e) {
    E(this, "session");
    E(this, "elements", {});
    E(this, "views", []);
    E(this, "trackedMarkers", []);
    this.session = e;
  }
  registerView(e, r) {
    this.views.push({ id: e, callback: r });
  }
  unregisterView(e) {
    this.views = this.views.filter((r) => r.id !== e);
  }
  registerElement(e, r, o, h) {
    this.elements[e] = {
      id: e,
      element: r,
      markerSize: o,
      callback: h,
      lastRMat: j(),
      lastRVec: N(),
      lastTVec: N(),
      tracked: !1
    };
  }
  unregisterElement(e) {
    delete this.elements[e];
  }
  setMarkers(e) {
    for (const h of e)
      this.elements[h.id] && (!this.session.motion.motionStatus.acceleration.error && !this.session.motion.motionStatus.gyro.error ? this.elements[h.id].lastTransform = this.session.motion.getCurrentTransform() : this.elements[h.id].lastTransform = {
        orientation: aA(),
        position: N()
      }, this.elements[h.id].lastRVec = h.rvec, this.elements[h.id].lastTVec = h.tvec, this.elements[h.id].lastRMat = h.rmat, this.elements[h.id].tracked || (this.elements[h.id].tracked = !0, this.elements[h.id].callback(!0)));
    const r = e.map((h) => h.id.toString()), o = Object.keys(this.elements).filter(
      (h) => !r.includes(h)
    );
    for (const h of o)
      this.elements[h].tracked && (this.elements[h].tracked = !1, this.elements[h].callback(!1));
    (this.session.motion.motionStatus.acceleration.error || this.session.motion.motionStatus.gyro.error) && this.readjustElements(), this.trackedMarkers = r, this.views.forEach((h) => h.callback(this.trackedMarkers));
  }
  readjustElements() {
    var o, h, d;
    const e = (((o = this.session.canvas) == null ? void 0 : o.clientWidth) ?? 0) / (((h = this.session.canvas) == null ? void 0 : h.width) ?? 0), r = Object.keys(this.elements).map(
      (f) => this.elements[f]
    );
    for (const f of r)
      if (f.lastTransform) {
        const c = this.session.motion.getOffsetMatrix(
          f.lastTransform
        ), C = qe(
          e,
          ((d = this.session.calibration.calibration) == null ? void 0 : d.cameraMatrix) ?? wA(),
          f.lastRMat,
          f.lastTVec,
          c
        );
        this.projectElement(f.id, Array.from(C));
      }
  }
  projectElement(e, r) {
    const o = r.map(
      (h) => h.toFixed(5)
    );
    this.elements[e].element.style.transform = `matrix3d(${o.join(
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
(function(A, e) {
  (function(r) {
    A.exports = r();
  })(function() {
    return function r(o, h, d) {
      function f(a, t) {
        if (!h[a]) {
          if (!o[a]) {
            var i = typeof eA == "function" && eA;
            if (!t && i)
              return i(a, !0);
            if (c)
              return c(a, !0);
            var v = new Error("Cannot find module '" + a + "'");
            throw v.code = "MODULE_NOT_FOUND", v;
          }
          var l = h[a] = { exports: {} };
          o[a][0].call(l.exports, function(s) {
            var m = o[a][1][s];
            return f(m || s);
          }, l, l.exports, r, o, h, d);
        }
        return h[a].exports;
      }
      for (var c = typeof eA == "function" && eA, C = 0; C < d.length; C++)
        f(d[C]);
      return f;
    }({ 1: [function(r, o, h) {
      o.exports = { CalcCascades: r("./src/calcCascades"), Fft: r("./src/fft"), FirCoeffs: r("./src/firCoeffs"), FirFilter: r("./src/firFilter"), IirCoeffs: r("./src/iirCoeffs"), IirFilter: r("./src/iirFilter"), TestFilter: r("./src/testFilter") };
    }, { "./src/calcCascades": 2, "./src/fft": 3, "./src/firCoeffs": 4, "./src/firFilter": 5, "./src/iirCoeffs": 6, "./src/iirFilter": 7, "./src/testFilter": 8 }], 2: [function(r, o, h) {
      var d = r("./iirCoeffs"), f = new d(), c = { bessel: { q: [[0.57735026919], [0.805538281842, 0.521934581669], [1.02331395383, 0.611194546878, 0.510317824749], [1.22566942541, 0.710852074442, 0.559609164796, 0.505991069397], [1.41530886916, 0.809790964842, 0.620470155556, 0.537552151325, 0.503912727276], [1.59465693507, 0.905947107025, 0.684008068137, 0.579367238641, 0.525936202016, 0.502755558204], [1.76552743493, 0.998998442993, 0.747625068271, 0.624777082395, 0.556680772868, 0.519027293158, 0.502045428643], [1.9292718407, 1.08906376917, 0.810410302962, 0.671382379377, 0.591144659703, 0.542678365981, 0.514570953471, 0.501578400482], [2.08691792612, 1.17637337045, 0.872034231424, 0.718163551101, 0.627261751983, 0.569890924765, 0.533371782078, 0.511523796759, 0.50125489338], [2.23926560629, 1.26117120993, 0.932397288146, 0.764647810579, 0.664052481472, 0.598921924986, 0.555480327396, 0.526848630061, 0.509345928377, 0.501021580965], [2.38695091667, 1.34368488961, 0.991497755204, 0.81060830488, 0.701011199665, 0.628878390935, 0.57943181849, 0.545207253735, 0.52208637596, 0.507736060535, 0.500847111042], [2.53048919562, 1.42411783481, 1.04937620183, 0.85593899901, 0.737862159044, 0.659265671705, 0.604435823473, 0.565352679646, 0.537608804383, 0.51849505465, 0.506508536474, 0.500715908905]], f3dB: [[1.27201964951], [1.60335751622, 1.43017155999], [1.9047076123, 1.68916826762, 1.60391912877], [2.18872623053, 1.95319575902, 1.8320926012, 1.77846591177], [2.45062684305, 2.20375262593, 2.06220731793, 1.98055310881, 1.94270419166], [2.69298925084, 2.43912611431, 2.28431825401, 2.18496722634, 2.12472538477, 2.09613322542], [2.91905714471, 2.66069088948, 2.49663434571, 2.38497976939, 2.30961462222, 2.26265746534, 2.24005716132], [3.13149167404, 2.87016099416, 2.69935018044, 2.57862945683, 2.49225505119, 2.43227707449, 2.39427710712, 2.37582307687], [3.33237300564, 3.06908580184, 2.89318259511, 2.76551588399, 2.67073340527, 2.60094950474, 2.55161764546, 2.52001358804, 2.50457164552], [3.52333123464, 3.25877569704, 3.07894353744, 2.94580435024, 2.84438325189, 2.76691082498, 2.70881411245, 2.66724655259, 2.64040228249, 2.62723439989], [3.70566068548, 3.44032173223, 3.2574059854, 3.11986367838, 3.01307175388, 2.92939234605, 2.86428726094, 2.81483068055, 2.77915465405, 2.75596888377, 2.74456638588], [3.88040469682, 3.61463243697, 3.4292654707, 3.28812274966, 3.17689762788, 3.08812364257, 3.01720732972, 2.96140104561, 2.91862858495, 2.88729479473, 2.8674198668, 2.8570800015]], f1dB: [[2.16477559371], [2.70320928596, 2.41122332505], [3.25676581436, 2.88822569572, 2.74246238837], [3.76153580353, 3.35675411406, 3.14862673032, 3.05646412475], [4.22174260104, 3.79644757806, 3.55260471864, 3.41193742197, 3.34673435508], [4.64584812552, 4.20789257981, 3.94082363122, 3.76942681446, 3.66549975744, 3.61617359345], [5.04060395196, 4.5944592201, 4.3111677248, 4.11836351827, 3.98822359814, 3.90713836715, 3.86811234525], [5.41107948467, 4.95951159709, 4.66435804468, 4.45575796102, 4.30650679478, 4.20286750045, 4.13720522991, 4.10531748119], [5.76110791853, 5.30592898465, 5.00182215701, 4.7811081045, 4.61724509926, 4.49660100894, 4.41131378918, 4.35667671372, 4.32997951075], [6.09364309488, 5.63609116014, 5.32506930789, 5.09480346139, 4.91939504255, 4.78540258409, 4.68493280536, 4.61302286993, 4.56661931366, 4.54382759952], [6.41100731543, 5.95195558182, 5.63550073656, 5.39754464742, 5.21278891332, 5.06801430334, 4.95539684456, 4.8697869429, 4.80814951843, 4.76793469612, 4.74828032403], [6.71506056052, 6.25514029778, 5.9343616072, 5.69011422355, 5.49763642361, 5.34401973764, 5.22125973611, 5.12485045619, 5.05037962112, 4.99699982231, 4.96155789635, 4.94441828777]] } }, C = { bessel: { as: [[1.3617], [1.3397, 0.7743], [1.2217, 0.9686, 0.5131], [1.1112, 0.9754, 0.7202, 0.3728], [1.0215, 0.9393, 0.7815, 0.5604, 0.2883]], bs: [[0.618], [0.4889, 0.389], [0.3887, 0.3505, 0.2756], [0.3162, 0.2979, 0.2621, 0.2087], [0.265, 0.2549, 0.2351, 0.2059, 0.1665]] }, butterworth: { as: [[1.4142], [1.8478, 0.7654], [1.9319, 1.4142, 0.5176], [1.9616, 1.6629, 1.1111, 0.3902], [1.9754, 1.782, 1.4142, 0.908, 0.3129]], bs: [[1], [1, 1], [1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1, 1]] }, tschebyscheff05: { as: [[1.3614], [2.6282, 0.3648], [3.8645, 0.7528, 0.1589], [5.1117, 1.0639, 0.3439, 0.0885], [6.3648, 1.3582, 0.4822, 0.1994, 0.0563]], bs: [[1.3827], [3.4341, 1.1509], [6.9797, 1.8573, 1.0711], [11.9607, 2.9365, 1.4206, 1.0407], [18.3695, 4.3453, 1.944, 1.252, 1.0263]] }, tschebyscheff1: { as: [[1.3022], [2.5904, 0.3039], [3.8437, 0.6292, 0.1296], [5.1019, 0.8916, 0.2806, 0.0717], [6.3634, 1.1399, 0.3939, 0.1616, 0.0455]], bs: [[1.5515], [4.1301, 1.1697], [8.5529, 1.9124, 1.0766], [14.7608, 3.0426, 1.4334, 1.0432], [22.7468, 4.5167, 1.9665, 1.2569, 1.0277]] }, tschebyscheff2: { as: [[1.1813], [2.4025, 0.2374], [3.588, 0.4925, 0.0995], [4.7743, 0.6991, 0.2153, 0.0547], [5.9618, 0.8947, 0.3023, 0.1233, 0.0347]], bs: [[1.7775], [4.9862, 1.1896], [10.4648, 1.9622, 1.0826], [18.151, 3.1353, 1.4449, 1.0461], [28.0376, 4.6644, 1.9858, 1.2614, 1.0294]] }, tschebyscheff3: { as: [[1.065], [2.1853, 0.1964], [3.2721, 0.4077, 0.0815], [4.3583, 0.5791, 0.1765, 0.0448], [5.4449, 0.7414, 0.2479, 0.1008, 0.0283]], bs: [[1.9305], [5.5339, 1.2009], [11.6773, 1.9873, 1.0861], [20.2948, 3.1808, 1.4507, 1.0478], [31.3788, 4.7363, 1.9952, 1.2638, 1.0304]] }, allpass: { as: [[1.6278], [2.337, 1.3506], [2.6117, 2.0706, 1.0967], [2.7541, 2.4174, 1.785, 0.9239], [2.8406, 2.612, 2.1733, 1.5583, 0.8018]], bs: [[0.8832], [1.4878, 1.1837], [1.7763, 1.6015, 1.2596], [1.942, 1.83, 1.6101, 1.2822], [2.049, 1.9714, 1.8184, 1.5923, 1.2877]] } }, a = function(l, s) {
        var m = [], I = 0;
        if (s !== "fromPZ")
          for (l.order > 12 && (l.order = 12), I = 0; I < l.order; I++) {
            var u, D, k;
            l.transform === "matchedZ" ? m.push(f.lowpassMZ({ Fs: l.Fs, Fc: l.Fc, preGain: l.preGain, as: C[l.characteristic].as[l.order - 1][I], bs: C[l.characteristic].bs[l.order - 1][I] })) : (l.characteristic === "butterworth" ? (u = 0.5 / Math.sin(Math.PI / (2 * l.order) * (I + 0.5)), D = 1) : (u = c[l.characteristic].q[l.order - 1][I], D = l.oneDb ? c[l.characteristic].f1dB[l.order - 1][I] : c[l.characteristic].f3dB[l.order - 1][I]), k = s === "highpass" ? l.Fc / D : l.Fc * D, s !== "bandpass" && s !== "bandstop" || l.characteristic === "bessel" && (k = Math.sqrt(l.order) * k / l.order), m.push(f[s]({ Fs: l.Fs, Fc: k, Q: u, BW: l.BW || 0, gain: l.gain || 0, preGain: l.preGain || !1 })));
          }
        else
          for (I = 0; I < l.length; I++)
            m.push(f[s](l[I]));
        return m;
      }, t = function(l) {
        return function(s) {
          return a(s, l);
        };
      }, i = {}, v = function() {
        var l = [];
        for (var s in f)
          i[s] = t(s), l.push(s);
        return i.available = function() {
          return l;
        }, i;
      };
      o.exports = v;
    }, { "./iirCoeffs": 6 }], 3: [function(r, o, h) {
      var d = function(f) {
        if (!function(p) {
          return !(p & p - 1);
        }(f))
          return !1;
        var c = {};
        c.length = f, c.buffer = new Float64Array(f), c.re = new Float64Array(f), c.im = new Float64Array(f), c.reI = new Float64Array(f), c.imI = new Float64Array(f), c.twiddle = new Int32Array(f), c.sinTable = new Float64Array(f - 1), c.cosTable = new Float64Array(f - 1);
        var C = 2 * Math.PI, a = Math.floor(Math.log(f) / Math.LN2);
        for (i = c.sinTable.length; i--; )
          c.sinTable[i] = Math.sin(C * (i / f)), c.cosTable[i] = Math.cos(C * (i / f));
        for (var t = f >> 1, i = 0, v = 0; c.twiddle[i] = v, !(++i >= f); ) {
          for (a = t; a <= v; )
            v -= a, a >>= 1;
          v += a;
        }
        var l = Math.PI, s = 2 * Math.PI, m = Math.abs, I = Math.pow, u = Math.cos, D = Math.sin, k = function(p) {
          return D(l * p) / (l * p);
        }, B = Math.E, Q = { rectangular: { calc: function() {
          return 1;
        }, values: [], correction: 1 }, none: { calc: function() {
          return 1;
        }, values: [], correction: 1 }, hanning: { calc: function(p, g) {
          return 0.5 * (1 - u(s * p / (g - 1)));
        }, values: [], correction: 2 }, hamming: { calc: function(p, g) {
          return 0.54 - 0.46 * u(s * p / (g - 1));
        }, values: [], correction: 1.8518999946875638 }, tukery: { calc: function(p, g, n) {
          return p < n * (g - 1) / 2 ? 0.5 * (1 + u(l * (2 * p / (n * (g - 1)) - 1))) : (g - 1) * (1 - n / 2) < p ? 0.5 * (1 + u(l * (2 * p / (n * (g - 1)) - 2 / n + 1))) : 1;
        }, values: [], correction: 4 / 3 }, cosine: { calc: function(p, g) {
          return D(l * p / (g - 1));
        }, values: [], correction: 1.570844266360796 }, lanczos: { calc: function(p, g) {
          return k(2 * p / (g - 1) - 1);
        }, values: [], correction: 1.6964337576195783 }, triangular: { calc: function(p, g) {
          return 2 / (g + 1) * ((g + 1) / 2 - m(p - (g - 1) / 2));
        }, values: [], correction: 2 }, bartlett: { calc: function(p, g) {
          return 2 / (g - 1) * ((g - 1) / 2 - m(p - (g - 1) / 2));
        }, values: [], correction: 2 }, gaussian: { calc: function(p, g, n) {
          return I(B, -0.5 * I((p - (g - 1) / 2) / (n * (g - 1) / 2), 2));
        }, values: [], correction: 5 / 3 }, bartlettHanning: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.62 - 0.48 * m(p / (g - 1) - 0.5) - 0.38 * u(n);
        }, values: [], correction: 2 }, blackman: { calc: function(p, g, n) {
          var V = (1 - n) / 2, w = n / 2, b = s * p / (g - 1);
          return V - 0.5 * u(b) + w * u(2 * b);
        }, values: [], correction: 4 / 3 }, blackmanHarris: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.35875 - 0.48829 * u(n) + 0.14128 * u(2 * n) - 0.01168 * u(3 * n);
        }, values: [], correction: 1.5594508635 }, nuttall3: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.375 - 0.5 * u(n) + 0.125 * u(2 * n);
        }, values: [], correction: 1.56 }, nuttall3a: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.40897 - 0.5 * u(n) + 0.09103 * u(2 * n);
        }, values: [], correction: 1.692 }, nuttall3b: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.4243801 - 0.4973406 * u(n) + 0.078793 * u(2 * n);
        }, values: [], correction: 1.7372527 }, nuttall4: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.3125 - 0.46875 * u(n) + 0.1875 * u(2 * n) - 0.03125 * u(3 * n);
        }, values: [], correction: 1.454543 }, nuttall4a: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.338946 - 0.481973 * u(n) + 0.161054 * u(2 * n) - 0.018027 * u(3 * n);
        }, values: [], correction: 1.512732763 }, nuttall4b: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.355768 - 0.481973 * u(n) + 0.144232 * u(2 * n) - 0.012604 * u(3 * n);
        }, values: [], correction: 1.55223262 }, nuttall4c: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.3635819 - 0.4891775 * u(n) + 0.1365995 * u(2 * n) - 0.0106411 * u(3 * n);
        }, values: [], correction: 1.57129067 }, sft3f: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.26526 - 0.5 * u(n) + 0.23474 * u(2 * n);
        }, values: [], correction: 1.3610238 }, sft4f: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.21706 - 0.42103 * u(n) + 0.28294 * u(2 * n) - 0.07897 * u(3 * n);
        }, values: [], correction: 1.2773573 }, sft5f: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.1881 - 0.36923 * u(n) + 0.28702 * u(2 * n) - 0.13077 * u(3 * n) + 0.02488 * u(4 * n);
        }, values: [], correction: 1.23167769 }, sft3m: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.28235 - 0.52105 * u(n) + 0.19659 * u(2 * n);
        }, values: [], correction: 1.39343451 }, sft4m: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.241906 - 0.460841 * u(n) + 0.2552381 * u(2 * n) - 0.041872 * u(3 * n);
        }, values: [], correction: 1.3190596 }, sft5m: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.209671 - 0.407331 * u(n) + 0.281225 * u(2 * n) - 0.092669 * u(3 * n) + 91036e-7 * u(4 * n);
        }, values: [], correction: 1.26529456464 }, nift: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return 0.2810639 - 0.5208972 * u(n) + 0.1980399 * u(2 * n);
        }, values: [], correction: 1.39094182 }, hpft: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return (1 - 1.912510941 * u(n) + 1.079173272 * u(2 * n) - 0.1832630879 * u(3 * n)) / g;
        }, values: [], correction: 1 }, srft: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return (1 - 1.93 * u(n) + 1.29 * u(2 * n) - 0.388 * u(3 * n) + 0.028 * u(4 * n)) / g;
        }, values: [], correction: 1 }, hft70: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return (1 - 1.90796 * u(n) + 1.07349 * u(2 * n) - 0.18199 * u(3 * n)) / g;
        }, values: [], correction: 1 }, hft95: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return (1 - 1.9383379 * u(n) + 1.3045202 * u(2 * n) - 0.402827 * u(3 * n) + 0.0350665 * u(4 * n)) / g;
        }, values: [], correction: 1 }, hft90d: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return (1 - 1.942604 * u(n) + 1.340318 * u(2 * n) - 0.440811 * u(3 * n) + 0.043097 * u(4 * n)) / g;
        }, values: [], correction: 1 }, hft116d: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return (1 - 1.9575375 * u(n) + 1.4780705 * u(2 * n) - 0.6367431 * u(3 * n) + 0.1228389 * u(4 * n) - 66288e-7 * u(5 * n)) / g;
        }, values: [], correction: 1 }, hft144d: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return (1 - 1.96760033 * u(n) + 1.57983607 * u(2 * n) - 0.81123644 * u(3 * n) + 0.22583558 * u(4 * n) - 0.02773848 * u(5 * n) + 9036e-7 * u(6 * n)) / g;
        }, values: [], correction: 1 }, hft196d: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return (1 - 1.97441842 * u(n) + 1.65409888 * u(2 * n) - 0.95788186 * u(3 * n) + 0.3367342 * u(4 * n) - 0.06364621 * u(5 * n) + 521942e-8 * u(6 * n) - 10599e-8 * u(7 * n)) / g;
        }, values: [], correction: 1 }, hft223d: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return (1 - 1.98298997309 * u(n) + 1.75556083063 * u(2 * n) - 1.19037717712 * u(3 * n) + 0.56155440797 * u(4 * n) - 0.17296769663 * u(5 * n) + 0.03233247087 * u(6 * n) - 0.00324954578 * u(7 * n) + 1380104e-10 * u(8 * n) - 132725e-11 * u(9 * n)) / g;
        }, values: [], correction: 1 }, hft248d: { calc: function(p, g) {
          var n = s * p / (g - 1);
          return (1 - 1.985844164102 * u(n) + 1.791176438506 * u(2 * n) - 1.282075284005 * u(3 * n) + 0.667777530266 * u(4 * n) - 0.240160796576 * u(5 * n) + 0.056656381764 * u(6 * n) - 0.008134974479 * u(7 * n) + 62454465e-11 * u(8 * n) - 19808998e-12 * u(9 * n) + 132974e-12 * u(10 * n)) / g;
        }, values: [], correction: 1 } }, M = function(p) {
          return Q[p.name].values.length !== p.N ? (p.n === 0 && (Q[p.name].values.length = 0), Q[p.name].values[p.n] = Q[p.name].correction * Q[p.name].calc(p.n, p.N, p.a), Q[p.name].values[p.n]) : Q[p.name].values;
        };
        return { forward: function(p, g) {
          var n, V, w, b, y, F, X, z, x, U, Z, H;
          w = c.buffer.length;
          var sA = { name: g, N: w, a: 0.5, n: 0 }, dA = M(sA);
          if (typeof dA == "number")
            for (n = 0; n < w; ++n)
              sA.n = n, c.buffer[n] = p[n] * M(sA);
          else
            for (n = 0; n < w; ++n)
              c.buffer[n] = p[n] * dA[n];
          for (n = w; n--; )
            c.re[n] = c.buffer[c.twiddle[n]], c.im[n] = 0;
          for (b = 1; b < w; b = y)
            for (F = 0, y = b + b, X = w / y, V = 0; V < b; V++) {
              for (z = c.cosTable[F], x = c.sinTable[F], n = V; n < w; n += y)
                U = n + b, Z = x * c.im[U] + z * c.re[U], H = z * c.im[U] - x * c.re[U], c.re[U] = c.re[n] - Z, c.re[n] += Z, c.im[U] = c.im[n] - H, c.im[n] += H;
              F += X;
            }
          return { re: c.re, im: c.im };
        }, inverse: function(p, g) {
          var n, V, w, b, y, F, X, z, x, U, Z, H;
          for (w = p.length, n = w; n--; )
            V = c.twiddle[n], c.reI[n] = p[V], c.imI[n] = -g[V];
          for (b = 1; b < w; b = y)
            for (F = 0, y = b + b, X = w / y, V = 0; V < b; V++) {
              for (z = c.cosTable[F], x = c.sinTable[F], n = V; n < w; n += y)
                U = n + b, Z = x * c.imI[U] + z * c.reI[U], H = z * c.imI[U] - x * c.reI[U], c.reI[U] = c.reI[n] - Z, c.reI[n] += Z, c.imI[U] = c.imI[n] - H, c.imI[n] += H;
              F += X;
            }
          for (n = w; n--; )
            c.buffer[n] = c.reI[n] / w;
          return c.buffer;
        }, magnitude: function(p) {
          for (var g = [], n = 0; n < p.re.length; n++)
            g.push(Math.sqrt(p.re[n] * p.re[n] + p.im[n] * p.im[n]));
          return g;
        }, magToDb: function(p) {
          for (var g = [], n = 0; n < p.length; n++)
            g.push(20 * Math.log(p[n]) * Math.LOG10E);
          return g;
        }, phase: function(p) {
          for (var g = [], n = 0; n < p.re.length; n++)
            g.push(Math.atan2(p.im[n], p.re[n]));
          return g;
        }, windows: function() {
          var p = [];
          for (var g in Q)
            p.push(g);
          return p;
        } };
      };
      o.exports = d;
    }, {}], 4: [function(r, o, h) {
      var d = function() {
        var f = function(t) {
          var i = t.Fs, v = t.Fa, l = t.Fb, s = t.order || 51, m = t.Att || 100, I = function(p) {
            for (var g = 0, n = 1, V = 1; n > 1e-6 * V; )
              g += 2, n *= p * p / (g * g), V += n;
            return V;
          };
          s / 2 - Math.floor(s / 2) == 0 && s++;
          var u, D = (s - 1) / 2, k = [], B = 0, Q = 0, M = [];
          for (k[0] = 2 * (l - v) / i, Q = 1; Q <= D; Q++)
            k[Q] = (Math.sin(2 * Q * Math.PI * l / i) - Math.sin(2 * Q * Math.PI * v / i)) / (Q * Math.PI);
          for (B = m < 21 ? 0 : m > 50 ? 0.1102 * (m - 8.7) : 0.5842 * Math.pow(m - 21, 0.4) + 0.07886 * (m - 21), u = I(B), Q = 0; Q <= D; Q++)
            M[D + Q] = k[Q] * I(B * Math.sqrt(1 - Q * Q / (D * D))) / u;
          for (Q = 0; Q < D; Q++)
            M[Q] = M[s - 1 - Q];
          return M;
        }, c = function(t) {
          var i = t.Fs, v = t.Fc, l = t.order, s = 2 * Math.PI * v / i, m = 0, I = 0, u = [];
          for (m = 0; m <= l; m++)
            m - l / 2 == 0 ? u[m] = s : (u[m] = Math.sin(s * (m - l / 2)) / (m - l / 2), u[m] *= 0.54 - 0.46 * Math.cos(2 * Math.PI * m / l)), I += u[m];
          for (m = 0; m <= l; m++)
            u[m] /= I;
          return u;
        }, C = function(t) {
          var i;
          for (i = 0; i < t.length; i++)
            t[i] = -t[i];
          return t[(t.length - 1) / 2]++, t;
        }, a = function(t) {
          for (var i = c({ order: t.order, Fs: t.Fs, Fc: t.F2 }), v = C(c({ order: t.order, Fs: t.Fs, Fc: t.F1 })), l = [], s = 0; s < i.length; s++)
            l.push(i[s] + v[s]);
          return l;
        };
        return { lowpass: function(t) {
          return c(t);
        }, highpass: function(t) {
          return C(c(t));
        }, bandstop: function(t) {
          return a(t);
        }, bandpass: function(t) {
          return C(a(t));
        }, kbFilter: function(t) {
          return f(t);
        }, available: function() {
          return ["lowpass", "highpass", "bandstop", "bandpass", "kbFilter"];
        } };
      };
      o.exports = d;
    }, {}], 5: [function(r, o, h) {
      var d = r("./utils"), f = d.runMultiFilter, c = d.runMultiFilterReverse, C = d.complex, a = d.evaluatePhase, t = function(i) {
        var v = i, l = [], s = 0;
        for (s = 0; s < v.length; s++)
          l[s] = { re: v[s], im: 0 };
        var m = function(B) {
          var Q, M = [];
          for (Q = 0; Q < B; Q++)
            M.push(0);
          return { buf: M, pointer: 0 };
        }, I = m(v.length - 1), u = function(B, Q) {
          Q.buf[Q.pointer] = B;
          var M = 0;
          for (s = 0; s < Q.buf.length; s++)
            M += v[s] * Q.buf[(Q.pointer + s) % Q.buf.length];
          return Q.pointer = (Q.pointer + 1) % Q.buf.length, M;
        }, D = function(B) {
          var Q = m(v.length - 1);
          return f(B, Q, u);
        }, k = function(B) {
          for (var Q = B.Fs, M = B.Fr, p = -Math.PI * (M / Q) * 2, g = { re: 0, im: 0 }, n = 0; n < v.length - 1; n++)
            g = C.add(g, C.mul(l[n], { re: Math.cos(p * n), im: Math.sin(p * n) }));
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
          return u(B, I);
        }, multiStep: function(B, Q) {
          return f(B, I, u, Q);
        }, filtfilt: function(B, Q) {
          return c(f(B, I, u, Q), I, u, !0);
        }, reinit: function() {
          I = m(v.length - 1);
        } };
      };
      o.exports = t;
    }, { "./utils": 9 }], 6: [function(r, o, h) {
      var d = function() {
        var f = function(a, t) {
          var i = a.Q, v = a.Fc, l = a.Fs, s = {}, m = 2 * Math.PI * v / l;
          return a.BW ? s.alpha = Math.sin(m) * Math.sinh(Math.log(2) / 2 * a.BW * m / Math.sin(m)) : s.alpha = Math.sin(m) / (2 * i), s.cw = Math.cos(m), s.a0 = 1 + s.alpha, t.a0 = s.a0, t.a.push(-2 * s.cw / s.a0), t.k = 1, t.a.push((1 - s.alpha) / s.a0), s;
        }, c = function(a) {
          var t = a.Q, i = a.Fc, v = a.Fs, l = {}, s = 2 * Math.PI * i / v;
          return l.alpha = Math.sin(s) / (2 * t), l.cw = Math.cos(s), l.A = Math.pow(10, a.gain / 40), l;
        }, C = function() {
          var a = {};
          return a.z = [0, 0], a.a = [], a.b = [], a;
        };
        return { fromPZ: function(a) {
          var t = C();
          return t.a0 = 1, t.b.push(1), t.b.push(-a.z0.re - a.z1.re), t.b.push(a.z0.re * a.z1.re - a.z0.im * a.z1.im), t.a.push(-a.p0.re - a.p1.re), t.a.push(a.p0.re * a.p1.re - a.p0.im * a.p1.im), a.type === "lowpass" ? t.k = (1 + t.a[0] + t.a[1]) / (1 + t.b[1] + t.b[2]) : t.k = (1 - t.a[0] + t.a[1]) / (1 - t.b[1] + t.b[2]), t;
        }, lowpassMZ: function(a) {
          var t = C();
          t.a0 = 1;
          var i = a.as, v = a.bs, l = 2 * Math.PI * a.Fc / a.Fs, s = -i / (2 * v);
          return t.a.push(2 * -Math.pow(Math.E, s * l) * Math.cos(-l * Math.sqrt(Math.abs(Math.pow(i, 2) / (4 * Math.pow(v, 2)) - 1 / v)))), t.a.push(Math.pow(Math.E, 2 * s * l)), a.preGain ? (t.b.push(1), t.k = t.a0 + t.a[0] + t.a[1]) : (t.b.push(t.a0 + t.a[0] + t.a[1]), t.k = 1), t.b.push(0), t.b.push(0), t;
        }, lowpassBT: function(a) {
          var t = C();
          return a.Q = 1, t.wp = Math.tan(2 * Math.PI * a.Fc / (2 * a.Fs)), t.wp2 = t.wp * t.wp, a.BW && delete a.BW, t.k = 1, t.a0 = 3 * t.wp + 3 * t.wp2 + 1, t.b.push(3 * t.wp2 * a.Q / t.a0), t.b.push(2 * t.b[0]), t.b.push(t.b[0]), t.a.push((6 * t.wp2 - 2) / t.a0), t.a.push((3 * t.wp2 - 3 * t.wp + 1) / t.a0), t;
        }, highpassBT: function(a) {
          var t = C();
          return a.Q = 1, t.wp = Math.tan(2 * Math.PI * a.Fc / (2 * a.Fs)), t.wp2 = t.wp * t.wp, a.BW && delete a.BW, t.k = 1, t.a0 = t.wp + t.wp2 + 3, t.b.push(3 * a.Q / t.a0), t.b.push(2 * t.b[0]), t.b.push(t.b[0]), t.a.push((2 * t.wp2 - 6) / t.a0), t.a.push((t.wp2 - t.wp + 3) / t.a0), t;
        }, lowpass: function(a) {
          var t = C();
          a.BW && delete a.BW;
          var i = f(a, t);
          return a.preGain ? (t.k = 0.5 * (1 - i.cw), t.b.push(1 / i.a0)) : (t.k = 1, t.b.push((1 - i.cw) / (2 * i.a0))), t.b.push(2 * t.b[0]), t.b.push(t.b[0]), t;
        }, highpass: function(a) {
          var t = C();
          a.BW && delete a.BW;
          var i = f(a, t);
          return a.preGain ? (t.k = 0.5 * (1 + i.cw), t.b.push(1 / i.a0)) : (t.k = 1, t.b.push((1 + i.cw) / (2 * i.a0))), t.b.push(-2 * t.b[0]), t.b.push(t.b[0]), t;
        }, allpass: function(a) {
          var t = C();
          a.BW && delete a.BW;
          var i = f(a, t);
          return t.k = 1, t.b.push((1 - i.alpha) / i.a0), t.b.push(-2 * i.cw / i.a0), t.b.push((1 + i.alpha) / i.a0), t;
        }, bandpassQ: function(a) {
          var t = C(), i = f(a, t);
          return t.k = 1, t.b.push(i.alpha * a.Q / i.a0), t.b.push(0), t.b.push(-t.b[0]), t;
        }, bandpass: function(a) {
          var t = C(), i = f(a, t);
          return t.k = 1, t.b.push(i.alpha / i.a0), t.b.push(0), t.b.push(-t.b[0]), t;
        }, bandstop: function(a) {
          var t = C(), i = f(a, t);
          return t.k = 1, t.b.push(1 / i.a0), t.b.push(-2 * i.cw / i.a0), t.b.push(t.b[0]), t;
        }, peak: function(a) {
          var t = C(), i = c(a);
          return t.k = 1, t.a0 = 1 + i.alpha / i.A, t.a.push(-2 * i.cw / t.a0), t.a.push((1 - i.alpha / i.A) / t.a0), t.b.push((1 + i.alpha * i.A) / t.a0), t.b.push(-2 * i.cw / t.a0), t.b.push((1 - i.alpha * i.A) / t.a0), t;
        }, lowshelf: function(a) {
          var t = C();
          a.BW && delete a.BW;
          var i = c(a);
          t.k = 1;
          var v = 2 * Math.sqrt(i.A) * i.alpha;
          return t.a0 = i.A + 1 + (i.A - 1) * i.cw + v, t.a.push(-2 * (i.A - 1 + (i.A + 1) * i.cw) / t.a0), t.a.push((i.A + 1 + (i.A - 1) * i.cw - v) / t.a0), t.b.push(i.A * (i.A + 1 - (i.A - 1) * i.cw + v) / t.a0), t.b.push(2 * i.A * (i.A - 1 - (i.A + 1) * i.cw) / t.a0), t.b.push(i.A * (i.A + 1 - (i.A - 1) * i.cw - v) / t.a0), t;
        }, highshelf: function(a) {
          var t = C();
          a.BW && delete a.BW;
          var i = c(a);
          t.k = 1;
          var v = 2 * Math.sqrt(i.A) * i.alpha;
          return t.a0 = i.A + 1 - (i.A - 1) * i.cw + v, t.a.push(2 * (i.A - 1 - (i.A + 1) * i.cw) / t.a0), t.a.push((i.A + 1 - (i.A - 1) * i.cw - v) / t.a0), t.b.push(i.A * (i.A + 1 + (i.A - 1) * i.cw + v) / t.a0), t.b.push(-2 * i.A * (i.A - 1 + (i.A + 1) * i.cw) / t.a0), t.b.push(i.A * (i.A + 1 + (i.A - 1) * i.cw - v) / t.a0), t;
        }, aweighting: function(a) {
          var t = C();
          t.k = 1;
          var i = 2 * Math.PI * a.Fc / a.Fs, v = 2 * Math.tan(i / 2), l = a.Q, s = Math.pow(v, 2);
          return t.a0 = 4 * l + s * l + 2 * v, t.a.push(2 * s * l - 8 * l), t.a.push(4 * l + s * l - 2 * v), t.b.push(s * l), t.b.push(2 * s * l), t.b.push(s * l), t;
        } };
      };
      o.exports = d;
    }, {}], 7: [function(r, o, h) {
      var d = r("./utils"), f = d.complex, c = d.runMultiFilter, C = d.runMultiFilterReverse, a = d.evaluatePhase, t = function(i) {
        for (var v = i, l = { re: 1, im: 0 }, s = [], m = [], I = 0; I < v.length; I++) {
          s[I] = {};
          var u = v[I];
          s[I].b0 = { re: u.b[0], im: 0 }, s[I].b1 = { re: u.b[1], im: 0 }, s[I].b2 = { re: u.b[2], im: 0 }, s[I].a1 = { re: u.a[0], im: 0 }, s[I].a2 = { re: u.a[1], im: 0 }, s[I].k = { re: u.k, im: 0 }, s[I].z = [0, 0], m[I] = {}, m[I].b1 = u.b[1] / u.b[0], m[I].b2 = u.b[2] / u.b[0], m[I].a1 = u.a[0], m[I].a2 = u.a[1];
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
          var y = w.Fs, F = w.Fr, X = -Math.PI * (F / y) * 2, z = { re: Math.cos(X), im: Math.sin(X) }, x = f.mul(b.k, f.add(b.b0, f.mul(z, f.add(b.b1, f.mul(b.b2, z))))), U = f.add(l, f.mul(z, f.add(b.a1, f.mul(b.a2, z)))), Z = f.div(x, U);
          return { magnitude: f.magnitude(Z), phase: f.phase(Z) };
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
        }, n = function(w, b) {
          var y = Math.pow(w / 2, 2) - b;
          return y < 0 ? [{ re: -w / 2, im: Math.sqrt(Math.abs(y)) }, { re: -w / 2, im: -Math.sqrt(Math.abs(y)) }] : [{ re: -w / 2 + Math.sqrt(y), im: 0 }, { re: -w / 2 - Math.sqrt(y), im: 0 }];
        }, V = function() {
          for (var w = [], b = 0; b < m.length; b++)
            w[b] = {}, w[b].z = n(m[b].b1, m[b].b2), w[b].p = n(m[b].a1, m[b].a2);
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
          for (I = 0; I < s.length; I++)
            s[I].z = [0, 0];
        } };
      };
      o.exports = t;
    }, { "./utils": 9 }], 8: [function(r, o, h) {
      var d = function(f) {
        var c, C = f, a = [], t = function(s) {
          for (c = 0; c < s.steps; c++)
            a.push(C.singleStep((Math.random() - 0.5) * s.pp + s.offset));
        }, i = function(s) {
          var m = s.offset + s.pp, I = s.offset - s.pp;
          for (c = 0; c < s.steps; c++)
            c % 200 < 100 ? a.push(C.singleStep(m)) : a.push(C.singleStep(I));
        }, v = function(s) {
          var m = s.offset + s.pp, I = s.offset - s.pp;
          for (c = 0; c < s.steps; c++)
            c % 100 == 0 ? a.push(C.singleStep(m)) : a.push(C.singleStep(I));
        }, l = function(s) {
          var m = s.offset + s.pp, I = s.offset - s.pp, u = I, D = (m - I) / 100;
          for (c = 0; c < s.steps; c++)
            c % 200 < 100 ? u += D : u -= D, a.push(C.singleStep(u));
        };
        return { randomStability: function(s) {
          for (C.reinit(), a.length = 0, t(s), c = s.setup; c < a.length; c++)
            if (a[c] > s.maxStable || a[c] < s.minStable)
              return a[c];
          return !0;
        }, directedRandomStability: function(s) {
          C.reinit(), a.length = 0;
          var m;
          for (m = 0; m < s.tests; m++) {
            var I = Math.random();
            I < 0.25 ? t(s) : I < 0.5 ? i(s) : I < 0.75 ? v(s) : l(s);
          }
          for (t(s), c = s.setup; c < a.length; c++)
            if (a[c] > s.maxStable || a[c] < s.minStable)
              return a[c];
          return !0;
        }, evaluateBehavior: function() {
        } };
      };
      o.exports = d;
    }, {}], 9: [function(r, o, h) {
      h.evaluatePhase = function(a) {
        var t = 0, i = 0, v = Math.PI, l = 2 * v, s = [];
        for (i = 0; i < a.length; i++)
          s.push(a[i].phase);
        for (a[0].unwrappedPhase = a[0].phase, a[0].groupDelay = 0, i = 1; i < s.length; i++) {
          var m = s[i] - s[i - 1];
          if (m > v)
            for (t = i; t < s.length; t++)
              s[t] -= l;
          else if (m < -v)
            for (t = i; t < s.length; t++)
              s[t] += l;
          s[i] < 0 ? a[i].unwrappedPhase = -s[i] : a[i].unwrappedPhase = s[i], a[i].phaseDelay = a[i].unwrappedPhase / (i / a.length), a[i].groupDelay = (a[i].unwrappedPhase - a[i - 1].unwrappedPhase) / (v / a.length), a[i].groupDelay < 0 && (a[i].groupDelay = -a[i].groupDelay);
        }
        a[0].magnitude !== 0 ? (a[0].phaseDelay = a[1].phaseDelay, a[0].groupDelay = a[1].groupDelay) : (a[0].phaseDelay = a[2].phaseDelay, a[0].groupDelay = a[2].groupDelay, a[1].phaseDelay = a[2].phaseDelay, a[1].groupDelay = a[2].groupDelay);
      }, h.runMultiFilter = function(a, t, i, v) {
        var l = [];
        v && (l = a);
        var s;
        for (s = 0; s < a.length; s++)
          l[s] = i(a[s], t);
        return l;
      }, h.runMultiFilterReverse = function(a, t, i, v) {
        var l = [];
        v && (l = a);
        var s;
        for (s = a.length - 1; s >= 0; s--)
          l[s] = i(a[s], t);
        return l;
      };
      var d = function(a, t) {
        for (var i = !0; i; ) {
          var v = a, l = t;
          if (i = !1, l || (l = 1), v !== Math.floor(v) || l !== Math.floor(l))
            return 1;
          if (v === 0 || v === 1)
            return l;
          a = v - 1, t = l * v, i = !0;
        }
      };
      h.besselFactors = function(a) {
        for (var t = [], i = 0; i < a + 1; i++) {
          var v = d(2 * a - i), l = Math.pow(2, a - i) * d(i) * d(a - i);
          t.unshift(Math.floor(v / l));
        }
        return t;
      };
      var f = function(a, t) {
        for (var i = 0, v = 0; v < t; v++) {
          var l = 1 / Math.pow(2, v + 1);
          a > l && (a -= l, i += l);
        }
        return i;
      }, c = function(a, t) {
        return a & Math.pow(2, t);
      }, C = function(a, t, i) {
        var v = Math.abs(a), l = a - v;
        return { number: c(v, t).toString(), fraction: f(l, i).toString(), numberBits: t, fractionBits: i };
      };
      h.fixedPoint = { convert: function(a, t, i) {
        return C(a, t, i);
      }, add: function(a, t) {
      }, sub: function(a, t) {
      }, mul: function(a, t) {
      }, div: function(a, t) {
      } }, h.complex = { div: function(a, t) {
        var i = a.re, v = a.im, l = t.re, s = t.im, m = l * l + s * s;
        return { re: (i * l + v * s) / m, im: (v * l - i * s) / m };
      }, mul: function(a, t) {
        var i = a.re, v = a.im, l = t.re, s = t.im;
        return { re: i * l - v * s, im: (i + v) * (l + s) - i * l - v * s };
      }, add: function(a, t) {
        return { re: a.re + t.re, im: a.im + t.im };
      }, sub: function(a, t) {
        return { re: a.re - t.re, im: a.im - t.im };
      }, phase: function(a) {
        return Math.atan2(a.im, a.re);
      }, magnitude: function(a) {
        return Math.sqrt(a.re * a.re + a.im * a.im);
      } };
    }, {}] }, {}, [1])(1);
  });
})(_e);
const G = 60, cA = 0.95, lA = 0.995;
class $e {
  constructor(e) {
    E(this, "session");
    E(this, "iirFilter");
    E(this, "accelerometerDrift");
    E(this, "velocity");
    E(this, "position");
    E(this, "orientation");
    E(this, "motionStatus");
    E(this, "accelerometer");
    E(this, "orientationSensor");
    this.session = e;
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
    }, this.accelerometerDrift = N(), this.velocity = N(), this.position = N(), this.orientation = aA(), this.motionStatus = {
      acceleration: {
        error: null
      },
      gyro: {
        error: null
      }
    };
  }
  readingHandler() {
    var o, h, d, f;
    const e = BA(
      ((o = this.accelerometer) == null ? void 0 : o.x) ?? 0,
      -(((h = this.accelerometer) == null ? void 0 : h.z) ?? 0),
      ((d = this.accelerometer) == null ? void 0 : d.y) ?? 0,
      1
    ), r = ((f = this.orientationSensor) == null ? void 0 : f.quaternion) ?? [0, 0, 0, 1];
    this.orientation = oA(
      r[0],
      r[1],
      r[2],
      r[3]
    ), Ne(e, e, this.orientation), e[0] = this.iirFilter.x.singleStep(e[0]), e[1] = this.iirFilter.y.singleStep(e[1]), e[2] = this.iirFilter.z.singleStep(e[2]), this.velocity[0] += e[0] / G, this.velocity[1] += e[1] / G, this.velocity[2] += e[2] / G, this.position[0] += this.velocity[0] / G * 1e3, this.position[1] += this.velocity[1] / G * 1e3, this.position[2] += this.velocity[2] / G * 1e3, this.velocity[0] *= cA, this.velocity[1] *= cA, this.velocity[2] *= cA, this.position[0] *= lA, this.position[1] *= lA, this.position[2] *= lA, this.session.poser.readjustElements();
  }
  async init() {
    if (LinearAccelerationSensor && RelativeOrientationSensor)
      try {
        this.accelerometer = new LinearAccelerationSensor({
          frequency: G,
          referenceFrame: "screen"
        }), this.accelerometer.addEventListener("error", (e) => {
          var r;
          e.error.name === "NotAllowedError" ? this.motionStatus.acceleration = {
            error: e.error
          } : e.error.name === "NotReadableError" && (this.motionStatus.acceleration = {
            error: e.error
          }), (r = this.accelerometer) == null || r.stop(), this.session.updateStatus();
        }), this.orientationSensor = new RelativeOrientationSensor({
          frequency: G,
          referenceFrame: "screen"
        }), this.orientationSensor.addEventListener("error", (e) => {
          var r;
          e.error.name === "NotAllowedError" ? this.motionStatus.gyro = {
            error: e.error
          } : e.error.name === "NotReadableError" && (this.motionStatus.gyro = {
            error: e.error
          }), (r = this.orientationSensor) == null || r.stop(), this.session.updateStatus();
        }), this.accelerometer.addEventListener("reading", () => {
          this.readingHandler();
        }), this.run();
      } catch (e) {
        e instanceof DOMException && (e.name === "SecurityError" ? this.motionStatus = {
          acceleration: {
            error: "Permission denied"
          },
          gyro: {
            error: "Permission denied"
          }
        } : e.name === "ReferenceError" ? this.motionStatus = {
          acceleration: {
            error: "Sensor is not supported by the User Agent."
          },
          gyro: {
            error: "Sensor is not supported by the User Agent."
          }
        } : this.motionStatus = {
          acceleration: {
            error: e
          },
          gyro: {
            error: e
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
  getOffsetMatrix(e) {
    if (!this.motionStatus.acceleration.error && !this.motionStatus.gyro.error && this.orientation) {
      const r = oA(
        e.orientation[0],
        -e.orientation[1],
        -e.orientation[2],
        e.orientation[3]
      ), o = j();
      vA(o, r), pA(
        o,
        o,
        e.position
      );
      const h = oA(
        this.orientation[0],
        -this.orientation[1],
        -this.orientation[2],
        this.orientation[3]
      ), d = j();
      vA(d, h), pA(d, d, this.position), ze(d, d);
      const f = j();
      return bA(
        f,
        d,
        o
      ), f;
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
var yA = /* @__PURE__ */ ((A) => (A[A.CALIBRATION = 0] = "CALIBRATION", A[A.DETECTION = 1] = "DETECTION", A))(yA || {}), kA = /* @__PURE__ */ ((A) => (A[A.statusChanged = 0] = "statusChanged", A[A.motion = 1] = "motion", A))(kA || {});
class At {
  constructor(e = "default") {
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
    this.initialized = !1, this.name = e, this.state = 0, this.feed = new Ye(this), this.poser = new We(this), this.motion = new $e(this), this.calibration = new Xe(this), this.detector = new Ke(this), this.focusEventRegistration = async () => {
      await this.feed.run(), this.motion.run();
    }, this.blurEventRegistration = () => {
      this.feed.stop(), this.motion.stop();
    }, this.setup = {
      show: !0
    }, this.calibration.loadCameraCalibration();
  }
  updateStatus() {
    const e = {
      initialized: this.initialized,
      feed: this.feed.feedStatus,
      motion: this.motion.motionStatus,
      calibration: this.calibration.calibrationStatus,
      setup: this.setup
    };
    this.eventCallback && this.eventCallback({ name: 0, status: e });
  }
  loadSetup() {
    const e = window.localStorage.getItem(`vuexr/${this.name}/setup`);
    return e ? JSON.parse(e) : {
      show: !0
    };
  }
  storeSetup() {
    window.localStorage.setItem(
      `vuexr/${this.name}/setup`,
      JSON.stringify(this.setup)
    );
  }
  showSetup(e) {
    this.setup.show = e, this.storeSetup(), this.updateStatus();
  }
  async init(e, r) {
    this.setup = this.loadSetup(), this.canvas = e, this.context2d = this.canvas.getContext("2d", { willReadFrequently: !0 }), this.eventCallback = r, this.initialized || (await Promise.all([
      this.feed.init(),
      this.motion.init(),
      this.initWorker()
    ]), this.initialized = !0), this.eventCallback({
      name: 0
      /* statusChanged */
    });
  }
  async initWorker() {
    return new Promise((e) => {
      this.worker = new Worker(new URL("/assets/worker-79d5c38e.js", self.location), {
        type: "module"
      }), this.worker.onmessage = (r) => {
        r.data.operation === P.WORKER_READY ? (this.initialized = !0, this.workerInitialized = !0, e()) : r.data.operation === P.WORKER_FAILED ? (this.workerInitialized = !0, e()) : this.workerHandler(r);
      };
    });
  }
  workerHandler(e) {
    e.data.operation === P.DETECT ? this.detector.detectionFinished(e.data) : e.data.operation === P.FIND_CHESSBOARD_CORNERS_CAPTURED ? this.calibration.findChessBoardCornersCaptured() : e.data.operation === P.FIND_CHESSBOARD_CORNERS_READY ? this.calibration.findChessBoardCornersCaptureReady() : e.data.operation === P.FIND_CHESSBOARD_CORNERS_NOT_READY ? this.calibration.findChessBoardCornersCaptureNotReady() : e.data.operation === P.CALIBRATE && this.calibration.calibrationFinished(e.data);
  }
  async run() {
    await this.feed.run(), await this.motion.run(), window.addEventListener("focus", this.focusEventRegistration), window.addEventListener("blur", this.blurEventRegistration);
  }
  pause() {
    window.removeEventListener("focus", this.focusEventRegistration), window.removeEventListener("blur", this.blurEventRegistration), this.feed.stop(), this.motion.stop();
  }
  calibrate() {
    var e, r;
    this.calibration.calibrate({
      width: ((e = this.canvas) == null ? void 0 : e.width) ?? 0,
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
    const e = A, o = fA("vuexr").requestSession(e.name);
    xA("session", o);
    const h = mA({
      status: {},
      trackedMarkers: []
    }), d = $(), f = $(), c = Symbol();
    function C() {
      o.showSetup(!1);
    }
    function a() {
      o.showSetup(!0);
    }
    function t(l) {
      l.name === kA.statusChanged && l.status && (h.status = l.status);
    }
    function i() {
      var u, D, k, B;
      const l = (((u = d.value) == null ? void 0 : u.width) ?? 0) / (((D = d.value) == null ? void 0 : D.height) ?? 0), s = ((k = f.value) == null ? void 0 : k.clientWidth) ?? 0, m = ((B = f.value) == null ? void 0 : B.clientHeight) ?? 0, I = s / m;
      if (l >= I) {
        const Q = s, M = s / l;
        d.value && (d.value.style.width = `${Q}px`, d.value.style.height = `${M}px`);
      } else {
        const Q = m * l, M = m;
        d.value && (d.value.style.width = `${Q}px`, d.value.style.height = `${M}px`);
      }
    }
    const v = () => {
      i();
    };
    return hA(async () => {
      await o.init(d.value, (l) => {
        t(l);
      }), o.poser.registerView(c, (l) => {
        h.trackedMarkers = l;
      }), await o.run(), await i(), window.addEventListener("resize", v);
    }), IA(() => {
      window.removeEventListener("resize", v), o.poser.unregisterView(c), o.pause();
    }), (l, s) => {
      var m, I, u, D;
      return R(), S("div", {
        class: "ar-view-wrapper",
        ref_key: "wrapper",
        ref: f
      }, [
        K("div", et, [
          K("canvas", {
            class: "ar-canvas",
            ref_key: "canvas",
            ref: d
          }, null, 512),
          K("div", {
            style: ZA({
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
        h.status.initialized && ((I = h.status.feed) != null && I.selected) && !((u = h.status.calibration) != null && u.calibrated) ? (R(), S("div", tt, [
          QA(Ve, {
            session: tA(o),
            status: h.status
          }, null, 8, ["session", "status"])
        ])) : J("", !0),
        h.status.initialized ? (R(), S("div", at, [
          (D = h.status.setup) != null && D.show ? (R(), GA(be, {
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
const nt = /* @__PURE__ */ iA(st, [["__scopeId", "data-v-e53aa743"]]), rt = { key: 0 }, ot = /* @__PURE__ */ AA({
  __name: "ARElement",
  props: {
    id: null,
    timeout: { default: 1e3 },
    markerSize: { default: 50 }
  },
  setup(A) {
    const e = A, r = mA({
      show: !1,
      timeoutHandler: null,
      tracked: !1
    }), o = fA("session"), h = $(null);
    return hA(() => {
      o.poser.registerElement(
        e.id.toString(),
        h.value,
        e.markerSize,
        (d) => {
          r.tracked = d ?? !1, d ? (r.show = !0, r.timeoutHandler != null && (window.clearTimeout(r.timeoutHandler), r.timeoutHandler = null)) : r.timeoutHandler = window.setTimeout(() => {
            r.show = !1;
          }, e.timeout);
        }
      );
    }), IA(() => {
      o.poser.unregisterElement(e.id.toString());
    }), (d, f) => (R(), S("div", {
      class: "element",
      ref_key: "element",
      ref: h
    }, [
      QA(PA, { name: "fade" }, {
        default: JA(() => [
          r.show ? (R(), S("div", rt, [
            CA(d.$slots, "default", {
              tracked: r.tracked
            }, void 0, !0)
          ])) : J("", !0)
        ]),
        _: 3
      })
    ], 512));
  }
});
const ct = /* @__PURE__ */ iA(ot, [["__scopeId", "data-v-ca5da758"]]), lt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAByYAAAUyCAIAAADEGwRQAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH2AkGFAQH++VSRAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAABAElEQVR4nOzcsZGDWBRFweXXmIQh5R+QFMbYsDGM6qyQ9nX7VD2Di3EMtvM8/wEAAAAAoLCuPgAAAAAA4P9DcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAyPy88c7/fn89nfgqf7Ha7PR6Pq6/gfcx8GhsfyMynMfNpbHwgM5/GzKexcfgu23mef35m2/6LU/hwL7wqfC8zH8jGpzHzgcx8FBufycxHMfOBbBy+ocs1TAAAAQBJREFUiB8LAAAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAJf0XsMAAAEASURBVAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJATQl4pAAABAElEQVSRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAZyIz5QAAAQBJREFUAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAykisAAAAAQEZyBQAAAADISJcJGVcAAAEASURBVK4AAAAAABnJFQAAAAAgI7kCAAAAAGQkVwAAAACAjOQKAAAAAJCRXAEAAAAAMpIrAAAAAEBGcgUAAAAAyEiuAAAAAAAZyRUAAAAAICO5AgAAAABkJFcAAAAAgIzkCgAAAACQkVwBAAAAADKSKwAAAABARnIFAAAAAMhIrgAAAAAAGckVAAAAACAjuQIAAAAAZCRXAAAAAICM5AoAAAAAkJFcAQAAAAAy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", ut = ["src"], ht = /* @__PURE__ */ AA({
  __name: "ARChessboard",
  setup(A) {
    return (e, r) => (R(), S("img", {
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
  requestSession(e = "default") {
    return this.sessions[e] || (this.sessions[e] = new At()), this.sessions[e];
  }
  removeSession(e = "default") {
    this.sessions[e].pause(), delete this.sessions[e];
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
const vt = {
  install(A) {
    A.component("ArView", nt), A.component("ArElement", ct), A.component("ArChessboard", ht);
    const e = new ft();
    A.config.globalProperties.$vuexr = e, A.provide("vuexr", e);
  }
};
export {
  vt as VueXR
};
