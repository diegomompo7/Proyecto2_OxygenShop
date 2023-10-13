// CLICK MENU

const mobileMenuNav = document.querySelector(".header__nav")
const mobileMenuBtn = document.querySelector(".header__nav--svg")
const mobileMenu = document.querySelector(".header__nav--mobile")



const menuClosed = () => {

    mobileMenuBtn.onclick = () => {
        mobileMenu.style.display = 'none'
        menuOpen()
    }
}

const menuOpen = () => {

    mobileMenuBtn.onclick = () => {
        mobileMenu.style.display = 'block'
        menuClosed()
    }
}

menuOpen()


// ------------------------------------------------------------------------------------------

// SCROLLBAR


const scroll = document.createElement("hr")
scroll.setAttribute('style', 'border: 3px solid red; position:fixed')


document.onscroll = () => {
    height = window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    scroll.width = `${height * 100}%`
}

document.body.insertBefore(scroll, document.querySelector(".header"))

//-------------------------------------------------------------------------------------------------

// BUTTON RETURN TO THE TOP

const scrollContainer = document.createElement("div")
const scrollUp = document.createElement("button")
scrollContainer.classList.add("btn")
scrollUp.classList.add("btn__return")
scrollUp.textContent = "Return to the top"

document.body.insertBefore(scrollContainer, document.querySelector(".footer"))
scrollContainer.append(scrollUp)

scrollUp.onclick = () => {
    let toTop = window.setInterval(() => {
        let pos = window.scrollY;
        if (pos > 0) {
            scrollTo(0, pos - 100)
        } else {
            window.clearInterval(toTop);
        }
    }, 200)

}

//-----------------------------------------------------------------------------------------------------

// VALIDATIONS FORM

const nameInput = document.querySelector(".contact__form--name--input")
const emailInput = document.querySelector(".contact__form--email--input")
const checkboxInput = document.querySelector(".contact__form--checkbox")
const sendButton = document.querySelector(".contact__form--send")

let saveForm = []
const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validForm = () => {

    if(nameInput.value === '') {
        nameInput.classList.add("invalid")
        alert("The name is invalid: It must be complete")
    } else if(nameInput.value.length < 2 || nameInput.value.length > 100){
        nameInput.classList.add("invalid")
        alert("The name is invalid: It must be contain between 2 and 100 caracthers")
    }
    else{
        nameInput.classList.remove("invalid")
    }

    if( emailInput.value === '') {
        emailInput.classList.add("invalid")
        alert("The email is invalid: It must be complete")
    } else if(!emailInput.value.match(validateEmail)){
        emailInput.classList.add("invalid")
        alert("The email is invalid: It must an email valid")
    }
    else{
        nameInput.classList.remove("invalid")

    }

    return !!(nameInput.classList.contains("invalid") && emailInput.classList.contains("invalid"));
}

sendButton.onclick = () => {
    console.log(validForm())
}
console.log(saveForm)