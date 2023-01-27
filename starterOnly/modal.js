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
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const submit = document.querySelector(".btn-submit");

// launch modal event : lancement de l'event modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form : Fonction pour lancer le formulaire modal
function launchModal() {
  modalbg.style.display = "block";
}

//----fermer la modale
closeBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
});

//-------Ajouter validation ou messages d'erreur

function validate() {
  const validationForm = document.querySelector(".validationForm");
  if (validationForm) {
    // DOM Elements
    const firstElem = document.getElementById("first");
    const lastElem = document.getElementById("last");
    const emailElem = document.getElementById("email");
    const birthdateElem = document.getElementById("birthdate");
    const quantityElem = document.getElementById("quantity");
    const checkBoxElem = document.querySelectorAll(".required");

    //console.log(checkBoxElem);

    const createError = (elem, errorMessage) => {
      //span element
      const errorSpan = document.createElement("span");
      //ajouter class pour error
      errorSpan.classList.add("error");
      //aria-live 属性を設定
      errorSpan.setAttribute("data-error-visible", "true");
      //message error
      errorSpan.textContent = errorMessage;
      //add elem
      elem.parentNode.appendChild(errorSpan);
    };

    validationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      //Récupérer tous les éléments qui affichent des erreurs et les supprimer
      const errorElems = validationForm.querySelectorAll(".error ");
      errorElems.forEach((elem) => {
        elem.remove();
      });

      //---------Validation name---------
      const firstValue = firstElem.value.trim();
      if (firstElem.value === "" || firstValue.length <= 2) {
        createError(
          firstElem,
          "Veuillez entrer 2 caractères ou plus pour le champ du Prénom."
        );
        firstElem.classList.add("inputError");
      } else {
        firstElem.classList.remove("inputError");
      }

      const lastValue = lastElem.value.trim();
      if (lastElem.value === "" || lastValue.length <= 2) {
        createError(
          lastElem,
          "Veuillez entrer 2 caractères ou plus pour le champ du Nom."
        );
        lastElem.classList.add("inputError");
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
      } else {
        emailElem.classList.remove("inputError");
      }

      //---------Validation date de naissance---------
      if (birthdateElem.value === "") {
        createError(birthdateElem, "Veuillez entrer une date de naissance.");
        birthdateElem.classList.add("inputError");
      } else {
        birthdateElem.classList.remove("inputError");
      }
      const patternNumber = /^[0-9]+$/;
      if (
        quantityElem.value === "" ||
        !patternNumber.test(quantityElem.value)
      ) {
        createError(quantityElem, "Veuillez entrer un chiffre.");
        quantityElem.classList.add("inputError");
      } else {
        quantityElem.classList.remove("inputError");
      }

      //---------Validation checkBox-----------
      checkBoxElem.forEach((elem) => {
        if (elem.getAttribute("type") === "radio") {
          console.log(checkBoxElem);
          const checked = elem.parentElement.querySelector(
            'input[type="radio"]:checked'
          );
          console.log(checked);
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
          }
        }
      });
      // let checkCount = 0;
      // for (let i = 0; i < checkBoxElem.length; i++) {
      //   if (checkBoxElem[i].checked === true) {
      //     checkCount++;
      //   }
      // }
      // if (checkCount === 0) {
      //   createError(checkBoxElem, "Veuillez sélectionner un choix.");
      // }
    });
  }
}

const validForm = document.querySelector(".validationForm");
validForm.addEventListener("click", validate);
