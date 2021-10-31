"use strict";
const keypadNums = document.querySelectorAll("button");
const displayScrn = document.querySelector("input");
let busy = true;
let holdKey;
let isBusy;
let keyChange = -1;
let currKey = null;

// When a Key is Held
const holdFunc = function (number) {
  displayScrn.value = displayScrn.value.slice(0, -1) + number;
};

// When a Key Hold is Released
const releaseFunc = function () {
  keyChange = -1;
  busy = false;
  currKey = null;
};

// Key Pressed
const keyPress = function (e) {
  // Getting Attribute
  const text = this.getAttribute("data-keys").split("");
  busy = true;
  clearTimeout(isBusy);

  // Check if the pressed key is same as current key
  if (currKey !== e.target) {
    busy = false;
  }

  // Check Which Key is Pressed
  if (keyChange >= text.length - 1 || currKey !== e.target) {
    keyChange = 0;
    currKey = e.target;
  } else {
    keyChange++;
  }

  holdKey = setTimeout(holdFunc, 1000, text[text.length - 1]);

  displayScrn.value = busy
    ? displayScrn.value.slice(0, -1) + text[keyChange]
    : displayScrn.value + text[keyChange];
};

// Key Released
const keyRelease = function (e) {
  clearTimeout(holdKey);
  busy = true;
  isBusy = setTimeout(releaseFunc, 1000);
};

// Looping Through Keys
keypadNums.forEach((key) => {
  key.addEventListener("mousedown", keyPress);
  key.addEventListener("mouseup", keyRelease);
});
