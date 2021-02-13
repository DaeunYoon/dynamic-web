(function () {
  const stageElem = document.querySelector(".stage");
  const houseElem = document.querySelector(".house");
  const progElem = document.querySelector(".progress-bar");
  let maxScrollVal = 0;
  let mousePos = { x: 0, y: 0 };

  function resizeHandler() {
    maxScrollVal = document.body.offsetHeight - window.innerHeight;
    scrollHandler();
  }

  function scrollHandler() {
    let curScroll = window.pageYOffset / maxScrollVal;
    let moveZ = curScroll * 890 - 450;
    houseElem.style.transform = "translateZ(" + moveZ + "vw)";
    progElem.style.width = curScroll * 100 + "vw";
  }

  window.addEventListener("scroll", scrollHandler);
  window.addEventListener("resize", resizeHandler);
  window.addEventListener("mousemove", function (e) {
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    stageElem.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${
      mousePos.x * 5
    }deg)`;
  });

  resizeHandler();
})();