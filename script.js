function scroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

scroll();

function loadingAnimation() {
  let tl = gsap.timeline();

  tl.from(
    ".line h1",
    {
      y: 150,
      stagger: 0.25,
      duration: 0.6,
      delay: 0.5,
    },
    "anim"
  );

  tl.from(
    ".line1",
    {
      opacity: 0,
      duration: 1,
      onStart: function () {
        let timer = document.querySelector(".line1 h5");
        let grow = 0;
        let interval = setInterval(function () {
          if (grow < 100) {
            grow++;
            timer.innerHTML = grow;
          } else {
            clearInterval(interval);
          }
        }, 30);
      },
    },
    "line"
  );
  tl.to(
    ".line h2",
    {
      animationName: "loadingh2",
      opacity: 1,
    },
    "line"
  );
  tl.to("#loader", {
    duration: 0.5,
    opacity: 0,
    ease: "expo-out",
    delay: 2.5,
    display: "none",
  });
  tl.from("#page1", {
    y: 1600,
    duration: 0.5,
  });
  tl.from("#nav", {
    opacity: 0,
    duration: 0.5,
  });
  tl.from("#hero1 h1", {
    y: 150,
    duration: 0.3,
  });
  tl.from("#hero2 h1", {
    y: 150,
    duration: 0.3,
    delay: -0.1,
  });
  tl.from(
    "#hero3 h2",
    {
      y: 150,
      duration: 0.6,
      delay: -0.2,
    },
    "hero"
  );
  tl.from(
    "#hero3 h3",
    {
      y: 150,
      duration: 0.8,
      delay: -0.3,
    },
    "hero"
  );
  tl.from("#hero4 h1", {
    y: 150,
    duration: 1,
    delay: -0.4,
  });
  tl.from(
    "#hero1, #page2",
    {
      duration: 0.5,
      opacity: 0,
    },
    "-=1.5"
  );
}

loadingAnimation();

if (window.innerWidth > 1024) {
  window.addEventListener("mousemove", function (dets) {
    let crsr = document.querySelector("#crsr");
    gsap.to(crsr, {
      y: dets.y - crsr.offsetHeight / 2,
      x: dets.x - crsr.offsetWidth / 2,
    });
  });

  if (
    !/Android|webOS|iPhone|iPad|ipod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    function AllSheryEffects() {
      Shery.makeMagnet("#nav-part2 p" /* Element to target.*/, {
        //Parameters are optional.
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });
      Shery.makeMagnet("#menu-div" /* Element to target.*/, {
        //Parameters are optional.
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });
      Shery.imageEffect("#card1-image", {
        style: 2 /*OR 5 for different variant */,
        // config: {"a":{"value":6.87,"range":[0,30]},"b":{"value":0.7,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8547057640943163},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.46,"range":[0,2]},"discard_threshold":{"value":0.38,"range":[0,1]},"antialias_threshold":{"value":0.01,"range":[0,0.1]},"noise_height":{"value":0.34,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
        // debug: true,
        gooey: true,
        // condig: {"resolutionXY":{"value":54.49},"distortion":{"value":true},"mode":{"value":-10},"mousemove":{"value":0},"modeA":{"value":1},"modeN":{"value":3},"speed":{"value":1,"range":[-500,500],"rangep":[-10,10]},"frequency":{"value":317.95,"range":[-800,800],"rangep":[-50,50]},"angle":{"value":1.07,"range":[0,3.141592653589793]},"waveFactor":{"value":1.4,"range":[-3,3]},"color":{"value":10212607},"pixelStrength":{"value":100,"range":[-20,100],"rangep":[-20,20]},"quality":{"value":5.9,"range":[0,10]},"contrast":{"value":1,"range":[-25,25]},"brightness":{"value":1,"range":[-1,25]},"colorExposer":{"value":0.18,"range":[-5,5]},"strength":{"value":0.2,"range":[-40,40],"rangep":[-5,5]},"exposer":{"value":8,"range":[-100,100]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8547057640943163},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.52,"y":1}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.24,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
        config: {
          resolutionXY: { value: 100 },
          distortion: { value: true },
          mode: { value: -10 },
          mousemove: { value: 0 },
          modeA: { value: 0 },
          modeN: { value: 3 },
          speed: { value: 1, range: [-500, 500], rangep: [-10, 10] },
          frequency: { value: 50, range: [-800, 800], rangep: [-50, 50] },
          angle: { value: 0.5, range: [0, 3.141592653589793] },
          waveFactor: { value: 1.4, range: [-3, 3] },
          color: { value: 10212607 },
          pixelStrength: { value: 3, range: [-20, 100], rangep: [-20, 20] },
          quality: { value: 5, range: [0, 10] },
          contrast: { value: 1, range: [-25, 25] },
          brightness: { value: 1, range: [-1, 25] },
          colorExposer: { value: 0.18, range: [-5, 5] },
          strength: { value: 0.2, range: [-40, 40], rangep: [-5, 5] },
          exposer: { value: 8, range: [-100, 100] },
          zindex: { value: -9996999, range: [-9999999, 9999999] },
          aspect: { value: 0.8547057640943163 },
          ignoreShapeAspect: { value: true },
          shapePosition: { value: { x: 0, y: 0 } },
          shapeScale: { value: { x: 0.5, y: 0.5 } },
          shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
          shapeRadius: { value: 0, range: [0, 2] },
          currentScroll: { value: 0 },
          scrollLerp: { value: 0.07 },
          gooey: { value: true },
          infiniteGooey: { value: true },
          growSize: { value: 6.45, range: [1, 15] },
          durationOut: { value: 1, range: [0.1, 5] },
          durationIn: { value: 1.5, range: [0.1, 5] },
          displaceAmount: { value: 0.5 },
          masker: { value: true },
          maskVal: { value: 1.37, range: [1, 5] },
          scrollType: { value: 0 },
          geoVertex: { range: [1, 64], value: 1 },
          noEffectGooey: { value: true },
          onMouse: { value: 1 },
          noise_speed: { value: 2.44, range: [0, 10] },
          metaball: { value: 0.37, range: [0, 2] },
          discard_threshold: { value: 0.59, range: [0, 1] },
          antialias_threshold: { value: 0.02, range: [0, 0.1] },
          noise_height: { value: 0.5, range: [0, 2] },
          noise_scale: { value: 10, range: [0, 100] },
        },
      });
      Shery.makeMagnet("#nav-part2 p" /* Element to target.*/, {
        //Parameters are optional.
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });

      Shery.imageEffect("#card2-image", {
        style: 2 /*OR 5 for different variant */,
        gooey: true,
        config: {
          resolutionXY: { value: 67.31 },
          distortion: { value: true },
          mode: { value: -10 },
          mousemove: { value: 0 },
          modeA: { value: 0 },
          modeN: { value: 3 },
          speed: { value: 3.97, range: [-500, 500], rangep: [-10, 10] },
          frequency: { value: 50, range: [-800, 800], rangep: [-50, 50] },
          angle: { value: 1.55, range: [0, 3.141592653589793] },
          waveFactor: { value: 1, range: [-3, 3] },
          color: { value: 10212607 },
          pixelStrength: { value: -3.08, range: [-20, 100], rangep: [-20, 20] },
          quality: { value: 2.37, range: [0, 10] },
          contrast: { value: 1, range: [-25, 25] },
          brightness: { value: 1, range: [-1, 25] },
          colorExposer: { value: 0.18, range: [-5, 5] },
          strength: { value: 0.2, range: [-40, 40], rangep: [-5, 5] },
          exposer: { value: 21.79, range: [-100, 100] },
          zindex: { value: -9996999, range: [-9999999, 9999999] },
          aspect: { value: 0.7682478218780252 },
          ignoreShapeAspect: { value: true },
          shapePosition: { value: { x: 0, y: 0 } },
          shapeScale: { value: { x: 0.5, y: 0.5 } },
          shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
          shapeRadius: { value: 0, range: [0, 2] },
          currentScroll: { value: 0 },
          scrollLerp: { value: 0.07 },
          gooey: { value: true },
          infiniteGooey: { value: false },
          growSize: { value: 4, range: [1, 15] },
          durationOut: { value: 1, range: [0.1, 5] },
          durationIn: { value: 1.5, range: [0.1, 5] },
          displaceAmount: { value: 0.5 },
          masker: { value: true },
          maskVal: { value: 1.27, range: [1, 5] },
          scrollType: { value: 0 },
          geoVertex: { range: [1, 64], value: 1 },
          noEffectGooey: { value: true },
          onMouse: { value: 1 },
          noise_speed: { value: 0.2, range: [0, 10] },
          metaball: { value: 0.43, range: [0, 2] },
          discard_threshold: { value: 0.5, range: [0, 1] },
          antialias_threshold: { value: 0, range: [0, 0.1] },
          noise_height: { value: 0.5, range: [0, 2] },
          noise_scale: { value: 10, range: [0, 100] },
        },
        // config:{"resolutionXY":{"value":100},"distortion":{"value":true},"mode":{"value":-10},"mousemove":{"value":0},"modeA":{"value":0},"modeN":{"value":3},"speed":{"value":1,"range":[-500,500],"rangep":[-10,10]},"frequency":{"value":50,"range":[-800,800],"rangep":[-50,50]},"angle":{"value":0.5,"range":[0,3.141592653589793]},"waveFactor":{"value":1.4,"range":[-3,3]},"color":{"value":10212607},"pixelStrength":{"value":3,"range":[-20,100],"rangep":[-20,20]},"quality":{"value":5,"range":[0,10]},"contrast":{"value":1,"range":[-25,25]},"brightness":{"value":1,"range":[-1,25]},"colorExposer":{"value":0.18,"range":[-5,5]},"strength":{"value":0.2,"range":[-40,40],"rangep":[-5,5]},"exposer":{"value":8,"range":[-100,100]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8547057640943163},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":6.45,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.37,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":2.44,"range":[0,10]},"metaball":{"value":0.37,"range":[0,2]},"discard_threshold":{"value":0.59,"range":[0,1]},"antialias_threshold":{"value":0.02,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
      });

      Shery.imageEffect("#card3-image", {
        style: 2 /*OR 5 for different variant */,
        gooey: true,
        config: {
          resolutionXY: { value: 67.31 },
          distortion: { value: true },
          mode: { value: -10 },
          mousemove: { value: 0 },
          modeA: { value: 0 },
          modeN: { value: 3 },
          speed: { value: 3.97, range: [-500, 500], rangep: [-10, 10] },
          frequency: { value: 50, range: [-800, 800], rangep: [-50, 50] },
          angle: { value: 1.55, range: [0, 3.141592653589793] },
          waveFactor: { value: 1, range: [-3, 3] },
          color: { value: 10212607 },
          pixelStrength: { value: -3.08, range: [-20, 100], rangep: [-20, 20] },
          quality: { value: 2.37, range: [0, 10] },
          contrast: { value: 1, range: [-25, 25] },
          brightness: { value: 1, range: [-1, 25] },
          colorExposer: { value: 0.18, range: [-5, 5] },
          strength: { value: 0.2, range: [-40, 40], rangep: [-5, 5] },
          exposer: { value: 21.79, range: [-100, 100] },
          zindex: { value: -9996999, range: [-9999999, 9999999] },
          aspect: { value: 0.8799955197132616 },
          ignoreShapeAspect: { value: true },
          shapePosition: { value: { x: 0, y: 0 } },
          shapeScale: { value: { x: 0.5, y: 0.5 } },
          shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
          shapeRadius: { value: 0, range: [0, 2] },
          currentScroll: { value: 0 },
          scrollLerp: { value: 0.07 },
          gooey: { value: true },
          infiniteGooey: { value: false },
          growSize: { value: 4, range: [1, 15] },
          durationOut: { value: 1, range: [0.1, 5] },
          durationIn: { value: 1.5, range: [0.1, 5] },
          displaceAmount: { value: 0.5 },
          masker: { value: true },
          maskVal: { value: 1.27, range: [1, 5] },
          scrollType: { value: 0 },
          geoVertex: { range: [1, 64], value: 1 },
          noEffectGooey: { value: true },
          onMouse: { value: 1 },
          noise_speed: { value: 0.2, range: [0, 10] },
          metaball: { value: 0.24, range: [0, 2] },
          discard_threshold: { value: 0.52, range: [0, 1] },
          antialias_threshold: { value: 0, range: [0, 0.1] },
          noise_height: { value: 0.5, range: [0, 2] },
          noise_scale: { value: 6.11, range: [0, 100] },
        },
        // config:{"resolutionXY":{"value":100},"distortion":{"value":true},"mode":{"value":-10},"mousemove":{"value":0},"modeA":{"value":0},"modeN":{"value":3},"speed":{"value":1,"range":[-500,500],"rangep":[-10,10]},"frequency":{"value":50,"range":[-800,800],"rangep":[-50,50]},"angle":{"value":0.5,"range":[0,3.141592653589793]},"waveFactor":{"value":1.4,"range":[-3,3]},"color":{"value":10212607},"pixelStrength":{"value":3,"range":[-20,100],"rangep":[-20,20]},"quality":{"value":5,"range":[0,10]},"contrast":{"value":1,"range":[-25,25]},"brightness":{"value":1,"range":[-1,25]},"colorExposer":{"value":0.18,"range":[-5,5]},"strength":{"value":0.2,"range":[-40,40],"rangep":[-5,5]},"exposer":{"value":8,"range":[-100,100]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8547057640943163},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":6.45,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.37,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":2.44,"range":[0,10]},"metaball":{"value":0.37,"range":[0,2]},"discard_threshold":{"value":0.59,"range":[0,1]},"antialias_threshold":{"value":0.02,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
      });

      Shery.imageEffect("#card4-image", {
        style: 2 /*OR 5 for different variant */,
        gooey: true,
        config: {
          resolutionXY: { value: 67.31 },
          distortion: { value: true },
          mode: { value: -10 },
          mousemove: { value: 0 },
          modeA: { value: 0 },
          modeN: { value: 3 },
          speed: { value: 3.97, range: [-500, 500], rangep: [-10, 10] },
          frequency: { value: 50, range: [-800, 800], rangep: [-50, 50] },
          angle: { value: 1.55, range: [0, 3.141592653589793] },
          waveFactor: { value: 1, range: [-3, 3] },
          color: { value: 10212607 },
          pixelStrength: { value: -3.08, range: [-20, 100], rangep: [-20, 20] },
          quality: { value: 2.37, range: [0, 10] },
          contrast: { value: 1, range: [-25, 25] },
          brightness: { value: 1, range: [-1, 25] },
          colorExposer: { value: 0.18, range: [-5, 5] },
          strength: { value: 0.2, range: [-40, 40], rangep: [-5, 5] },
          exposer: { value: 21.79, range: [-100, 100] },
          zindex: { value: -9996999, range: [-9999999, 9999999] },
          aspect: { value: 0.8799955197132616 },
          ignoreShapeAspect: { value: true },
          shapePosition: { value: { x: 0, y: 0 } },
          shapeScale: { value: { x: 0.5, y: 0.5 } },
          shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
          shapeRadius: { value: 0, range: [0, 2] },
          currentScroll: { value: 0 },
          scrollLerp: { value: 0.07 },
          gooey: { value: true },
          infiniteGooey: { value: false },
          growSize: { value: 4, range: [1, 15] },
          durationOut: { value: 1, range: [0.1, 5] },
          durationIn: { value: 1.5, range: [0.1, 5] },
          displaceAmount: { value: 0.5 },
          masker: { value: true },
          maskVal: { value: 1.27, range: [1, 5] },
          scrollType: { value: 0 },
          geoVertex: { range: [1, 64], value: 1 },
          noEffectGooey: { value: true },
          onMouse: { value: 1 },
          noise_speed: { value: 0.2, range: [0, 10] },
          metaball: { value: 0.24, range: [0, 2] },
          discard_threshold: { value: 0.52, range: [0, 1] },
          antialias_threshold: { value: 0, range: [0, 0.1] },
          noise_height: { value: 0.5, range: [0, 2] },
          noise_scale: { value: 6.11, range: [0, 100] },
        },
        // config:{"resolutionXY":{"value":100},"distortion":{"value":true},"mode":{"value":-10},"mousemove":{"value":0},"modeA":{"value":0},"modeN":{"value":3},"speed":{"value":1,"range":[-500,500],"rangep":[-10,10]},"frequency":{"value":50,"range":[-800,800],"rangep":[-50,50]},"angle":{"value":0.5,"range":[0,3.141592653589793]},"waveFactor":{"value":1.4,"range":[-3,3]},"color":{"value":10212607},"pixelStrength":{"value":3,"range":[-20,100],"rangep":[-20,20]},"quality":{"value":5,"range":[0,10]},"contrast":{"value":1,"range":[-25,25]},"brightness":{"value":1,"range":[-1,25]},"colorExposer":{"value":0.18,"range":[-5,5]},"strength":{"value":0.2,"range":[-40,40],"rangep":[-5,5]},"exposer":{"value":8,"range":[-100,100]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8547057640943163},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":6.45,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.37,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":2.44,"range":[0,10]},"metaball":{"value":0.37,"range":[0,2]},"discard_threshold":{"value":0.59,"range":[0,1]},"antialias_threshold":{"value":0.02,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
      });

      Shery.imageEffect("#card5-image", {
        style: 2 /*OR 5 for different variant */,
        gooey: true,
        config: {
          resolutionXY: { value: 67.31 },
          distortion: { value: true },
          mode: { value: -10 },
          mousemove: { value: 0 },
          modeA: { value: 0 },
          modeN: { value: 3 },
          speed: { value: 3.97, range: [-500, 500], rangep: [-10, 10] },
          frequency: { value: 50, range: [-800, 800], rangep: [-50, 50] },
          angle: { value: 1.55, range: [0, 3.141592653589793] },
          waveFactor: { value: 1, range: [-3, 3] },
          color: { value: 10212607 },
          pixelStrength: { value: -3.08, range: [-20, 100], rangep: [-20, 20] },
          quality: { value: 2.37, range: [0, 10] },
          contrast: { value: 1, range: [-25, 25] },
          brightness: { value: 1, range: [-1, 25] },
          colorExposer: { value: 0.18, range: [-5, 5] },
          strength: { value: 0.2, range: [-40, 40], rangep: [-5, 5] },
          exposer: { value: 21.79, range: [-100, 100] },
          zindex: { value: -9996999, range: [-9999999, 9999999] },
          aspect: { value: 0.7863235589764209 },
          ignoreShapeAspect: { value: true },
          shapePosition: { value: { x: 0, y: 0 } },
          shapeScale: { value: { x: 0.5, y: 0.5 } },
          shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
          shapeRadius: { value: 0, range: [0, 2] },
          currentScroll: { value: 0 },
          scrollLerp: { value: 0.07 },
          gooey: { value: true },
          infiniteGooey: { value: false },
          growSize: { value: 7.1, range: [1, 15] },
          durationOut: { value: 1, range: [0.1, 5] },
          durationIn: { value: 1.5, range: [0.1, 5] },
          displaceAmount: { value: 0.5 },
          masker: { value: true },
          maskVal: { value: 1.27, range: [1, 5] },
          scrollType: { value: 0 },
          geoVertex: { range: [1, 64], value: 1 },
          noEffectGooey: { value: true },
          onMouse: { value: 1 },
          noise_speed: { value: 0.92, range: [0, 10] },
          metaball: { value: 0.47, range: [0, 2] },
          discard_threshold: { value: 0.46, range: [0, 1] },
          antialias_threshold: { value: 0.01, range: [0, 0.1] },
          noise_height: { value: 0.5, range: [0, 2] },
          noise_scale: { value: 9.16, range: [0, 100] },
        },
        // config:{"resolutionXY":{"value":100},"distortion":{"value":true},"mode":{"value":-10},"mousemove":{"value":0},"modeA":{"value":0},"modeN":{"value":3},"speed":{"value":1,"range":[-500,500],"rangep":[-10,10]},"frequency":{"value":50,"range":[-800,800],"rangep":[-50,50]},"angle":{"value":0.5,"range":[0,3.141592653589793]},"waveFactor":{"value":1.4,"range":[-3,3]},"color":{"value":10212607},"pixelStrength":{"value":3,"range":[-20,100],"rangep":[-20,20]},"quality":{"value":5,"range":[0,10]},"contrast":{"value":1,"range":[-25,25]},"brightness":{"value":1,"range":[-1,25]},"colorExposer":{"value":0.18,"range":[-5,5]},"strength":{"value":0.2,"range":[-40,40],"rangep":[-5,5]},"exposer":{"value":8,"range":[-100,100]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8547057640943163},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":6.45,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.37,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":2.44,"range":[0,10]},"metaball":{"value":0.37,"range":[0,2]},"discard_threshold":{"value":0.59,"range":[0,1]},"antialias_threshold":{"value":0.02,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
      });

      Shery.imageEffect("#card6-image", {
        style: 2 /*OR 5 for different variant */,
        gooey: true,
        config: {
          resolutionXY: { value: 67.31 },
          distortion: { value: true },
          mode: { value: -10 },
          mousemove: { value: 0 },
          modeA: { value: 0 },
          modeN: { value: 3 },
          speed: { value: 3.97, range: [-500, 500], rangep: [-10, 10] },
          frequency: { value: 50, range: [-800, 800], rangep: [-50, 50] },
          angle: { value: 1.55, range: [0, 3.141592653589793] },
          waveFactor: { value: 1, range: [-3, 3] },
          color: { value: 10212607 },
          pixelStrength: { value: -3.08, range: [-20, 100], rangep: [-20, 20] },
          quality: { value: 2.37, range: [0, 10] },
          contrast: { value: 1, range: [-25, 25] },
          brightness: { value: 1, range: [-1, 25] },
          colorExposer: { value: 0.18, range: [-5, 5] },
          strength: { value: 0.2, range: [-40, 40], rangep: [-5, 5] },
          exposer: { value: 21.79, range: [-100, 100] },
          zindex: { value: -9996999, range: [-9999999, 9999999] },
          aspect: { value: 0.7863235589764209 },
          ignoreShapeAspect: { value: true },
          shapePosition: { value: { x: 0, y: 0 } },
          shapeScale: { value: { x: 0.5, y: 0.5 } },
          shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
          shapeRadius: { value: 0, range: [0, 2] },
          currentScroll: { value: 0 },
          scrollLerp: { value: 0.07 },
          gooey: { value: true },
          infiniteGooey: { value: false },
          growSize: { value: 7.1, range: [1, 15] },
          durationOut: { value: 1, range: [0.1, 5] },
          durationIn: { value: 1.5, range: [0.1, 5] },
          displaceAmount: { value: 0.5 },
          masker: { value: true },
          maskVal: { value: 1.27, range: [1, 5] },
          scrollType: { value: 0 },
          geoVertex: { range: [1, 64], value: 1 },
          noEffectGooey: { value: true },
          onMouse: { value: 1 },
          noise_speed: { value: 0.92, range: [0, 10] },
          metaball: { value: 0.47, range: [0, 2] },
          discard_threshold: { value: 0.46, range: [0, 1] },
          antialias_threshold: { value: 0.01, range: [0, 0.1] },
          noise_height: { value: 0.5, range: [0, 2] },
          noise_scale: { value: 9.16, range: [0, 100] },
        },
        // config:{"resolutionXY":{"value":100},"distortion":{"value":true},"mode":{"value":-10},"mousemove":{"value":0},"modeA":{"value":0},"modeN":{"value":3},"speed":{"value":1,"range":[-500,500],"rangep":[-10,10]},"frequency":{"value":50,"range":[-800,800],"rangep":[-50,50]},"angle":{"value":0.5,"range":[0,3.141592653589793]},"waveFactor":{"value":1.4,"range":[-3,3]},"color":{"value":10212607},"pixelStrength":{"value":3,"range":[-20,100],"rangep":[-20,20]},"quality":{"value":5,"range":[0,10]},"contrast":{"value":1,"range":[-25,25]},"brightness":{"value":1,"range":[-1,25]},"colorExposer":{"value":0.18,"range":[-5,5]},"strength":{"value":0.2,"range":[-40,40],"rangep":[-5,5]},"exposer":{"value":8,"range":[-100,100]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8547057640943163},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":6.45,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.37,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":2.44,"range":[0,10]},"metaball":{"value":0.37,"range":[0,2]},"discard_threshold":{"value":0.59,"range":[0,1]},"antialias_threshold":{"value":0.02,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
      });
    }

    AllSheryEffects();
  }

  let page2 = document.querySelector("#page2");
  let video = document.querySelector("#video-container");
  let videocrsr = document.querySelector("#video-crsr");
  video.addEventListener("mouseenter", function () {
    video.addEventListener("mousemove", function (dets) {
      let diff = dets.clientY - page2.getBoundingClientRect().top;
      let diff1 = dets.clientX - video.getBoundingClientRect().left;
      gsap.to("#crsr", {
        opacity: 0,
      });
      gsap.to(videocrsr, {
        y: diff - videocrsr.offsetHeight / 1.25,
        x: diff1 - video.offsetWidth / 1.38 - videocrsr.offsetWidth / 2,
        ease: "expo-out",
      });
    });
  });

  video.addEventListener("mouseleave", function () {
    gsap.to("#crsr", {
      opacity: 1,
    });
    gsap.to(videocrsr, {
      y: "- 0%",
      x: "-80%",
    });
  });

  gsap.from("#page3-part1 h1", {
    y: 150,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page3-part1",
      start: "top 80%",
    },
  });
  gsap.to("#page3-part1 hr", {
    width: "100%",
    duration: 1,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page3-part1",
      start: "top 60%",
    },
  });
  gsap.from("#card1 .effect", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card1",
      start: "top 80%",
    },
  });
  gsap.from("#card2 .effect", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card2",
      start: "top 80%",
    },
  });
  gsap.to("#card2 hr", {
    right: "0%",
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      trigger: "#card2",
      scroller: "#main",
      // markers:true,
      start: "top -20%",
      //   onEnter: () => {
      //     // Animation to play when scrolling into the trigger area
      //     gsap.to("#card2 hr", {
      //       right: '0%',
      //       width: '100%',
      //       duration: 3,
      //     });
      //   },
      //   onLeaveBack: () => {
      //     // Reverse the animation when leaving the trigger area
      //     gsap.to("#card2 hr", {
      //       right: '0%', // Set the initial state when scrolling out
      //       width: '0%', // Set the initial state when scrolling out
      //       duration: 0, // Set the duration to 0 for instant change
      //     });
      // }
    },
  });
  gsap.from("#card3 .effect", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card3",
      start: "top 80%",
    },
  });
  gsap.to("#card3 hr", {
    right: "0%",
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card3",
      start: "top 0%",
    },
  });
  gsap.from("#card4 .effect", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card4",
      start: "top 80%",
    },
  });
  gsap.to("#card4 hr", {
    right: "0%",
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card4",
      start: "top 0%",
    },
  });
  gsap.from("#card5 .effect", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card5",
      start: "top 80%",
    },
  });
  gsap.to("#card5 hr", {
    right: "0%",
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card5",
      start: "top 0%",
    },
  });
  gsap.from("#card6 .effect", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card6",
      start: "top 80%",
    },
  });
  gsap.to("#card6 hr", {
    right: "0%",
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card6",
      start: "top 0%",
    },
  });

  gsap.from("#page4-heading h1", {
    y: 150,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page4-heading",
      start: "top 80%",
    },
  });
  gsap.to("#page4-heading hr", {
    right: "0%",
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page4-heading",
      start: "top 70%",
    },
  });
  gsap.to("#page4-last hr", {
    width: "100%",
    right: "0%",
    duration: 2,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page4-last",
      start: "top 90%",
    },
  });
  gsap.from("#page6", {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#footer0",
      start: "top 80%",
    },
  });

  gsap.to("#footer-1st", {
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#footer-1st",
      start: "top 90%",
    },
  });

  gsap.to("#footer-last", {
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#footer-last",
      start: "top 90%",
    },
  });
  
const menu = document.querySelector('#menu-div')
let isopen = false
let tl = gsap.timeline({paused: true})
tl.to("#full-nav",{
  clipPath:"polygon(0 0,100% 0,100% 100%,0 100%)",
})
tl.from("#full-nav h1",{
  y:100,
  opacity:0,
  stagger:.3,
  duration:1
},'nav')
tl.from("#full-nav h4,#full-nav h5",{
  y:100,
  opacity:0,
  stagger:.3,
  duration:1
},'nav')
menu.addEventListener('click',function(){
  if(!isopen){
    gsap.to("#menu-div svg rect:nth-child(2),#menu-div svg rect:nth-child(4),#menu-div svg rect:nth-child(6),#menu-div svg rect:nth-child(8)",{
      opacity:0
    })
    tl.play()
  } else{
    gsap.to("#menu-div svg rect:nth-child(2),#menu-div svg rect:nth-child(4),#menu-div svg rect:nth-child(6),#menu-div svg rect:nth-child(8)",{
      opacity:1
    })
    tl.reverse(.5)
  }
  isopen = !isopen
  
})
}




function videoplay(){
  let videoContent = document.querySelector("#video-container video");
  videoContent.addEventListener("click", function () {
    if (videoContent.paused) {
      videoContent.play();
      videoContent.style.opacity = "1";
      document.querySelector(
        "#video-crsr"
      ).innerHTML = `<i class="ri-pause-mini-line"></i>`;
      gsap.to(videocrsr, {
        scale: 0.5,
      });
    } else {
      videoContent.pause();
      videoContent.style.opacity = "0";
      document.querySelector(
        "#video-crsr"
      ).innerHTML = `<i class="ri-play-mini-line"></i>`;
      gsap.to(videocrsr, {
        scale: 1,
      });
    }
  });
}
videoplay()

let page1 = document.querySelector("#page1");
document.addEventListener("mousemove", function (dets) {
  let diff3 = dets.clientY - page1.getBoundingClientRect().top;

  gsap.to("#flag", {
    x: dets.x,
    y: diff3,
  });
});
document.querySelectorAll("#hero3 h2").forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    gsap.to("#flag", {
      opacity: 1,
    });
  });
  elem.addEventListener("mouseleave", function () {
    gsap.to("#flag", {
      opacity: 0,
    });
  });
});


var clutter = "";
document
  .querySelector("#footer1 h1")
  .textContent.split("")
  .forEach(function (elem) {
    clutter += `<span>${elem}</span>`;
  });
document.querySelector("#footer1 h1").innerHTML = clutter;

var clutter2 = "";
document
  .querySelector("#footer1 h2")
  .textContent.split("")
  .forEach(function (elem) {
    clutter2 += `<span>${elem}</span>`;
  });
document.querySelector("#footer1 h2").innerHTML = clutter2;

var timeoutId;
var isAnimating = false;

document.querySelector("#footer1").addEventListener("mouseenter", function () {
  if (!isAnimating) {
    isAnimating = true;
    gsap.to("#footer1 h1 span", {
      opacity: 0,
      stagger: 0.05,
      onComplete: function () {
        isAnimating = false;
      },
    });

    gsap.to("#footer1 h2 span", {
      delay: 0.35,
      opacity: 1,
      stagger: 0.1,
    });
  } else {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      isAnimating = false;
      document.querySelector("#footer1").dispatchEvent(new Event("mouseenter"));
    }, 500);
  }
});

document.querySelector("#footer1").addEventListener("mouseleave", function () {
  if (!isAnimating) {
    isAnimating = true;
    gsap.to("#footer1 h1 span", {
      opacity: 1,
      stagger: 0.1,
      delay: 0.35,
      onComplete: function () {
        isAnimating = false;
      },
    });

    gsap.to("#footer1 h2 span", {
      opacity: 0,
      stagger: 0.05,
    });
  } else {
    // If the animation is already running, delay the start of the new animation
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      isAnimating = false;
      document.querySelector("#footer1").dispatchEvent(new Event("mouseleave"));
    }, 500);
  }
});































if (window.innerWidth < 600) {

  
const menu = document.querySelector('#menu-div')
let isopen = false
let tl = gsap.timeline({paused: true})
tl.to("#full-nav",{
  clipPath:"polygon(0 0,100% 0,100% 100%,0 100%)",
})
tl.from("#full-nav h1",{
  y:100,
  opacity:0,
  stagger:.3,
  duration:1
},'nav')

menu.addEventListener('click',function(){
  if(!isopen){
    gsap.to("#menu-div svg rect:nth-child(2),#menu-div svg rect:nth-child(4),#menu-div svg rect:nth-child(6),#menu-div svg rect:nth-child(8)",{
      opacity:0
    })
    tl.play()
  } else{
    gsap.to("#menu-div svg rect:nth-child(2),#menu-div svg rect:nth-child(4),#menu-div svg rect:nth-child(6),#menu-div svg rect:nth-child(8)",{
      opacity:1
    })
    tl.reverse(.5)
  }
  isopen = !isopen
  
})
  gsap.from("#page3-part1 h1", {
    y: 150,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page3-part1",
      start: "top 90%",
    },
  });
  gsap.to("#page3-part1 hr", {
    width: "100%",
    duration: 1,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page3-part1",
      start: "top 80%",
    },
  });
  gsap.from("#card1 .effect", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card1",
      start: "top 80%",
    },
  });
  gsap.from("#card2 .effect", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card2",
      start: "top 80%",
    },
  });
  gsap.to("#card2 hr", {
    right: "0%",
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      trigger: "#card2",
      scroller: "#main",
      // markers:true,
      start: "top 30%",
      //   onEnter: () => {
      //     // Animation to play when scrolling into the trigger area
      //     gsap.to("#card2 hr", {
      //       right: '0%',
      //       width: '100%',
      //       duration: 3,
      //     });
      //   },
      //   onLeaveBack: () => {
      //     // Reverse the animation when leaving the trigger area
      //     gsap.to("#card2 hr", {
      //       right: '0%', // Set the initial state when scrolling out
      //       width: '0%', // Set the initial state when scrolling out
      //       duration: 0, // Set the duration to 0 for instant change
      //     });
      // }
    },
  });
  gsap.from("#card3 .effect", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card3",
      start: "top 80%",
    },
  });
  gsap.to("#card3 hr", {
    right: "0%",
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card3",
      start: "top 30%",
    },
  });
  gsap.from("#card4 .effect", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card4",
      start: "top 80%",
    },
  });
  gsap.to("#card4 hr", {
    right: "0%",
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card4",
      start: "top 30%",
    },
  });
  gsap.from("#card5 .effect", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card5",
      start: "top 80%",
    },
  });
  gsap.to("#card5 hr", {
    right: "0%",
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card5",
      start: "top 30%",
    },
  });
  gsap.from("#card6 .effect", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card6",
      start: "top 80%",
    },
  });
  gsap.to("#card6 hr", {
    right: "0%",
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#card6",
      start: "top 30%",
    },
  });
  
  gsap.from("#page4-heading h1", {
    y: 150,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page4-heading",
      start: "top 80%",
    },
  });
  gsap.to("#page4-heading hr", {
    right: "0%",
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page4-heading",
      start: "top 70%",
    },
  });
  gsap.to("#page4-last hr", {
    width: "100%",
    right: "0%",
    duration: 2,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page4-last",
      start: "top 90%",
    },
  });
  gsap.from("#page6", {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#footer0",
      start: "top 80%",
    },
  });
  
  gsap.to("#footer-1st", {
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#footer-1st",
      start: "top 90%",
    },
  });
  
  gsap.to("#footer-last", {
    width: "100%",
    duration: 1.5,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#footer-last",
      start: "top 120%",
    },
  });


}




