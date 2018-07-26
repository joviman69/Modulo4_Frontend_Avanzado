var form = document.getElementById("commentForm");
var nombreInput = document.getElementById("nombre");
var emailInput = document.getElementById("email");
var commentInput = document.getElementById("comment");
var submitButton = document.getElementById("enviar");

// this.form.addEventListener("change", cuentaPalabras);
console.log("Form loaded");

form.addEventListener("submit", function(event) {
  if (this.nombreInput.checkValidity() === false) {
    alert("Por favor escriba un nombre válido");
    this.nombreInput.focus();
    event.preventDefault();
    return false;
  }

  var regex = /[A-Za-z0-9\.\+]+@[A-Za-z0-9]+\.[A-Za-z0-9\.]+/;
  var resultEmailValidation = regex.test(this.emailInput.value);

  if (resultEmailValidation === false) {
    alert("Por favor escriba un email válido");
    this.emailInput.focus();
    event.preventDefault();
    return false;
  }

  var cuentaPalabras = function() {
    var s = this.commentInput.value;
    s = s.replace(/(^\s*)|(\s*$)/gi, ""); //eliminamos espacios iniciales y finales
    s = s.replace(/[ ]{2,}/gi, " "); //eliminamos huecos de mas de 2 espacios
    s = s.replace(/\n /, "\n"); // eliminamos lineas vacias con espacios
    s = s.split(" ").length; // contamos elementos del array de split(' ')
    return s;
  };

  if (cuentaPalabras > 120 || cuentaPalabras < 1) {
    alert("Por favor, introduzca un comentario que no exceda las 120 palabras");
    this.commentInput.focus();
    event.preventDefault();
    return false;
  }

  this.submitButton.setAttribute("disabled", "");
  event.preventDefault();

  setTimeout(function() {
    this.form.reset();
    sendNotification("Formulario recibido", "Gracias por participar");
    this.submitButton.removeAttribute("disabled");
  }, 1000);
});
