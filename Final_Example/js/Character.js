class Character {
  constructor(info) {
    this.mainElem = document.createElement("div");
    this.mainElem.classList.add("character");
    this.mainElem.style.left = info.xPos + "%";
    this.mainElem.innerHTML = `
      <div class="character-face-con character-head">
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
    document.querySelector(".stage").appendChild(this.mainElem);

    // is the screen scrolling or not
    this.scrollState = false;

    /* 바로 이전 스크롤 위치 */
    this.lastScrollTop = 0;

    this.xPos = info.xPos;
    this.speed = info.speed;
    this.direction;

    // 좌우 이동중인지 아닌지 확인하는 변수
    this.runningState = false;

    // requestAnimationFrameId
    this.rafId;
    this.init();
  }

  init() {
    const self = this;

    // 이벤트 핸들러안에서 this는 이벤트 핸들러를 호출한 object가 되기 때문에 this를 미리 self 또는 that과 같은 상수를 별도로 정의해서 저장한 후 사용한다.
    window.addEventListener("scroll", function (e) {
      //timeOut 을 이용하는 이유 -> 쓸데없이 많이 클래스를 붙이는 일을 방지하고 스크롤 하지 않을 때, 효율적으로 클래스를 제거하기 위해서 (코드 효율적으로 실행하기 위해서!)
      /* 자주 사용되는 패턴! 익혀두기 */
      clearTimeout(self.scrollState);

      if (!self.scrollState) {
        self.mainElem.classList.add("running");
      }

      self.scrollState = setTimeout(function () {
        self.scrollState = false;
        self.mainElem.classList.remove("running");
      }, 500);

      if (self.lastScrollTop > pageYOffset) {
        /* scroll up */
        self.mainElem.setAttribute("data-direction", "backward");
      } else {
        /* scroll down */
        self.mainElem.setAttribute("data-direction", "forward");
      }

      self.lastScrollTop = pageYOffset;
    });

    window.addEventListener("keydown", function (e) {
      if (self.runningState) return;

      if (e.key === "ArrowLeft") {
        self.mainElem.setAttribute("data-direction", "left");
        self.direction = "left";
      } else if (e.key === "ArrowRight") {
        self.mainElem.setAttribute("data-direction", "right");
        self.direction = "right";
      }

      self.runningState = true;
      self.run(self);
      //   self.run();
      self.mainElem.style.left = self.mainElem.classList.add("running");
    });

    window.addEventListener("keyup", function (e) {
      if (self.mainElem.classList.contains("running")) {
        self.mainElem.classList.remove("running");
        self.runningState = false;
        cancelAnimationFrame(self.rafId);
      }
    });
  }

  run(self) {
    if (self.direction == "left") {
      self.xPos -= self.speed;
    } else if (self.direction == "right") {
      self.xPos += self.speed;
    }

    if (self.xPos < 2) {
      self.xPos = 2;
    }
    if (self.xPos > 88) {
      self.xPos = 88;
    }

    self.mainElem.style.left = self.xPos + "%";

    self.rafId = requestAnimationFrame(function () {
      self.run(self);
    });
  }

  //   run() {
  //     const self = this;
  //     if (self.direction == "left") {
  //       self.xPost -= self.speed;
  //     } else if (self.direction == "right") {
  //       self.xPos += self.speed;
  //     }

  //     self.mainElem.style.left = self.xPos + "%";

  //     let timeId = requestAnimationFrame(self.run.bind(self));
  //   }
}
