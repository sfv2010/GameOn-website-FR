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
// const closeModalBtn = () => {
//   modalbg.style.display = "none";
// };
// closeBtn.addEventListener("click", closeModalBtn);

//-------Ajouter validation ou messages d'erreur
const firstElem = document.getElementById("first");

function validate() {
  if (firstElem.value === "") {
    alert("Merci de remplir tous les champs.");
    return false;
  } else {
    return true;
  }
}

const validationForm = document.querySelector(".validationForm");
if (validationForm) {
  const errorClassName = "error";

  const textControlElems = document.querySelectorAll(".text-control");
  const firstElem = document.getElementById("first");
  const lastElem = document.getElementById("last");
  const emailElem = document.getElementById("email");
  const birthdateElem = document.getElementById("birthdate");
  const quantityElem = document.getElementById("quantity");
  const selectElem = document.getElementById("select");

  console.log(selectElem);

  const createError = (elem, errorMessage) => {
    //span element
    const errorSpan = document.createElement("span");
    //ajouter class pour error
    errorSpan.classList.add(errorClassName);
    //message error
    errorSpan.textContent = errorMessage;
    //add elem
    elem.parentNode.appendChild(errorSpan);
  };

  validationForm.addEventListener("submit", (e) => {
    //
    const errorElems = validationForm.querySelectorAll("." + errorClassName);
    errorElems.forEach((elem) => {
      elem.remove();
    });

    //Validation de .textControlElems
    // textControlElems.forEach((elem) => {
    //   //Supprimer les espaces avant et après la valeur
    //   const elemValue = elem.value.trim();
    //   //Afficher l'erreur et abandonner la soumission du formulaire
    //   if (elemValue.length === 0) {
    //     createError(elem, "Merci de remplir tous les champs.");
    //     e.preventDefault();
    //   }
    // });

    if (firstElem.value === "" || firstElem.value.length <= 2) {
      createError(
        firstElem,
        "Veuillez entrer 2 caractères ou plus pour le champ du Prénom."
      );
    }
    if (lastElem.value === "" || lastElem.value.length <= 2) {
      createError(
        lastElem,
        "Veuillez entrer 2 caractères ou plus pour le champ du Nom."
      );
    }
    //Validation email
    const pattern =
      /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/iu;
    //test() affichez une erreur et arrêtez de soumettre le formulaire
    if (emailElem.value === "" || !pattern.test(emailElem.value)) {
      createError(emailElem, "Veuillez entrer une adresse mail valide.");

      //Validation date de naissance
      if (birthdateElem.value === "") {
        createError(birthdateElem, "Veuillez entrer une date de naissance.");
      }

      if (quantityElem.value === "") {
        createError(quantityElem, "Veuillez entrer un chiffre.");
      }

      // if (selectElem.value === "") {
      //   createError(selectElem, "Veuillez sélectionner un choix.");
      // }

      e.preventDefault();
    }
  });
}

// submit.addEventListener(
//   "click",
//   (e) => {
//     e.preventDefault();
//     const first = document.getElementsByName("first");
//     console.log(first[0].value);
//   },
//   false
// );
