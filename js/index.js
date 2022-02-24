
const main = document.getElementById("main");

const loadCards = async () => {
    const inputText = document.getElementById("input-field");
    const inputValue = inputText.value;
    const errorShower = document.getElementById("errorShower");

    if (isNaN(inputValue)) {
        errorShower.innerText = "Sorry! Input type error for string. Enter input that is number."
        main.textContent = "";
    }
    else if (inputValue < 0) {
        errorShower.innerText = "Sorry! Input type error for negative number. Enter input that is positive number."
        main.textContent = "";
    }
    else if (inputValue == "") {
        errorShower.innerText = "Sorry! Input type error for empty. Enter input a number."
        main.textContent = "";
    }

    else if (Number.isInteger(Number(inputValue)) == false) {
        errorShower.innerText = "Sorry! Input type error for float. Enter input that is integer number."
        main.textContent = "";
    }
    else {
        if (inputValue <= 52) {
            errorShower.innerText = "";
            const res = await fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputValue}`)
            const data = await res.json();
            console.log(data.cards);
            displayCards(data.cards);
        }
        else {
            errorShower.innerText = "Not enough cards. Numbers of total card is : 52"
        }


    }
    inputText.value = "";
}

const displayCards = (cards) => {
    main.textContent = "";
    for (const card of cards) {
        const div = document.createElement("div");
        div.classList.add("col-sm-12");
        div.classList.add("col-md-6");
        div.classList.add("col-lg-3");
        div.classList.add("mb-3");

        div.innerHTML = `
    <div class="card"">
        <img  src="${card.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h5 class="card-title">${card.suit}</h5>
            <a onclick="loadDetails('${card.code}')" href="#" class="btn btn-primary">Details</a>
        </div>
    </div>
        
        `
        main.appendChild(div);
    }


}
const loadDetails = code => {

    fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52")
        .then(res => res.json())
        .then(data => {
            const cards = data.cards;
            const card = cards.find(sigle => sigle.code == code);
            const div = document.createElement("div");
            div.innerHTML = `
            
    <div class="card w-25 mx-auto my-5"">
        <img  src="${card.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h5 class="card-title">Name: ${card.suit}</h5>
            <h6>Value: ${card.value}</h6>
            <h6>Code: ${card.code}</h6>
            
        </div>
    </div>
        
        `
            main.textContent = "";
            main.appendChild(div);
        })
}