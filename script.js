const sliderContainer = document.querySelector(".slider-container");
const slideRight = document.querySelector(".right-slide");
const slideLeft = document.querySelector(".left-slide");
const upButton = document.querySelector(".up-button");
const downButton = document.querySelector(".down-button");
const items = slideRight.querySelectorAll(".item");
let desc_list = document.querySelectorAll(".item-description");
let isEnabled = true;
let currentItem = 0;

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}
function hideDesc(direction) {
  isEnabled = false;
  desc_list[currentItem].classList.add(direction);
  desc_list[currentItem].addEventListener("animationend", function () {
    this.classList.remove("active", direction);
  });
}
function hideItem(direction) {
  isEnabled = false;

  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener(
    "animationend",
    (hide_handle = function () {
      this.classList.remove("active", direction);
    })
  );
}
function showDesc(direction) {
  desc_list[currentItem].classList.add("next", direction);

  desc_list[currentItem].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}
function showItem(direction) {
  items[currentItem].classList.add("next", direction);

  items[currentItem].addEventListener(
    "animationend",
    (handle = function () {
      this.classList.remove("next", direction);
      this.classList.add("active");
      items[currentItem].removeEventListener("animationend", handle);
      isEnabled = true;
    })
  );
}

function nextItem(n) {
  hideItem("to-down");
  hideDesc("to-up");
  changeCurrentItem(n + 1);
  showItem("from-up");
  showDesc("from-down");
}

function previousItem(n) {
  hideDesc("to-down");
  hideItem("to-up");
  changeCurrentItem(n - 1);
  showItem("from-down");
  showDesc("from-up");
}

upButton.addEventListener("click", function () {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

downButton.addEventListener("click", function () {
  if (isEnabled) {
    nextItem(currentItem);
  }
});
var scrollableElement = document.body;
scrollableElement.addEventListener("wheel", checkScrollDirection);

function checkScrollDirection(event) {
  if (checkScrollDirectionIsUp(event)) {
    if (isEnabled) {
      nextItem(currentItem);
    }
  } else {
    if (isEnabled) {
      previousItem(currentItem);
    }
  }
}

function checkScrollDirectionIsUp(event) {
  if (event.wheelDelta) {
    return event.wheelDelta > 0;
  }
  return event.deltaY < 0;
}
