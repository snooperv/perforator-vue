import { closeModal } from "jenesius-vue-modal";

const modalHeight = 250;

const dragStop = (e) => {
  const popup =
    e.target.closest(".popup-mobile") ||
    e.target.querySelector(".popup-mobile");
  if (
    e.y >= modalHeight / 2 + 57 ||
    e.changedTouches?.[0].clientY >= modalHeight / 2 + 57
  ) {
    popup.style.height = modalHeight + "px";
  } else {
    closeModal();
  }
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", dragStop);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("touchend", dragStop);
};

const drag = (e) => {
  const popup =
    e.target.closest(".popup-mobile") ||
    e.target.querySelector(".popup-mobile");
  if (popup) {
    if (
      e.y <= modalHeight + 57 ||
      e.changedTouches?.[0].clientY <= modalHeight + 57
    )
      popup.style.height = (e.y || e.changedTouches[0].clientY) - 57 + "px";
    else popup.style.height = modalHeight + "px";
  }
};

const dragStart = (e) => {
  if (e.type === "mousedown") {
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragStop);
  }
  if (e.type === "touchstart") {
    document.addEventListener("touchmove", drag);
    document.addEventListener("touchend", dragStop);
  }
};

export { dragStart };
