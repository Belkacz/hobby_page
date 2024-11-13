const errorMsgCss = "color: red; var(--color-error); padding: 10px 0px 10px 0px";

// prosty skrypt przekierowujący dzięki niemu możemy przejść do linków dzięki przyciskom na które klikniemy a nie stylizowanym kotwicą w divie
function redirectTo(url) {
    window.open(url, "_blank")
}

// funkcja która wycina nam pcozatek adresu do ostatniego znaku '/' a następnie dodaje nowy endpoint
function redirectToSubPage(destination, event) {
    event.preventDefault()
    const path = window.location.pathname;
    if (destination == '' || destination == null || destination == undefined) {
        window.location.href = path
    } else {
        window.location.href = path + '#' + destination;
    }

    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('absolute')
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function showMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
}

function toggleMobileMenuVisibility() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (window.innerWidth >= 1024) {
        if (!mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
        }
    }
}

async function sendContact(data, form) {
    try {
        const response = await fetch("http://localhost:3000/save-contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Formularz został wysłany pomyślnie.");
            form.reset();
        } else {
            alert("Wystąpił błąd podczas wysyłania formularza.");
        }
    } catch (error) {
        console.error("Błąd:", error);
        alert("Wystąpił problem z połączeniem z serwerem.");
    }
}

function initiateContactForm() {

    const validationMsg = document.getElementById("validation-msg");
    const name = document.getElementById("input_name");
    const eMail = document.getElementById("input_email");
    const largeInput = document.getElementById("large-input")
    const submitBtn = document.getElementById("submit-btn")


    const errorNameMsg = document.createElement("p");
    const errorEmailMsg = document.createElement("p");
    const errorEmailMsgMonke = document.createElement("p");
    const errorEmailMsgDot = document.createElement("p");
    const errorLargeInput = document.createElement("p");

    function emailValidator() {
        const trimmedEmail = eMail.value.trim();
        if (!trimmedEmail.includes("@")) {
            errorEmailMsgMonke.innerText = "Pole email musi zawierać znak @.";
            errorEmailMsgMonke.style.cssText = errorMsgCss;
            validationMsg.appendChild(errorEmailMsgMonke);
        } else if (trimmedEmail.slice(0, 1) == '@') {
            errorEmailMsgMonke.innerText = "Pole email nie może zaczynać się od znaku @.";
            errorEmailMsgMonke.style.cssText = errorMsgCss;
            validationMsg.appendChild(errorEmailMsgMonke);
        } else {
            if (validationMsg.contains(errorEmailMsgMonke)) {
                validationMsg.removeChild(errorEmailMsgMonke);
            }
        }
        errorEmailMsgDot.style.cssText = errorMsgCss;
        if (!trimmedEmail.includes(".")) {
            errorEmailMsgDot.innerText = "Pole email musi zawierać znak kropka - '.' .";
            validationMsg.appendChild(errorEmailMsgDot);
        } else if (trimmedEmail.slice(-1) == '.') {
            errorEmailMsgDot.innerText = "Pole email nie może mieć znaku '.' - kropka na końcu.";
            validationMsg.appendChild(errorEmailMsgDot);
        } else if (trimmedEmail.charAt(trimmedEmail.indexOf('@') + 1) == '.') {
            errorEmailMsgDot.innerText = "Pole email nie może zawierać znaku . bezpośrednio po znaku @.";
            validationMsg.appendChild(errorEmailMsgDot);
        } else {
            if (validationMsg.contains(errorEmailMsgDot)) {
                validationMsg.removeChild(errorEmailMsgDot);
            }
        }

        checkSubmitButton();
    }

    function validateEmpty(field, fieldError, filedName) {
        if (field.value.trim() === "") {
            fieldError.innerText = `Pole ${filedName} nie może być puste.`;
            fieldError.style.cssText = errorMsgCss;
            validationMsg.appendChild(fieldError);
        } else {
            if (validationMsg.contains(fieldError)) {
                validationMsg.removeChild(fieldError);
            }
        }
        checkSubmitButton();
    }

    function checkSubmitButton() {
        const hasErrors = validationMsg.children.length > 0;
        const isNameEmpty = name.value.trim() === "";
        const isEmailEmpty = eMail.value.trim() === "";
        const isLargeInputEmpty = largeInput.value.trim() === "";

        if (hasErrors || isNameEmpty || isEmailEmpty || isLargeInputEmpty) {
            submitBtn.classList.add("cursor-not-allowed", "opacity-50");
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove("cursor-not-allowed", "opacity-50");
            submitBtn.disabled = false;
        }
    }

    name.addEventListener("input", () => {
        validateEmpty(name, errorNameMsg, "imię");
    });
    eMail.addEventListener("input", () => {
        validateEmpty(eMail, errorEmailMsg, "email");
    });
    eMail.addEventListener("input", emailValidator);
    largeInput.addEventListener("input", () => {
        validateEmpty(largeInput, errorLargeInput, "wiadomości");
    });


    const form = document.getElementById("contact-form");
    console.log(form)
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (validationMsg.children.length === 0) {
            const data = {
                name: name.value.trim(),
                email: eMail.value.trim(),
                message: largeInput.value.trim()
            };
            sendContact(data, form);
        }
    });
}

async function setLoadedData(elementName, div) {

    try {
        const response = await fetch(`http://localhost:3000/${elementName}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const htmlContent = await response.text();
        div.innerHTML = htmlContent;
        if (elementName === "contact") {
            const form = document.getElementById("contact-form");
            if (form) {
                initiateContactForm();
            }
        }
    } catch (error) {
        div.innerHTML = `<h3 class="text-xl">Dane elemntu ${elementName} nie załadowane.</h3>`
        div.style.cssText = errorMsgCss;
        console.error('Wystąpił błąd:', error);
    }
}

function tryToLoadData(elementName, div) {
    div.innerHTML = `<div class="p-5 px0 title-container">
        <h1 class="text-4xl text-accent font-bold uppercase title-shadow ">Ładowanie danych ...</h1>
    </div>`
    setLoadedData(elementName, div);
}

function getDataFromLocalhost(endpoint) {

    const navbar = document.getElementById("nav-bar");
    tryToLoadData("nav-bar", navbar);

    const footer = document.getElementById("footer1");
    tryToLoadData("footer", footer);

    const main = document.getElementById("main");
    switch (endpoint) {
        case '':
            tryToLoadData("main", main);
            break;
        case 'gallery':
            tryToLoadData("gallery", main);
            break;
        case 'contact':
            tryToLoadData("contact", main);
            break;
        default:
            tryToLoadData("main", main);
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    const address = window.location.href;
    const endpoint = address.slice(address.indexOf('#') + 1);
    getDataFromLocalhost(endpoint);
    window.addEventListener("resize", toggleMobileMenuVisibility);
});

window.addEventListener('hashchange', () => {
    const address = window.location.href;
    const endpoint = address.slice(address.indexOf('#') + 1);
    console.log('Endpoint after hashchange:', endpoint);
    getDataFromLocalhost(endpoint);
});

