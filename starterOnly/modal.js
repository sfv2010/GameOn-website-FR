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

// launch modal form
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
function launchModal() {
    modalbg.style.display = "block";
}

//close the modal
closeBtn.addEventListener("click", () => {
    modalbg.style.display = "none";
});

//-------Function validation

function validate(e) {
    e.preventDefault(); //not to send data before validation
    //function to display error messages
    const createError = (elem, errorMessage) => {
        //create span element
        const errorSpan = document.createElement("span");
        //add class
        errorSpan.classList.add("error");
        //add error message
        errorSpan.textContent = errorMessage;
        //append to parent element
        elem.parentNode.appendChild(errorSpan);
    };

    // Collect all items that display errors and delete them after each submission
    const errorElems = validationForm.querySelectorAll(".error ");
    errorElems.forEach((elem) => {
        elem.remove();
    });

    //---------name validation---------
    const firstValue = firstElem.value.trim();
    if (firstValue.length < 2) {
        createError(
            firstElem,
            "Veuillez entrer 2 caractères ou plus pour le champ du Prénom."
        );
        firstElem.classList.add("inputError");
    } else {
        firstElem.classList.remove("inputError");
    }

    const lastValue = lastElem.value.trim();
    if (lastValue.length < 2) {
        createError(
            lastElem,
            "Veuillez entrer 2 caractères ou plus pour le champ du Nom."
        );
        lastElem.classList.add("inputError");
    } else {
        lastElem.classList.remove("inputError");
    }
    //---------email validation---------
    const pattern =
        /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/; //test() display an error
    if (emailElem.value === "" || !pattern.test(emailElem.value)) {
        createError(emailElem, "Veuillez entrer une adresse mail valide.");
        emailElem.classList.add("inputError");
    } else {
        emailElem.classList.remove("inputError");
    }

    //---------Date of Birth validation---------
    if (birthdateElem.value === "") {
        createError(birthdateElem, "Veuillez entrer une date de naissance.");
        birthdateElem.classList.add("inputError");
    } else {
        birthdateElem.classList.remove("inputError");
    }
    const patternNumber = /^[0-9]+$/;
    if (quantityElem.value === "" || !patternNumber.test(quantityElem.value)) {
        createError(quantityElem, "Veuillez entrer un chiffre.");
        quantityElem.classList.add("inputError");
    } else {
        quantityElem.classList.remove("inputError");
    }

    //---------checkbox validation-----------
    checkBoxElem.forEach((elem) => {
        if (elem.getAttribute("type") === "radio") {
            // Gets the first selected checkbox element based on the parent element
            const checked = elem.parentElement.querySelector(
                'input[type="radio"]:checked'
            );
            if (checked === null) {
                createError(elem, "Veuillez sélectionner un choix.");
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

    //---------confirmation modal-----------
    //create a confirmation modal
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

    const isRequired = validationForm.checkValidity();
    //Check if all forms are completed without error
    if (isRequired === false) {
        modalbody.style.display = "block";
        modalConfirmation.style.display = "none";
    } else {
        modalbody.style.display = "none";
        modalConfirmation.style.display = "block";
        //Event to close modal confirmation with closebtn
        closeBtn.addEventListener("click", () => {
            if (modalConfirmation.style.display === "block") {
                modalConfirmation.style.display = "none";
                modalbody.style.display = "block";
                validationForm.reset();
            }
        });
    }

    //Event to close confirmation modal
    confirmationButton.addEventListener("click", () => {
        modalbg.style.display = "none";
        modalConfirmation.style.display = "none";
        modalbody.style.display = "block";
        validationForm.reset();
    });
}

validationForm.addEventListener("submit", validate);
