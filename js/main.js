(function ($) {
  "use strict";

  // Navbar on scrolling
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".navbar").fadeIn("slow").css("display", "flex");
    } else {
      $(".navbar").fadeOut("slow").css("display", "none");
    }
  });

  // Smooth scrolling on the navbar links
  $(".navbar-nav a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 45,
        },
        1500,
        "easeInOutExpo"
      );

      if ($(this).parents(".navbar-nav").length) {
        $(".navbar-nav .active").removeClass("active");
        $(this).closest("a").addClass("active");
      }
    }
  });

  // Typed Initiate
  if ($(".typed-text-output").length == 1) {
    var typed_strings = $(".typed-text").text();
    var typed = new Typed(".typed-text-output", {
      strings: typed_strings.split(", "),
      typeSpeed: 100,
      backSpeed: 20,
      smartBackspace: false,
      loop: true,
    });
  }

  // Modal Video
  $(document).ready(function () {
    var $videoSrc;
    $(".btn-play").click(function () {
      $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);

    $("#videoModal").on("shown.bs.modal", function (e) {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });

    $("#videoModal").on("hide.bs.modal", function (e) {
      $("#video").attr("src", $videoSrc);
    });
  });

  // Scroll to Bottom
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".scroll-to-bottom").fadeOut("slow");
    } else {
      $(".scroll-to-bottom").fadeIn("slow");
    }
  });

  // Skills
  $(".skill").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Portfolio isotope and filter
  var portfolioIsotope = $(".portfolio-container").isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows",
  });
  $("#portfolio-flters li").on("click", function () {
    $("#portfolio-flters li").removeClass("active");
    $(this).addClass("active");

    portfolioIsotope.isotope({ filter: $(this).data("filter") });
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    dots: true,
    loop: true,
    items: 1,
  });
})(jQuery);
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t(require("three"), require("gsap/TweenMax")))
    : "function" == typeof define && define.amd
    ? define(["three", "gsap/TweenMax"], t)
    : (e.hoverEffect = t(e.THREE, e.TweenMax));
})(this, function (e, t) {
  return (
    (t = t && t.hasOwnProperty("default") ? t.default : t),
    function (n) {
      function i() {
        for (var e = arguments, t = 0; t < arguments.length; t++)
          if (void 0 !== e[t]) return e[t];
      }
      console.log(
        "%c Hover effect by Robin Delaporte: https://github.com/robin-dela/hover-effect ",
        "color: #bada55; font-size: 0.8rem"
      );
      var r = n.parent,
        o = n.displacementImage,
        a = n.image1,
        s = n.image2,
        f = i(n.imagesRatio, 1),
        d = i(n.intensity1, n.intensity, 1),
        l = i(n.intensity2, n.intensity, 1),
        u = i(n.angle, Math.PI / 4),
        v = i(n.angle1, u),
        m = i(n.angle2, 3 * -u),
        c = i(n.speedIn, n.speed, 1.6),
        p = i(n.speedOut, n.speed, 1.2),
        g = i(n.hover, !0),
        h = i(n.easing, Expo.easeOut),
        y = i(n.video, !1);
      if (r)
        if (a && s && o) {
          var x = new e.Scene(),
            F = new e.OrthographicCamera(
              r.offsetWidth / -2,
              r.offsetWidth / 2,
              r.offsetHeight / 2,
              r.offsetHeight / -2,
              1,
              1e3
            );
          F.position.z = 1;
          var w = new e.WebGLRenderer({ antialias: !1, alpha: !0 });
          w.setPixelRatio(2),
            w.setClearColor(16777215, 0),
            w.setSize(r.offsetWidth, r.offsetHeight),
            r.appendChild(w.domElement);
          var L = function () {
              w.render(x, F);
            },
            H = new e.TextureLoader();
          H.crossOrigin = "";
          var E,
            W,
            V = H.load(o, L);
          if (((V.magFilter = V.minFilter = e.LinearFilter), y)) {
            var M = function () {
              requestAnimationFrame(M), w.render(x, F);
            };
            M(),
              ((y = document.createElement("video")).autoplay = !0),
              (y.loop = !0),
              (y.src = a),
              y.load();
            var P = document.createElement("video");
            (P.autoplay = !0), (P.loop = !0), (P.src = s), P.load();
            var R = new e.VideoTexture(y),
              T = new e.VideoTexture(P);
            (R.magFilter = T.magFilter = e.LinearFilter),
              (R.minFilter = T.minFilter = e.LinearFilter),
              P.addEventListener(
                "loadeddata",
                function () {
                  P.play(),
                    ((T = new e.VideoTexture(P)).magFilter = e.LinearFilter),
                    (T.minFilter = e.LinearFilter),
                    (C.uniforms.texture2.value = T);
                },
                !1
              ),
              y.addEventListener(
                "loadeddata",
                function () {
                  y.play(),
                    ((R = new e.VideoTexture(y)).magFilter = e.LinearFilter),
                    (R.minFilter = e.LinearFilter),
                    (C.uniforms.texture1.value = R);
                },
                !1
              );
          } else
            (R = H.load(a, L)),
              (T = H.load(s, L)),
              (R.magFilter = T.magFilter = e.LinearFilter),
              (R.minFilter = T.minFilter = e.LinearFilter);
          var U = f;
          r.offsetHeight / r.offsetWidth < U
            ? ((E = 1), (W = r.offsetHeight / r.offsetWidth / U))
            : ((E = (r.offsetWidth / r.offsetHeight) * U), (W = 1));
          var C = new e.ShaderMaterial({
              uniforms: {
                intensity1: { type: "f", value: d },
                intensity2: { type: "f", value: l },
                dispFactor: { type: "f", value: 0 },
                angle1: { type: "f", value: v },
                angle2: { type: "f", value: m },
                texture1: { type: "t", value: R },
                texture2: { type: "t", value: T },
                disp: { type: "t", value: V },
                res: {
                  type: "vec4",
                  value: new e.Vector4(r.offsetWidth, r.offsetHeight, E, W),
                },
                dpr: { type: "f", value: window.devicePixelRatio },
              },
              vertexShader:
                "\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n",
              fragmentShader:
                "\nvarying vec2 vUv;\n\nuniform float dispFactor;\nuniform float dpr;\nuniform sampler2D disp;\n\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform float angle1;\nuniform float angle2;\nuniform float intensity1;\nuniform float intensity2;\nuniform vec4 res;\nuniform vec2 parent;\n\nmat2 getRotM(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat2(c, -s, s, c);\n}\n\nvoid main() {\n  vec4 disp = texture2D(disp, vUv);\n  vec2 dispVec = vec2(disp.r, disp.g);\n\n  vec2 uv = 0.5 * gl_FragCoord.xy / (res.xy) ;\n  vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);\n\n\n  vec2 distortedPosition1 = myUV + getRotM(angle1) * dispVec * intensity1 * dispFactor;\n  vec2 distortedPosition2 = myUV + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);\n  vec4 _texture1 = texture2D(texture1, distortedPosition1);\n  vec4 _texture2 = texture2D(texture2, distortedPosition2);\n  gl_FragColor = mix(_texture1, _texture2, dispFactor);\n}\n",
              transparent: !0,
              opacity: 1,
            }),
            b = new e.PlaneBufferGeometry(r.offsetWidth, r.offsetHeight, 1),
            D = new e.Mesh(b, C);
          x.add(D),
            g &&
              (r.addEventListener("mouseenter", _),
              r.addEventListener("touchstart", _),
              r.addEventListener("mouseleave", z),
              r.addEventListener("touchend", z)),
            window.addEventListener("resize", function (t) {
              r.offsetHeight / r.offsetWidth < U
                ? ((E = 1), (W = r.offsetHeight / r.offsetWidth / U))
                : ((E = (r.offsetWidth / r.offsetHeight) * U), (W = 1)),
                (D.material.uniforms.res.value = new e.Vector4(
                  r.offsetWidth,
                  r.offsetHeight,
                  E,
                  W
                )),
                w.setSize(r.offsetWidth, r.offsetHeight),
                L();
            }),
            (this.next = _),
            (this.previous = z);
        } else console.warn("One or more images are missing");
      else console.warn("Parent missing");
      function _() {
        t.to(C.uniforms.dispFactor, c, {
          value: 1,
          ease: h,
          onUpdate: L,
          onComplete: L,
        });
      }
      function z() {
        t.to(C.uniforms.dispFactor, p, {
          value: 0,
          ease: h,
          onUpdate: L,
          onComplete: L,
        });
      }
    }
  );
});

// app.js
new hoverEffect({
  parent: document.querySelector(".distortion"),
  intensity: 0.2,
  image1: "img/pabitra4.jpg",
  image2: "img/pabitra2.jpg",
  displacementImage:
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="28" height="49" viewBox="0 0 28 49"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="hexagons" fill="%239C92AC" fill-opacity="0.4" fill-rule="nonzero"%3E%3Cpath d="M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E',
});
