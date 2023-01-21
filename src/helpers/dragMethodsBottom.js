import { closeModal } from "jenesius-vue-modal";

const modalHeight = window.innerHeight * 0.55;

const dragStop = (e) => {
  const popup =
    e.target.closest(".selection-mobile") ||
    e.target.querySelector(".selection-mobile");
  if (
    window.innerHeight - e.y >= modalHeight / 2 ||
    window.innerHeight - e.changedTouches?.[0].clientY >= modalHeight / 2
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
    e.target.closest(".selection-mobile") ||
    e.target.querySelector(".selection-mobile");
  if (popup) {
    if (
      window.innerHeight - e.y <= modalHeight - 57 ||
      window.innerHeight - e.changedTouches?.[0].clientY <= modalHeight - 57
    ) {
      popup.style.height =
        window.innerHeight - (e.y || e.changedTouches[0].clientY) + 20 + "px";
    } else popup.style.height = modalHeight + "px";
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
