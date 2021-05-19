! function(t, n) { "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = t || self).LazyLoad = n() }(this, (function() {
    "use strict";

    function t() { return (t = Object.assign || function(t) { for (var n = 1; n < arguments.length; n++) { var e = arguments[n]; for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]) } return t }).apply(this, arguments) }
    var n = "undefined" != typeof window,
        e = n && !("onscroll" in window) || "undefined" != typeof navigator && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
        a = n && "IntersectionObserver" in window,
        o = n && "classList" in document.createElement("p"),
        i = n && window.devicePixelRatio > 1,
        r = { elements_selector: "img", container: e || n ? document : null, threshold: 300, thresholds: null, data_src: "src", data_srcset: "srcset", data_sizes: "sizes", data_bg: "bg", data_bg_hidpi: "bg-hidpi", data_bg_multi: "bg-multi", data_bg_multi_hidpi: "bg-multi-hidpi", data_poster: "poster", class_applied: "applied", class_loading: "loading", class_loaded: "loaded", class_error: "error", load_delay: 0, auto_unobserve: !0, callback_enter: null, callback_exit: null, callback_applied: null, callback_loading: null, callback_loaded: null, callback_error: null, callback_finish: null, use_native: !1 },
        l = function(n) { return t({}, r, n) },
        c = function(t, n) {
            var e, a = new t(n);
            try { e = new CustomEvent("LazyLoad::Initialized", { detail: { instance: a } }) } catch (t) {
                (e = document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized", !1, !1, { instance: a })
            }
            window.dispatchEvent(e)
        },
        s = function(t, n) { return t.getAttribute("data-" + n) },
        u = function(t, n, e) {
            var a = "data-" + n;
            null !== e ? t.setAttribute(a, e) : t.removeAttribute(a)
        },
        d = function(t, n) { return u(t, "ll-status", n) },
        f = function(t, n) { return u(t, "ll-timeout", n) },
        _ = function(t) { return s(t, "ll-timeout") },
        g = function(t, n, e, a) { t && (void 0 === a ? void 0 === e ? t(n) : t(n, e) : t(n, e, a)) },
        v = function(t, n) { o ? t.classList.add(n) : t.className += (t.className ? " " : "") + n },
        p = function(t, n) { o ? t.classList.remove(n) : t.className = t.className.replace(new RegExp("(^|\\s+)" + n + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "") },
        b = function(t) { return t.llTempImage },
        h = function(t) { t && (t.loadingCount += 1) },
        m = function(t) { for (var n, e = [], a = 0; n = t.children[a]; a += 1) "SOURCE" === n.tagName && e.push(n); return e },
        y = function(t, n, e) { e && t.setAttribute(n, e) },
        E = function(t, n) { y(t, "sizes", s(t, n.data_sizes)), y(t, "srcset", s(t, n.data_srcset)), y(t, "src", s(t, n.data_src)) },
        w = {
            IMG: function(t, n) {
                var e = t.parentNode;
                e && "PICTURE" === e.tagName && m(e).forEach((function(t) { E(t, n) }));
                E(t, n)
            },
            IFRAME: function(t, n) { y(t, "src", s(t, n.data_src)) },
            VIDEO: function(t, n) { m(t).forEach((function(t) { y(t, "src", s(t, n.data_src)) })), y(t, "poster", s(t, n.data_poster)), y(t, "src", s(t, n.data_src)), t.load() }
        },
        I = function(t, n, e) {
            var a = w[t.tagName];
            a && (a(t, n), h(e), v(t, n.class_loading), d(t, "loading"), g(n.callback_loading, t, e), g(n.callback_reveal, t, e))
        },
        k = ["IMG", "IFRAME", "VIDEO"],
        L = function(t, n) {!n || n.toLoadCount || n.loadingCount || g(t.callback_finish, n) },
        C = function(t, n, e) { t.addEventListener(n, e) },
        A = function(t, n, e) { t.removeEventListener(n, e) },
        z = function(t, n, e) { A(t, "load", n), A(t, "loadeddata", n), A(t, "error", e) },
        O = function(t, n, e) {
            ! function(t) { delete t.llTempImage }(t),
            function(t, n) { n && (n.loadingCount -= 1) }(0, e), p(t, n.class_loading)
        },
        N = function(t, n, e) {
            var a = b(t) || t,
                o = function o(r) {! function(t, n, e, a) { O(n, e, a), v(n, e.class_loaded), d(n, "loaded"), g(e.callback_loaded, n, a), L(e, a) }(0, t, n, e), z(a, o, i) },
                i = function i(r) {! function(t, n, e, a) { O(n, e, a), v(n, e.class_error), d(n, "error"), g(e.callback_error, n, a), L(e, a) }(0, t, n, e), z(a, o, i) };
            ! function(t, n, e) { C(t, "load", n), C(t, "loadeddata", n), C(t, "error", e) }(a, o, i)
        },
        x = function(t, n) { n && (n.toLoadCount -= 1) },
        M = function(t, n, e) {
            ! function(t) { t.llTempImage = document.createElement("img") }(t), N(t, n, e),
                function(t, n, e) {
                    var a = s(t, n.data_bg),
                        o = s(t, n.data_bg_hidpi),
                        r = i && o ? o : a;
                    r && (t.style.backgroundImage = 'url("'.concat(r, '")'), b(t).setAttribute("src", r), h(e), v(t, n.class_loading), d(t, "loading"), g(n.callback_loading, t, e), g(n.callback_reveal, t, e))
                }(t, n, e),
                function(t, n, e) {
                    var a = s(t, n.data_bg_multi),
                        o = s(t, n.data_bg_multi_hidpi),
                        r = i && o ? o : a;
                    r && (t.style.backgroundImage = r, v(t, n.class_applied), d(t, "applied"), g(n.callback_applied, t, e))
                }(t, n, e)
        },
        R = function(t, n, e) {
            ! function(t) { return k.indexOf(t.tagName) > -1 }(t) ? M(t, n, e): function(t, n, e) { N(t, n, e), I(t, n, e) }(t, n, e), x(0, e),
                function(t, n) {
                    if (n) {
                        var e = n._observer;
                        e && n._settings.auto_unobserve && e.unobserve(t)
                    }
                }(t, e), L(n, e)
        },
        T = function(t) {
            var n = _(t);
            n && (clearTimeout(n), f(t, null))
        },
        j = function(t, n, e) {
            var a = e._settings;
            g(a.callback_enter, t, n, e), a.load_delay ? function(t, n, e) {
                var a = n.load_delay,
                    o = _(t);
                o || (o = setTimeout((function() { R(t, n, e), T(t) }), a), f(t, o))
            }(t, a, e) : R(t, a, e)
        },
        F = ["IMG", "IFRAME"],
        G = function(t) { return t.use_native && "loading" in HTMLImageElement.prototype },
        P = function(t, n, e) { t.forEach((function(t) {-1 !== F.indexOf(t.tagName) && (t.setAttribute("loading", "lazy"), function(t, n, e) { N(t, n, e), I(t, n, e), x(0, e), d(t, "native"), L(n, e) }(t, n, e)) })), e.toLoadCount = 0 },
        D = function(t, n) {
            ! function(t) { t.disconnect() }(t),
            function(t, n) { n.forEach((function(n) { t.observe(n), d(n, "observed") })) }(t, n)
        },
        S = function(t) {
            var n;
            a && !G(t._settings) && (t._observer = new IntersectionObserver((function(n) {
                n.forEach((function(n) {
                    return function(t) { return t.isIntersecting || t.intersectionRatio > 0 }(n) ? j(n.target, n, t) : function(t, n, e) {
                        var a = e._settings;
                        g(a.callback_exit, t, n, e), a.load_delay && T(t)
                    }(n.target, n, t)
                }))
            }), { root: (n = t._settings).container === document ? null : n.container, rootMargin: n.thresholds || n.threshold + "px" }))
        },
        U = function(t) { return Array.prototype.slice.call(t) },
        V = function(t) { return t.container.querySelectorAll(t.elements_selector) },
        $ = function(t) { return ! function(t) { return null !== s(t, "ll-status") }(t) || function(t) { return "observed" === s(t, "ll-status") }(t) },
        q = function(t) { return function(t) { return "error" === s(t, "ll-status") }(t) },
        H = function(t, n) { return function(t) { return U(t).filter($) }(t || V(n)) },
        B = function(t) {
            var n, e = t._settings;
            (n = V(e), U(n).filter(q)).forEach((function(t) {
                p(t, e.class_error),
                    function(t) { u(t, "ll-status", null) }(t)
            })), t.update()
        },
        J = function(t, e) {
            var a;
            this._settings = l(t), this.loadingCount = 0, S(this), a = this, n && window.addEventListener("online", (function(t) { B(a) })), this.update(e)
        };
    return J.prototype = {
        update: function(t) {
            var n = this._settings,
                o = H(t, n);
            this.toLoadCount = o.length, !e && a ? G(n) ? P(o, n, this) : D(this._observer, o) : this.loadAll(o)
        },
        destroy: function() { this._observer && this._observer.disconnect(), delete this._observer, delete this._settings, delete this.loadingCount, delete this.toLoadCount },
        loadAll: function(t) {
            var n = this,
                e = this._settings;
            H(t, e).forEach((function(t) { R(t, e, n) }))
        },
        load: function(t) { R(t, this._settings, this) }
    }, J.load = function(t, n) {
        var e = l(n);
        R(t, e)
    }, n && function(t, n) {
        if (n)
            if (n.length)
                for (var e, a = 0; e = n[a]; a += 1) c(t, e);
            else c(t, n)
    }(J, window.lazyLoadOptions), J
}));