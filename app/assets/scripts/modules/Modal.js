import $ from 'jquery'; /* we imported jquery($) to use its selectors */

class Modal {
  constructor() {
    /* this selects the elements that we are going to target with this function */
    this.openModalButton = $(".open-modal");
    this.modal = $(".modal");
    this.closeModalButton = $(".modal__close");
    this.events(); /* this enables the page to start listening for the events as soon as the page loads */
  }

  /* method to handle all our events */
  events() {
    /* the following are comments for the events we want to keep an eye out for */
    // clicking the open modal button
    /* selects the dom element */
    /* then tack on the jquery click method */
    /* between the () what do we want to happen when the button is clicked - we want to run our openModal method */
    this.openModalButton.click(this.openModal.bind(this));
    /* .bind(this) binds the this keyword so that we can target the correct elemets in our events methods */

    // clicking the x close modal button
    this.closeModalButton.click(this.closeModal.bind(this));

    // pushes any key on the keyboard
    /* document selects the whole page */
    /* keyup looks for when a user releases any key */
    $(document).keyup(this.keyPressHandler.bind(this));
  }

  /* method for when user presses a key */
  /* the 'e' is a paramater */
  keyPressHandler(e) {
    if (e.keyCode == 27) { /* 27 is the Esc key's keycode */
      this.closeModal();
    }
  }

  /* we know that we will need a method to open the modal */
  openModal() {
    /* target the modal div with this.modal */
    this.modal.addClass("modal--is-visible");
    return false; /* this will prevent the default behaviour of scrolling up when a link with # sign is clicked */
  }

  /* another method to close the modal */
  closeModal() {
    this.modal.removeClass("modal--is-visible");
  }
}

export default Modal;
