
// SCROLLBAR


const scroll = document.createElement("hr")
scroll.setAttribute('style', 'border: 3px solid red; position:fixed')


document.onscroll = () => {
    height = window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    scroll.width = `${height*100}%`
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
        if(pos > 0){
            scrollTo(0, pos-100)
        } else {
            window.clearInterval(toTop);
        }
    },200)

}

//-----------------------------------------------------------------------------------------------------