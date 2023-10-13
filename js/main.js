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

// SCROLLBAR AND NEWSLETTER

const scroll = document.createElement("hr")
scroll.setAttribute('style', 'border: 3px solid red; position:fixed')


const news = document.createElement("modal")
news.classList.add("newsletterModal")
const pModal = document.createElement("p")
const btnSusbribe = document.createElement("button")
btnSusbribe.classList.add("btnSuscribe")

btnSusbribe.textContent = "Suscribe"

pModal.textContent = "Subscribe to our newsletter"


document.onscroll = () => {
    height = window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    scroll.width = `${height * 100}%`
    console.log(height)

    if(Math.round(height*100) === 25){
        news.style.visibility = "visible";
    }

}
setTimeout(() => {
    news.style.visibility = "visible";
    news.style.opacity = "1"
    news.style.transition = "opacity 1s ease-in, visibility 0.25s 0.25s"
    console.log("hola")
   }, "5000");

document.body.insertBefore(scroll, document.querySelector(".header"))
document.body.insertBefore(news, document.querySelector(".header"))
news.append(pModal)
news.append(btnSusbribe)


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
let checkInvalid;

const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const inputToVal = [nameInput, emailInput, checkboxInput]
const inputMsgVal = ['name', 'email', 'checkbox']

const validationEvery = (input, inputMsg) => [
    [input.value === '', `The ${inputMsg} is invalid: It must be complete`],
    [input.value.length < 2 || input.value.length > 100, `The ${inputMsg} is invalid: It must be contain between 2 and 100 caracthers`],
    [!input.value.match(validateEmail), `The ${inputMsg} is invalid: It must an email valid`],
    [!input.checked, `The ${inputMsg} is invalid: It must be cheked`]
]

const validForm = () => {

    const checkVal = inputToVal.map((input, i) => {

        for(let j=1; j<validationEvery.length; j++){

            if (validationEvery(input) [0][0]) {
                input.classList.add("invalid")
                alert(validationEvery(input, inputMsgVal[i]) [0][1])
                return true;
            } else{
                input.classList.remove("invalid")

                if(validationEvery(input)[i+1][0]){
                    input.classList.add("invalid")
                    alert(validationEvery(input, inputMsgVal[i])[i+1][1])
                    return true
                } else{
                    input.classList.remove("invalid")
                    return false
                }
            }
        }
        
    })

    console.log(checkVal)
    let isValid = checkVal.every((check) => check === false)

    return isValid
}

// SEND DATE TO SERVER

const sendDateServer = () => {

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            name: nameInput.value,
            email: emailInput.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
    .then((response) => response.json())
    .then((json) => (
        alert(`Send form contact success with the id ${json.id},  the name ${json.name} and the email ${json.email}`,
        console.log(json)
    )))

}

sendButton.onclick = (e) => {
    e.preventDefault()

    if (validForm()) {
        console.log(false)
        sendDateServer()
    
    } else {
        e.preventDefault()
        console.log(true)
    }
}

//--------------------------------------------------------------------------------------------------------
