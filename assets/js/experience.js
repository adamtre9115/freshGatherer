$(document).ready(function () {

    // smooth scroll
    window.smoothScroll = function (target) {
        var scrollContainer = target;
        do { //find scroll container
            scrollContainer = scrollContainer.parentNode;
            if (!scrollContainer) return;
            scrollContainer.scrollTop += 1;
        } while (scrollContainer.scrollTop == 0);
        var targetY = 0;
        do { //find the top of target relatively to the container
            if (target == scrollContainer) break;
            targetY += target.offsetTop;
        } while (target = target.offsetParent);
        scroll = function (c, a, b, i) {
            i++;
            if (i > 30) return;
            c.scrollTop = a + (b - a) / 30 * i;
            setTimeout(function () {
                scroll(c, a, b, i);
            }, 20);
        }
        // start scrolling
        scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
    }
    // end smooth scroll

    //On  any button click...
    $(document).on("click", "button", function () {
        console.log(this);
    });


});

// back to top
var floatPanel = new McFloatPanel();
/* Float Panel v2016.10.28. Copyright www.menucool.com */
function McFloatPanel() {
    var i = [],
        s = [],
        h = "className",
        t = "getElementsByClassName",
        d = "length",
        l = "display",
        C = "transition",
        m = "style",
        B = "height",
        c = "scrollTop",
        k = "offsetHeight",
        a = "fixed",
        e = document,
        b = document.documentElement,
        j = function (a, c, b) {
            if (a.addEventListener) a.addEventListener(c, b, false);
            else a.attachEvent && a.attachEvent("on" + c, b)
        },
        o = function (c, d) {
            if (typeof getComputedStyle != "undefined") var b = getComputedStyle(c, null);
            else b = c.currentStyle;
            return b ? b[d] : a
        },
        L = function () {
            var a = e.body;
            return Math.max(a.scrollHeight, a[k], b.clientHeight, b.scrollHeight, b[k])
        },
        O = function (a, c) {
            var b = a[d];
            while (b--)
                if (a[b] === c) return true;
            return false
        },
        g = function (b, a) {
            return O(b[h].split(" "), a)
        },
        q = function (a, b) {
            if (!g(a, b))
                if (!a[h]) a[h] = b;
                else a[h] += " " + b
        },
        p = function (a, f) {
            if (a[h] && g(a, f)) {
                for (var e = "", c = a[h].split(" "), b = 0, i = c[d]; b < i; b++)
                    if (c[b] !== f) e += c[b] + " ";
                a[h] = e.replace(/^\s+|\s+$/g, "")
            }
        },
        n = function () {
            return window.pageYOffset || b[c]
        },
        z = function (a) {
            return a.getBoundingClientRect().top
        },
        F = function (b) {
            var c = n();
            if (c > b.oS && !g(b, a)) q(b, a);
            else g(b, a) && c < b.oS && p(b, a)
        },
        x = function () {
            for (var a = 0; a < s[d]; a++) J(s[a])
        },
        J = function (a) {
            if (a.oS) {
                a.fT && clearTimeout(a.fT);
                a.fT = setTimeout(function () {
                    if (a.aF) F(a);
                    else y(a)
                }, 50)
            } else y(a)
        },
        w = function (d, c, b) {
            p(d, a);
            c[l] = "none";
            b.position = b.top = ""
        },
        y = function (c) {
            var j = z(c),
                f = c[k],
                e = c[m],
                d = c.pH[m],
                h = n();
            if (j < c.oT && h > c.oS && !g(c, a) && (window.innerHeight || b.clientHeight) > f) {
                c.tP = h + j - c.oT;
                var p = L();
                if (f > p - c.tP - f) var i = f;
                else i = 0;
                d[l] = "block";
                d[C] = "none";
                d[B] = f + 1 + "px";
                c.pH[k];
                d[C] = "height .3s";
                d[B] = i + "px";
                q(c, a);
                e.position = a;
                e.top = c.oT + "px";
                if (o(c, "position") != a) d[l] = "none"
            } else if (g(c, a) && (h < c.tP || h < c.oS)) {
                var s = o(c, "animation");
                if (c.oS && c.classList && s.indexOf("slide-down") != -1) {
                    var r = o(c, "animationDuration");
                    c.classList.remove(a);
                    e.animationDirection = "reverse";
                    e.animationDuration = "300ms";
                    void c[k];
                    c.classList.add(a);
                    setTimeout(function () {
                        w(c, d, e);
                        e.animationDirection = "normal";
                        e.animationDuration = r
                    }, 300)
                } else w(c, d, e)
            }
        },
        I = function () {
            var f = [],
                c, b;
            if (e[t]) {
                f = e[t]("float-panel");
                i = e[t]("slideanim")
            } else {
                var k = e.getElementsByTagName("*");
                c = k[d];
                while (c--) g(k[c], "float-panel") && f.push(k[c])
            }
            c = f[d];
            for (var h = 0; h < c; h++) {
                b = s[h] = f[h];
                b.oT = parseInt(b.getAttribute("data-top") || 0);
                b.oS = parseInt(b.getAttribute("data-scroll") || 0);
                if (b.oS > 20 && o(b, "position") == a) b.aF = 1;
                b.pH = e.createElement("div");
                b.pH[m].width = b.offsetWidth + "px";
                b.pH[m][l] = "none";
                b.parentNode.insertBefore(b.pH, b.nextSibling)
            }
            if (s[d]) {
                setTimeout(x, 160);
                j(window, "scroll", x)
            }
        },
        f, D = 200,
        E = 0,
        r, u, H = function () {
            return window.innerWidth || b.clientWidth || e.body.clientWidth
        };

    function K() {
        if (!r) r = setInterval(function () {
            var a = e.body;
            if (a[c] < 3) a[c] = 0;
            else a[c] = a[c] / 1.3;
            if (b[c] < 3) b[c] = 0;
            else b[c] = b[c] / 1.3;
            if (!n()) {
                clearInterval(r);
                r = null
            }
        }, 14)
    }

    function A() {
        clearTimeout(u);
        if (n() > D && H() > E) {
            u = setTimeout(function () {
                p(f, "mcOut")
            }, 60);
            f[m][l] = "block"
        } else {
            q(f, "mcOut");
            u = setTimeout(function () {
                f[m][l] = "none"
            }, 500)
        }
    }
    var N = function () {
            f = e.getElementById("backtop");
            if (f) {
                var a = f.getAttribute("data-v-w");
                if (a) {
                    a = a.replace(/\s/g, "").split(",");
                    D = parseInt(a[0]);
                    if (a[d] > 1) E = parseInt(a[1])
                }
                j(f, "click", K);
                j(window, "scroll", A);
                A()
            }
        },
        v = function () {
            for (var c = n(), e = c + window.innerHeight, g = i[d], b, f, a = 0; a < g; a++) {
                b = c + z(i[a]), f = b + i[a][k];
                if (b < e) q(i[a], "slide");
                else p(i[a], "slide")
            }
        },
        G = function () {
            if (i[d]) {
                j(window, "scroll", v);
                v()
            }
        },
        M = function () {
            I();
            N();
            G()
        };
    j(window, "load", M);
    j(document, "touchstart", function () {})
}