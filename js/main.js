const scroll = document.createElement("hr")
let width = 0%

scroll.setAttribute('style', 'border: 3px solid red; position:fixed')

document.body.insertBefore(scroll, document.querySelector(".header"))

document.onscroll = () => {
    const height = window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    scroll.width = `${height*100}%`
}
