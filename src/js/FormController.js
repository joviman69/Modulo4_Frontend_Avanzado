export class FormController {
  constructor(selector, commentsService, pubSub) {
    this.commentsService = commentsService;
    this.pubSub = pubSub;
    this.element = document.querySelector(selector);
    if (this.element != null) this.Listeners();
    // this.element.querySelector("button").disabled = true;
  }

  Listeners() {
    this.addInputListener();
    this.addFormSubmitListener();
  }

  addFormSubmitListener() {
    this.element.addEventListener("submit", event => {
      event.preventDefault();

      let comment = this.buildCommentData();
      this.commentsService
        .save(comment)
        .then(createdComment => {
          this.element.reset();
          this.pubSub.publish("comment:created", createdComment);
          this.sendNotification(
            "Comentario recibido con éxito",
            "Gracias por participar"
          );
        })
        .catch(error => {
          alert(`Se ha producido un error enviando el comentario:  ${error}`);
        })
        .finally(() => {
          this.element.querySelector("button").disabled = true;
        });
    });
  }

  buildCommentData() {
    return {
      author: this.element.querySelector("#nombre").value,
      email: this.element.querySelector("#email").value,
      comment: this.element.querySelector("textarea").value
    };
  }

  addInputListener() {
    this.element.querySelectorAll("input").forEach(input => {
      input.addEventListener("blur", event => {
        if (input.checkValidity() == false) {
          input.classList.add("is-invalid");
          input.classList.remove("is-valid");
        } else {
          input.classList.remove("is-invalid");
          input.classList.add("is-valid");
        }
        this.checkFormValidity();
      });
    });

    let textArea = this.element.querySelector("textarea");

    textArea.addEventListener("blur", event => {
      if (this.TextAreaWordsCounter()) {
        textArea.classList.add("is-valid");
        textArea.classList.remove("is-invalid");
      } else {
        textArea.classList.add("is-invalid");
        textArea.classList.remove("is-valid");
      }
      this.checkFormValidity();
    });
  }

  checkFormValidity() {
    const formInputs = this.element.querySelectorAll("input");
    this.element.querySelector("button").disabled = false;
    for (let formInput of formInputs) {
      if (
        formInput.checkValidity() == false ||
        !this.TextAreaWordsCounter()
      ) {
        this.element.querySelector("button").disabled = true;
      } 
      // else {
        
      // }
    }

    // if (!this.TextAreaWordsCounter()) {
    //   console.log("true");
    //   this.element.querySelector("button").disabled = true;
    // } else {
    //   console.log("false");
    //   this.element.querySelector("button").disabled = false;
    // }
  }

  sendNotification(title, body) {
    var notification = Notification || mozNotification || webkitNotification;

    if (body) {
      var options = {
        body: body
      };
    }

    if (typeof notification === "undefined") {
      console.warn("Web notification not supported");
    } else {
      notification.requestPermission(function(permission) {
        //console.log(Notification.permission);
        if (Notification.permission === "granted") {
          new Notification(title, options);
        }
      });
    }
  }

  TextAreaWordsCounter() {
    let textArea = this.element.querySelector("textarea");
    console.log("entrando en wordcount");
    var s = textArea.value;
    s = s.replace(/(^\s*)|(\s*$)/gi, ""); //eliminamos espacios iniciales y finales
    s = s.replace(/[ ]{2,}/gi, " "); //eliminamos huecos de mas de 2 espacios
    s = s.replace(/\n /, "\n"); // eliminamos lineas vacias con espacios
    s = s.split(" ").length; // contamos elementos del array de split(' ')
    return textArea.value.length > 0 && s <= 120;
  }
}
