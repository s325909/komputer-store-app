const bankBalanceElement = document.querySelector('#bankBalance');
const workBalanceElement = document.querySelector('#workBalance');

const bankLoanBtnElement = document.querySelector('#bankLoanBtn');
const bankPayBtnElement = document.querySelector('#bankPayBtn');
const workBankBtnElement = document.querySelector('#workBankBtn');
const workLaborBtnElement = document.querySelector('#workLaborBtn');

const laptopSelectElement = document.querySelector('#laptopSelect');

const laptopImgElement = document.querySelector('#laptopImg');
const laptopTitleElement = document.querySelector('#laptopTitle');
const laptopDescriptionElement = document.querySelector('#laptopDescription');
const laptopFeaturesElement = document.querySelector('#laptopFeatures');
const laptopPriceElement = document.querySelector('#laptopPrice');

const baseURL = "https://noroff-komputer-store-api.herokuapp.com";
const balanceNOK = " Kr.";
let hasLoan = false;
let boughtLaptops;
let displayLaptops;

(async function() {
    try {
        const response = await fetch(`${baseURL}/computers`);
        const laptopsJson = await response.json();
        displayLaptops = [...laptopsJson];
    }catch(error) {
        console.log(error.message);
    }
    addLaptopSelectOptions();
    displayLaptop(displayLaptops[0]);
})();

workLaborBtnElement.addEventListener('click', e => {
    const prevBalance = Number.parseInt(workBalanceElement.innerHTML);
    workBalanceElement.innerHTML = prevBalance + 100 + balanceNOK;
});

workBankBtnElement.addEventListener('click', e => {
    const bankBalance = Number.parseInt(bankBalanceElement.innerHTML);
    const salaryBalance = Number.parseInt(workBalanceElement.innerHTML);
    bankBalanceElement.innerHTML = bankBalance + salaryBalance + balanceNOK;
    workBalanceElement.innerHTML = 0 + balanceNOK;
});

bankLoanBtnElement.addEventListener('click', e => {
    if (hasLoan) {
        alert("Reject! You may not have two loans at once. The initial loan should be paid back in full.")
        return;
    }

    const loanAmount = Number(window.prompt("Enter an amount: ", ""));
    const bankBalance = Number.parseInt(bankBalanceElement.innerHTML);

    if (loanAmount > bankBalance * 2) {
        alert("Rejected! You cannot get a loan more than double of your bank balance!");
        return;
    }

    // const eligible = checkLoanRequirements(loanAmount, bankBalance)

    bankBalanceElement.innerHTML = bankBalance + loanAmount + balanceNOK;
    hasLoan = true;
});

bankPayBtnElement.addEventListener('click', e => {
    if (!hasLoan) {
        alert("You don't have a loan to pay back...");
        return;
    }

    const loanAmount = Number(window.prompt("Enter an amount: ", ""));
    const bankBalance = Number.parseInt(bankBalanceElement.innerHTML);

    if (loanAmount > bankBalance * 2) {
        alert("Rejected! You cannot get a loan more than double of your bank balance!");
        return;
    }

    // const eligible = checkLoanRequirements(loanAmount, bankBalance)

    bankBalanceElement.innerHTML = loanAmount - bankBalance + balanceNOK;
    hasLoan = true;
});

laptopSelectElement.addEventListener('change', e => {
    const laptop = displayLaptops.find(laptop => laptop.title === e.target.value);
    displayLaptop(laptop);
});

function addLaptopSelectOptions() {
    for (const laptop of displayLaptops) {
        const laptopOption = document.createElement('option');
        console.log(laptop.title);
        laptopOption.text = laptop.title;
        laptopSelectElement.append(laptopOption);
    }
}

function displayLaptop(laptop) {
    laptopImgElement.src = `${baseURL}/${laptop.image}`;

    laptopTitleElement.innerHTML = laptop.title;
    laptopDescriptionElement.innerHTML = laptop.description;
    laptopPriceElement.innerHTML = laptop.price + balanceNOK;

    laptopFeaturesElement.innerHTML = "";
    for (const spec of laptop.specs) {
        laptopFeaturesElement.innerHTML += `<li>${spec}</li>`;
    }
}
