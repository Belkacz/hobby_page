const serverAdress = "http://localhost:3000"
const errorMsgCss = "color: red; var(--color-error); padding: 10px 0px 10px 0px";

// prosty skrypt przekierowujący dzięki niemu możemy przejść do linków dzięki przyciskom na które klikniemy a nie stylizowanym kotwicą w divie
function redirectTo(url) {
    window.open(url, "_blank")
}

// funkcja która wycina nam pcozatek adresu do ostatniego znaku '/' a następnie dodaje nowy endpoint po #
function redirectToSubPage(destination, event) {
    event.preventDefault() // blokujemy przełdowanie by nie było efektu klimay przenosi nas na strone #<nazwa_sub_domeny> a następnie stona się odświerza i znów
    // trafiamy na stonę domową bez #
    const path = window.location.pathname;
    if (destination == '' || destination == null || destination == undefined) { // przy pusty endponcie wróć na stornę główną
        window.location.href = path
    } else {
        window.location.href = path + '#' + destination;
    }
}

//funkcja przesuwajaca na góre
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// funkcja pokazujaca i chowająca listę pod mobile menu
function showMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
}

// funkcja do chowania wysiniętego menu jak powiększymy ekran. Problem był taki że jak się wywineło mobile menu porzeszyło ekran i znów go zmniejszyło to
// menu było ciągle wywinięte i to było dziwne. 
function toggleMobileMenuVisibility() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (window.innerWidth >= 1024) {
        if (!mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
        }
    }
}

// asynchroniczbna funkcja do wysyłania informacji z formualrz kontaktowego
async function sendContact(data, form) {
    try {
        const response = await fetch(`${serverAdress}/save-contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert("Twój formularz został wysłany :)");
            form.reset();
            checkSubmitButton();
            const htmlContactList = document.getElementById("contact-list");
            if(htmlContactList && htmlContactList != undefined) {
                getContactList(htmlContactList);
            }
        } else {
            alert("Błąd w trakcie wysyłania formularza.");
        }
    } catch (error) {
        console.error("Błąd:", error);
        alert("Błąd w trakcie łączenia z serwerem.");
    }
}

function checkSubmitButton() {
    const validationMsg = document.getElementById("validation-msg");
    const name = document.getElementById("input_name");
    const eMail = document.getElementById("input_email");
    const largeInput = document.getElementById("large-input")
    const submitBtn = document.getElementById("submit-btn")

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

// walidator czy pole jest puste, abstrakcyjny trochę by był dla każadego pola
function validateEmpty(field, fieldError, filedName, validationMsg) {
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

function emailValidator(validationMsg, errorEmailMsgMonke, errorEmailMsgDot) {
    const trimmedEmail = document.getElementById("input_email").value.trim();
    // const errorEmailMsgMonke = document.createElement("p");
    // const errorEmailMsgDot = document.createElement("p");

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
    // sprawdzanie blokady przycisku wyślij
    checkSubmitButton();
}

// funkcja inicjująca validatory formularza i blokująca pośrednio przycisk wyślij. Musi to być tu wyciągniete byśmy nie próbowali złpać inputów gdy ich nie ma
// na innych stronach. Daltego też właczamy to gdy jesteśmy pod adresem zakończonym #contact
function initiateContactForm() {

    // deklarrownie zmiennych które przekażemy walidatorom
    const form = document.getElementById("contact-form");

    const validationMsg = document.getElementById("validation-msg");
    const name = document.getElementById("input_name");
    const eMail = document.getElementById("input_email");
    const largeInput = document.getElementById("large-input")

    const errorNameMsg = document.createElement("p");
    const errorEmailMsg = document.createElement("p");
    const errorEmailMsgMonke = document.createElement("p");
    const errorEmailMsgDot = document.createElement("p");
    const errorLargeInput = document.createElement("p");

    //tutaj uruchamiamy walidatory
    name.addEventListener("input", () => {
        validateEmpty(name, errorNameMsg, "imię", validationMsg);
    });
    eMail.addEventListener("input", () => {
        emailValidator(validationMsg, errorEmailMsgMonke, errorEmailMsgDot);
        validateEmpty(eMail, errorEmailMsg, "email", validationMsg);
    });
    // eMail.addEventListener("input", emailValidator);
    largeInput.addEventListener("input", () => {
        validateEmpty(largeInput, errorLargeInput, "wiadomości", validationMsg);
    });

    // event na przycisk submit naszego formularza
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // wyłaczenie przeładowania

        if (validationMsg.children.length === 0) { //sprawdzenie czy nie ma errodów i spakowanie danych do obiektu data
            const data = {
                name: name.value.trim(),
                email: eMail.value.trim(),
                message: largeInput.value.trim()
            };
            sendContact(data, form); // wysłanie danych
        }
    });
}

async function getContactList(htmlContactList) {
    try {
        htmlContactList.innerHTML = 'Ładowanie';
        // to można by rozhardkodować i trzymać endpoint i komunikat w zmiennych
        const contactDataResponse = await fetch(`${serverAdress}/contact-list`);

        if(!contactDataResponse.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const contactData = await contactDataResponse.json();
    
        if (contactData && contactData.length > 0) {
            htmlContactList.innerHTML = '';
            // Tworzenie listy HTML
            const ul = document.createElement('ul');
            ul.classList.add('list-disc', 'p-4', 'py-2'); // klasy TailwindCSS
            // Dodawanie elementów do listy
            contactData.forEach(contact => {
                const date = new Date(contact.date);
                const formattedDate = date.toLocaleString();
                const li = document.createElement('li');
                li.classList.add('italic'); // klasy TailwindCSS
                li.textContent = `Wiadomość od ${contact.name} z ${formattedDate}: ${contact.message}`;
                ul.appendChild(li);
            });

            // Dodanie listy do kontenera
            htmlContactList.appendChild(ul);
        } else {
            // Obsługa przypadku, gdy lista jest pusta
            htmlContactList.innerHTML = '<p>No contacts found.</p>';
        }
    } catch (error) {
        console.log(error)
    }
}

// funkcja wstrzykujaca załadowane dane
async function setLoadedData(elementName, div) {
    // blok catch try do łapania błędów
    try {
        const response = await fetch(`${serverAdress}/${elementName}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const htmlContent = await response.text();
        div.innerHTML = htmlContent; // wstrzykiwanie danych do elementu div

        // sprawdzenie czy mamy podstonę #contact i zainicjowanie walidatorów formualrza
        if (elementName === "contact") {
            const form = document.getElementById("contact-form");
            if (form && form != undefined) {
                initiateContactForm();
            }
            const htmlContactList = document.getElementById("contact-list");
            if(htmlContactList && htmlContactList != undefined) {
                getContactList(htmlContactList);
            }
        }
    } catch (error) { // wrzucenie error komunikatu w dany blok jeśli się nie załaduje
        div.innerHTML = `<h3 class="text-xl">Dane elemntu ${elementName} nie załadowane.</h3>`
        div.style.cssText = errorMsgCss;
        console.error('Wystąpił błąd:', error);
    }
}

// taki wrapper do ładowania danych i wrzucjący palceholder (widoczny przy wolniejszym internecie)
function tryToLoadData(elementName, div) {
    div.innerHTML = `<div class="p-5 px0 title-container">
        <h1 class="text-4xl text-accent font-bold uppercase title-shadow ">Ładowanie danych ...</h1>
    </div>`
    setLoadedData(elementName, div);
}

// funkcja sterujaca jakie elementy wczytywać.
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

// event odpalajacy dane na start po załadowaniu strony przy odświeżeniu i pokazywanie lub chowanie mobile menu
document.addEventListener("DOMContentLoaded", (event) => {
    const address = window.location.href;
    const endpoint = address.slice(address.indexOf('#') + 1);
    getDataFromLocalhost(endpoint);
    window.addEventListener("resize", toggleMobileMenuVisibility);
});

// event na zmaine wartości za # na kończu adresu by wychwycić przejscie an subdomene i pobrać dane
window.addEventListener('hashchange', () => {
    const address = window.location.href;
    const endpoint = address.slice(address.indexOf('#') + 1);
    getDataFromLocalhost(endpoint);
});

