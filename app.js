

let leftBtns = document.querySelectorAll(".left-btns")
let rightBtns = document.querySelectorAll(".right-btns")
let leftIn = document.querySelector(".left-input")
let rightIn = document.querySelector(".right-input")

let base = 'USD'
let symbols = 'AZN'
let LIV = leftIn.value
let RIV = rightIn.value
let state = true


const callApi = (base, symbols, inputVal) => {
    fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols} `)
        .then(res => res.json())
        .then(data => rightIn.value = inputVal * data.rates[symbols])

}

const callApiRight = (base, symbols, inputVal) => {
    fetch(`https://api.exchangerate.host/latest?base=${symbols}&symbols=${base} `)
        .then(res => res.json())
        .then(data => leftIn.value = inputVal * data.rates[base])
}


//========== left buttons add active class==========================
const leftActive = (e) => {
    leftBtns.forEach(item => item.classList.remove("left-active"))
    e.target.classList.add("left-active")
}
leftBtns.forEach(item => {
    item.addEventListener("click", leftActive)
})
// =================================================================

// =========CALL API=================
leftBtns.forEach(item => {
    item.addEventListener("click", () => {
        state = true
        if (state) {
            base = item.textContent;
            console.log(base)
            callApi(base, symbols, LIV)
        } else {
            symbols = item.textContent
            callApiRight(base, symbols, RIV)
        }

    })
})



//========== right buttons active class==========================
const rigthActive = (e) => {
    rightBtns.forEach(item => item.classList.remove("right-active"))
    e.target.classList.add('right-active')
}
rightBtns.forEach(item => {
    item.addEventListener("click", rigthActive)
})


// =========CALL API=================
rightBtns.forEach(item => {
    item.addEventListener("click", () => {
        state = false
        if (!state) {
            symbols = item.textContent
            callApiRight(base, symbols, RIV)
        } else {
            base = item.textContent;
            callApi(base, symbols, LIV)
        }

    })
})


leftIn.addEventListener("keyup", () => {
    LIV = leftIn.value;

    callApi(base, symbols, LIV)
})

rightIn.addEventListener("keyup", () => {
    RIV = rightIn.value
    callApiRight(base, symbols, RIV)
})


