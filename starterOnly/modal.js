function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalbody = document.querySelector(".modal-body");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submit = document.querySelector(".btn-submit");
const firstElem = document.getElementById("first");
const lastElem = document.getElementById("last");
const emailElem = document.getElementById("email");
const birthdateElem = document.getElementById("birthdate");
const quantityElem = document.getElementById("quantity");
const checkBoxElem = document.querySelectorAll(".required");
const validationForm = document.querySelector(".validationForm");

// launch modal event : lancement de l'event modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form : Fonction pour lancer le formulaire modal
function launchModal() {
  modalbg.style.display = "block";
}

//----fermer la modale avec close
closeBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
});

//-------Ajouter validation ou messages d'erreur

function validate() {
  //fonction pour afficher les erreurs
  const createError = (elem, errorMessage) => {
    //span element
    const errorSpan = document.createElement("span");
    //ajouter une class
    errorSpan.classList.add("error");
    //message erreurs
    errorSpan.textContent = errorMessage;
    // ajouter à l'élément parent
    elem.parentNode.appendChild(errorSpan);
  };

  validationForm.addEventListener("submit", (e) => {
    //Récupérer tous les éléments qui affichent des erreurs et les supprimer après chaque soumission
    const errorElems = validationForm.querySelectorAll(".error ");
    errorElems.forEach((elem) => {
      elem.remove();
    });

    //---------Validation name---------
    const firstValue = firstElem.value.trim();
    if (firstValue.length <= 2) {
      createError(
        firstElem,
        "Veuillez entrer 2 caractères ou plus pour le champ du Prénom."
      );
      firstElem.classList.add("inputError");
      e.preventDefault();
    } else {
      firstElem.classList.remove("inputError");
    }

    const lastValue = lastElem.value.trim();
    if (lastValue.length <= 2) {
      createError(
        lastElem,
        "Veuillez entrer 2 caractères ou plus pour le champ du Nom."
      );
      lastElem.classList.add("inputError");
      e.preventDefault();
    } else {
      lastElem.classList.remove("inputError");
    }
    //---------Validation email---------
    const pattern =
      /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;
    //test() affichez une erreur et arrêtez de soumettre le formulaire
    if (emailElem.value === "" || !pattern.test(emailElem.value)) {
      createError(emailElem, "Veuillez entrer une adresse mail valide.");
      emailElem.classList.add("inputError");
      e.preventDefault();
    } else {
      emailElem.classList.remove("inputError");
    }

    //---------Validation date de naissance---------
    if (birthdateElem.value === "") {
      createError(birthdateElem, "Veuillez entrer une date de naissance.");
      birthdateElem.classList.add("inputError");
      e.preventDefault();
    } else {
      birthdateElem.classList.remove("inputError");
    }
    const patternNumber = /^[0-9]+$/;
    if (quantityElem.value === "" || !patternNumber.test(quantityElem.value)) {
      createError(quantityElem, "Veuillez entrer un chiffre.");
      quantityElem.classList.add("inputError");
      e.preventDefault();
    } else {
      quantityElem.classList.remove("inputError");
    }

    //---------Validation checkBox-----------
    checkBoxElem.forEach((elem) => {
      if (elem.getAttribute("type") === "radio") {
        // Récupère le premier élément de case à cocher sélectionné en fonction de l'élément parent
        const checked = elem.parentElement.querySelector(
          'input[type="radio"]:checked'
        );
        //console.log(elem.parentElement);
        if (checked === null) {
          createError(elem, "Veuillez sélectionner un choix.");
          e.preventDefault();
        }
      } else if (elem.getAttribute("id") === "checkbox1") {
        const checkedBox2 = elem.parentElement.querySelector(
          'input[id="checkbox1"]:checked'
        );
        if (checkedBox2 === null) {
          createError(
            elem,
            "Vous devez vérifier que vous acceptez les termes et conditions."
          );
          e.preventDefault();
        }
      }
    });

    //---------modal confirmation-----------

    //créer l'event modal confirmation
    const modalContent = document.querySelector(".content");
    const modalConfirmation = document.createElement("div");
    modalConfirmation.classList.add("confirmation");
    const confirmationP = document.createElement("p");
    confirmationP.classList.add("confirmationP");
    confirmationP.innerHTML = "Merci pour <br> votre inscription";
    const confirmationButton = document.createElement("button");
    confirmationButton.classList.add(
      "confirmationButton",
      "button",
      "btn-submit"
    );
    confirmationButton.textContent = "Fermer";

    modalContent.appendChild(modalConfirmation);
    modalConfirmation.appendChild(confirmationP);
    modalConfirmation.appendChild(confirmationButton);

    //Verifier　si tous les formulaires sont remplis
    const isRequired = validationForm.checkValidity();
    if (isRequired === false) {
      modalbody.style.display = "block";
      modalConfirmation.style.display = "none";
      //modalConfirmation.remove("div", "p");
      e.preventDefault();
      e.stopImmediatePropagation();
    } else {
      modalbody.style.display = "none";
      modalConfirmation.style.display = "block";
      //s'il n'y a pas modalConfirmation ne s'affiche pas
      e.preventDefault();
      e.stopImmediatePropagation();
    }

    //event pour fermer modal confirmation
    //confirmationButton.
    modalConfirmation.addEventListener("click", (e) => {
      modalbg.style.display = "none";
      modalConfirmation.style.display = "none";
      modalbody.style.display = "block";
      validationForm.reset();
      e.preventDefault();
      e.stopImmediatePropagation();
    });
  });
}

validationForm.addEventListener("click", validate);
