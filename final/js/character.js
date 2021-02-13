class Character {
  constructor(info) {
    this.left = info.xPos;
    this.speed = info.speed;
    this.elem = document.createElement("div");
    this.elem.classList.add("character");
    this.elem.innerHTML = `<div class="character-face-con character-head">
      <div class="character-face character-head-face face-front"></div>
      <div class="character-face character-head-face face-back"></div>
  </div>
  <div class="character-face-con character-torso">
      <div class="character-face character-torso-face face-front"></div>
      <div class="character-face character-torso-face face-back"></div>
  </div>
  <div class="character-face-con character-arm character-arm-right">
      <div class="character-face character-arm-face face-front"></div>
      <div class="character-face character-arm-face face-back"></div>
  </div>
  <div class="character-face-con character-arm character-arm-left">
      <div class="character-face character-arm-face face-front"></div>
      <div class="character-face character-arm-face face-back"></div>
  </div>
  <div class="character-face-con character-leg character-leg-right">
      <div class="character-face character-leg-face face-front"></div>
      <div class="character-face character-leg-face face-back"></div>
  </div>
  <div class="character-face-con character-leg character-leg-left">
      <div class="character-face character-leg-face face-front"></div>
      <div class="character-face character-leg-face face-back"></div>
  </div>`;
    document.querySelector(".stage").appendChild(this.elem);
    this.elem.style.left = this.left + "%";

    // 스크롤 중인지 아닌지
    this.scrollState = false;
    // 바로 이전 스크롤 위치
    this.lastScrollTop = 0;
    this.xPos = info.xPos;
    this.speed = info.speed;
    this.direction;
    // 좌우 이동 중인지 아닌지
    this.runningState = false;
    this.rafId;
    this.init();
  }

  init() {
    const self = this;

    window.addEventListener("scroll", function () {
      clearTimeout(self.scrollState);

      /* 여러개의 클래스가 중첩해서 붙게 되면 애니메이션이 버벅걸이듯이 들어갈 수 있음 */
      if (!self.scrollState) {
        self.elem.classList.add("running");
      }

      self.scrollState = setTimeout(function () {
        self.scrollState = false;
        self.elem.classList.remove("running");
      }, 500);

      //scroll down
      if (self.lastScrollTop < pageYOffset) {
        self.direction = "backward";
        self.elem.setAttribute("data-direction", self.direction);
      } else {
        //scroll up
        self.direction = "forward";
        self.elem.setAttribute("data-direction", self.direction);
      }

      self.lastScrollTop = pageYOffset;
    });

    window.addEventListener("keydown", function (e) {
      if (self.runningState === true) return;

      if (e.key === "ArrowLeft") {
        self.direction = "left";
        self.elem.setAttribute("data-direction", self.direction);
      } else if (e.key === "ArrowRight") {
        self.direction = "right";
        self.elem.setAttribute("data-direction", self.direction);
      }
      self.runningState = true;
      self.run(self);
      self.elem.classList.add("running");
    });

    window.addEventListener("keyup", function () {
      if (self.runningState) {
        self.runningState = false;
        self.elem.classList.remove("running");
        /* animation frame cancel 안해주면 점점 캐릭터 이동속도 빨라짐.. */
        cancelAnimationFrame(self.rafId);
      }
    });
  }

  run(self) {
    if (self.direction === "left") {
      self.xPos -= self.speed;
    } else if (self.direction === "right") {
      self.xPos += self.speed;
    }

    /* minimum, maximum value of xPos */
    if (self.xPos < 2) {
      self.xPos = 2;
    } else if (self.xPos > 88) {
      self.xPos = 88;
    }

    self.elem.style.left = self.xPos + "%";

    self.rafId = requestAnimationFrame(function () {
      self.run(self);
    });
  }
}
