// CLICK MENU

const mobileMenuBtn = document.querySelector(".header__nav--svg");
const mobileMenu = document.querySelector(".header__nav--mobile");
mobileMenu.style.display = "none";

mobileMenuBtn.onclick = () => {
  if (mobileMenu.style.display === "none") {
    mobileMenu.style.display = "block";
  } else {
    mobileMenu.style.display = "none";
  }
};

//-------------------------------------------------------------------------------------------

//NEWSLETTER

const news = document.createElement("modal");
news.classList.add("newsletterModal");
const pModal = document.createElement("p");
const inputModal = document.createElement("input");
inputModal.classList.add("inputSuscribe");
const btnSusbribe = document.createElement("button");
btnSusbribe.classList.add("btnSuscribe");
const btnClosed = document.createElement("button");
btnClosed.classList.add("btnClosed");

btnSusbribe.textContent = "Subscribe";
btnClosed.textContent = "X";

pModal.textContent = "Subscribe to our newsletter";

setTimeout(() => {
  if (!sessionStorage.getItem("Closed")) {
    news.style.visibility = "visible";
    news.style.opacity = "1";
  }
}, "5000");

document.onkeydown = (event) => {
  if (event.key === "Escape") {
    news.style.visibility = "hidden";
    news.style.opacity = "0";
    news.style.transition = "opacity 1s ease-in, visibility 0.25s 0.25s";
    sessionStorage.setItem("Closed", "true");
  }
};
window.onclick = (event) => {
  if (event.target.parentNode !== news) {
    if (event.target !== news) {
      news.style.visibility = "hidden";
      news.style.opacity = "0";
      news.style.transition = "opacity 0.5s ease-in, visibility 0.25s 0.25s";
      sessionStorage.setItem("Closed", "true");
    }
  }
};

btnClosed.onclick = () => {
  news.style.visibility = "hidden";
  news.style.opacity = "0";
  news.style.transition = "opacity 0.5s ease-in, visibility 0.25s 0.25s";
  sessionStorage.setItem("Closed", "true");
};

document.body.insertBefore(news, document.querySelector(".header"));
news.append(btnClosed);
news.append(pModal);
news.append(inputModal);
news.append(btnSusbribe);

// ------------------------------------------------------------------------------------------

// SCROLLBAR

const scroll = document.createElement("hr");
scroll.setAttribute("style", "border: 3px solid red; position:fixed; display:none;");

document.onscroll = () => {
  const height =
    window.scrollY /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);

      console.log(height * 100)

      if( height !=0){
        scroll.style.display = 'block'
        scroll.width = `${height * 100}%`;
      }else{
        scroll.style.display = 'none'
      }

  if (Math.round(height * 100) >= 25 && !sessionStorage.getItem("Closed")) {
    news.style.visibility = "visible";
    news.style.opacity = "1";
  }
};

document.body.insertBefore(scroll, document.querySelector(".header"));

//-------------------------------------------------------------------------------------------------

// BUTTON RETURN TO THE TOP

const scrollContainer = document.createElement("div");
const scrollUp = document.createElement("button");
scrollContainer.classList.add("btn");
scrollUp.classList.add("btn__return");
scrollUp.textContent = "Return to the top";

document.body.insertBefore(scrollContainer, document.querySelector(".footer"));
scrollContainer.append(scrollUp);

scrollUp.onclick = () => {
  let toTop = window.setTimeout(() => {
    let pos = window.scrollY;
    if (pos > 0) {
      scrollTo({top: 0,  behavior:"smooth"});
    } else {
      window.clearInterval(toTop);
    }
  }, 200);
};

//-----------------------------------------------------------------------------------------------------

// VALIDATIONS FORM

const nameInput = document.querySelector(".contact__form--name--input");
const emailInput = document.querySelector(".contact__form--email--input");
const checkboxInput = document.querySelector(".contact__form--checkbox");
const sendButton = document.querySelector(".contact__form--send");

const inputToVal = [nameInput, emailInput, checkboxInput];
const inputMsgVal = ["name", "email", "checkbox"];

const validateEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validationEvery = (input, inputMsg) => [
  [input.value === "", `The ${inputMsg} is invalid: It must be complete`],
  [
    input.value.length < 2 || input.value.length > 100,
    `The ${inputMsg} is invalid: It must be contain between 2 and 100 caracthers`,
  ],
  [
    !input.value.match(validateEmail),
    `The ${inputMsg} is invalid: It must an email valid`,
  ],
  [!input.checked, `The ${inputMsg} is invalid: It must be cheked`],
];

const validForm = () => {
  const checkVal = inputToVal.map((input, i) => {
    for (let j = 1; j < validationEvery.length; j++) {
      if (validationEvery(input)[0][0]) {
        input.classList.add("invalid");
        //alert(validationEvery(input, inputMsgVal[i])[0][1])
        return true;
      } else {
        input.classList.remove("invalid");

        if (validationEvery(input)[i + 1][0]) {
          input.classList.add("invalid");
          //alert(validationEvery(input, inputMsgVal[i])[i + 1][1])
          return true;
        } else {
          input.classList.remove("invalid");
          return false;
        }
      }
    }
  });

  let isValid = checkVal.every((check) => check === false);

  return isValid;
};

//----------------------------------------------------------------------------------------------

// SEND EMAIL NEWSLETTER

const inputToSend = inputModal;

btnSusbribe.onclick = () => {
  if (inputToSend.value === "") {
    // alert("The email is invalid: It must be complete")
  } else if (!inputToSend.value.match(validateEmail)) {
    // alert("The email is invalid: It must an email valid")
  } else {
    // alert("The email is correct: We send you an email")
    news.style.visibility = "hidden";
    news.style.opacity = "0";
    news.style.transition = "opacity 1s ease-in, visibility 0.25s 0.25s";
    sessionStorage.setItem("email", inputToSend.value);
    sessionStorage.setItem("Closed", "true");
  }
};

//-------------------------------------------------------------------------------------------------

// SEND DATE TO SERVER

const sendDateServer = () => {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      name: nameInput.value,
      email: emailInput.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) =>
      /*alert(`Send form contact success with the id ${json.id},  the name ${json.name} and the email ${json.email}`)*/
      console.log(json)
    );
};

sendButton.onclick = (e) => {
  e.preventDefault();

  if (validForm()) {
    sendDateServer();
  } else {
    e.preventDefault();
  }
};

//--------------------------------------------------------------------------------------------------------

// CURRENCY SELECTOR

const pricesContainer = document.querySelector(".prices");
const pricesPlans = document.querySelector(".prices__plans");
const urlConverter =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const currCurrencyBasic = document.querySelector(".basic__cost");
const currCurrencyPro = document.querySelector(".professional__cost");
const currCurrencyPremium = document.querySelector(".premium__cost");

let currCurrencyArr = currCurrencyBasic.textContent.split("");
currCurrencyArr.push(currCurrencyPro.textContent.split(currCurrencyArr[0])[1]);
currCurrencyArr.push(
  currCurrencyPremium.textContent.split(currCurrencyArr[0])[1]
);

let currCurrencyConverted = [];

const currSelector = [
  ["eur", "Euro", "€"],
  ["usd", "Dollar", "$"],
  ["gbp", "Pound", "£"],
];

const pSelector = document.createElement("p");
pSelector.classList.add("prices__titleSelector");

const divSelect = document.createElement("div");
divSelect.classList.add("prices__container");
const selector = document.createElement("select");
selector.classList.add("prices__container--selector");
const btnSelector = document.createElement("button");
btnSelector.classList.add("prices__container--btnSelector");

pSelector.textContent = "Currency to Converter";
btnSelector.textContent = "Convert";

for (let i = 0; i < currSelector.length; i++) {
  const option = document.createElement("option");
  option.textContent = currSelector[i][1];
  selector.append(option);
}

pricesContainer.insertBefore(pSelector, pricesPlans);
pricesContainer.insertBefore(divSelect, pricesPlans);
divSelect.append(selector);
divSelect.append(btnSelector);

const currConverted = (data, currConvertArr) => {
  currCurrencyConverted.push(currConvertArr[0][2]);

  for (let i = 1; i < currCurrencyArr.length; i++) {
    currCurrencyConverted.push(
      (currCurrencyArr[i] * data[currConvertArr[0][0]].toFixed(2)).toFixed(0)
    );
  }

  currCurrencyBasic.textContent = currCurrencyConverted[0].concat(
    currCurrencyConverted[1]
  );
  currCurrencyPro.textContent = currCurrencyConverted[0].concat(
    currCurrencyConverted[2]
  );
  currCurrencyPremium.textContent = currCurrencyConverted[0].concat(
    currCurrencyConverted[3]
  );

  currCurrencyArr = currCurrencyConverted;
  currCurrencyConverted = [];
};

btnSelector.onclick = () => {
  const currConvert = currSelector.filter(
    (value) => value[1] === selector.value
  );
  const currConvertAct = currSelector.filter(
    (value) => value[2] === currCurrencyArr[0]
  );

  currConvert.push(currConvertAct[0]);

  fetch(urlConverter + currConvert[1][0] + "/" + currConvert[0][0] + ".json")
    .then((response) => response.json())
    .then((json) => {
      currConverted(json, currConvert);
    });
};

//-------------------------------------------------------------------------------------------------------------------------------ç

// SLIDER

const divSlider = document.createElement("div");
divSlider.id = "slider";

const divBtn = document.createElement("div");
divBtn.classList.add("btnSlider");

const btnPrevious = document.createElement("button");
btnPrevious.classList.add("btnPrevious");
btnPrevious.textContent = "<";

const btnNext = document.createElement("button");
btnNext.classList.add("btnNext");
btnNext.textContent = ">";

const divCircle = document.createElement("div");

divCircle.classList.add("divCircle");

document.body.insertBefore(divSlider, document.querySelector(".contact"));

for (let i = 1; i <= 5; i++) {
  const img = document.createElement("img");
  img.setAttribute("src", `assets/img/image${i}.jpg`);
  divSlider.appendChild(img);
}

divSlider.appendChild(divBtn);
divBtn.append(btnPrevious);
divBtn.append(btnNext);
divSlider.append(divCircle);

divSlider.querySelectorAll("img").forEach(() => {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  divCircle.append(circle);
});

class Slider {
  constructor(id) {
    this.slider = document.querySelector(id);
    this.images = this.slider.querySelectorAll("img");
    this.circle = this.slider.querySelectorAll(".circle");
    this.currentImage = 0;

    this.showImage(this.currentImage);
  }

  showImage(index) {
    this.images.forEach((img, i) => {
      if (i === index) {
        img.style.display = "block";
        this.circle[i].style.backgroundColor = "white";
      } else {
        img.style.display = "none";
        this.circle[i].style.backgroundColor = "gray";
      }
    });

    const autoImage = setTimeout(() => {
      this.nextImage(this.currentImage);
    }, 2000);

    this.buttonNext(autoImage);
    this.buttonPrev();
  }

  nextImage() {
    this.currentImage = (this.currentImage + 1) % this.images.length;
    this.showImage(this.currentImage);
  }
  prevImage() {
    this.currentImage = (this.currentImage - 1) % this.images.length;
    if (this.currentImage < 0) {
      this.currentImage = this.images.length - 1;
    }
    this.showImage(this.currentImage);
  }
  buttonNext(autoImage) {
    btnNext.onclick = () => {
      clearTimeout(autoImage);
      this.nextImage(this.currentImage);
    };
  }
  buttonPrev() {
    btnPrevious.onclick = () => {
      this.prevImage(this.currentImage);
    };
  }
}

new Slider("#slider");
