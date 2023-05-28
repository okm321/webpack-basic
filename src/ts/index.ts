import "@/scss/style.scss";
import { Accordion } from "@/ts/classes/Accordion";

const accordion = new Accordion({
  elementId: "js-accordion",
  contentId: "js-accordion-content",
  initialState: false,
});

const toggleAction = document.getElementById("toggleButton");

if (toggleAction) {
  toggleAction.addEventListener("click", () => {
    accordion.toggle();
  });
}
