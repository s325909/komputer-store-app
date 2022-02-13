const bankBalanceElement = document.querySelector('#bankBalance');
const loanBalanceElement = document.querySelector('#loanBalance');
const workBalanceElement = document.querySelector('#workBalance');
const bankLoanElement = document.querySelector('#bankLoan');

const bankLoanBtnElement = document.querySelector('#bankLoanBtn');
const bankPayBtnElement = document.querySelector('#bankPayBtn');
const workBankBtnElement = document.querySelector('#workBankBtn');
const workLaborBtnElement = document.querySelector('#workLaborBtn');
const buyLaptopBtnElement = document.querySelector('#buyLaptopBtn');

const laptopSelectElement = document.querySelector('#laptopSelect');

const laptopImgElement = document.querySelector('#laptopImg');
const laptopTitleElement = document.querySelector('#laptopTitle');
const laptopDescriptionElement = document.querySelector('#laptopDescription');
const laptopFeaturesElement = document.querySelector('#laptopFeatures');
const laptopPriceElement = document.querySelector('#laptopPrice');

const baseURL = "https://noroff-komputer-store-api.herokuapp.com";
const balanceNOK = " Kr.";
let hasBankLoan = false;
let boughtLaptops = [];
let displayLaptops;

(async function() {
    try {
        const response = await fetch(`${baseURL}/computers`);
        const laptopsJson = await response.json();
        displayLaptops = [...laptopsJson];
    } catch(error) {
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
    const loanBalance = Number.parseInt(bankBalanceElement.innerHTML);
    const salaryBalance = Number.parseInt(workBalanceElement.innerHTML);

    bankBalanceElement.innerHTML = bankBalance + salaryBalance + balanceNOK;
    workBalanceElement.innerHTML = 0 + balanceNOK;
});

bankLoanBtnElement.addEventListener('click', e => {
    if (hasBankLoan) {
        alert("You may not have two loans at once! The initial loan should be paid back in full.")
        return;
    }

    const loanAmount = Number(window.prompt("Enter an amount: ", ""));
    const bankBalance = Number.parseInt(bankBalanceElement.innerHTML);

    if (loanAmount > bankBalance * 2) {
        alert("You cannot get a loan more than double of your bank balance!");
        return;
    }

    bankBalanceElement.innerHTML = bankBalance + loanAmount + balanceNOK;

    loanBalanceElement.innerHTML = loanAmount + balanceNOK;
    hasBankLoan = true;

    enableBankLoanBalance();
    enableRepayLoanBtn();
});

bankPayBtnElement.addEventListener('click', e => {
    if (!hasBankLoan) {
        alert("You don't have a loan to pay back...");
        return;
    }
    repayBankLoan();
});

buyLaptopBtnElement.addEventListener('click', e => {
    const bankBalance = Number.parseInt(bankBalanceElement.innerHTML);
    const laptopPrice = Number.parseInt(laptopPriceElement.innerHTML);
    const laptopTitle = laptopTitleElement.innerHTML;

    if (bankBalance < laptopPrice) return alert("You cannot afford a " + laptopTitle);

    bankBalanceElement.innerHTML = bankBalance - laptopPrice;

    boughtLaptops.push(laptopTitle);

    disableBoughtLaptopBtn(laptopTitle);

    return alert("You are now the owner of the new " + laptopTitle);
});

laptopSelectElement.addEventListener('change', e => {
    const laptop = displayLaptops.find(laptop => laptop.title === e.target.value);
    displayLaptop(laptop);
    disableBoughtLaptopBtn(laptop.title);
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

function disableBoughtLaptopBtn(laptopTitle) {
    const inStock = buyLaptopBtnElement;
    // disable buyLaptopBtn if laptop already bought, or else enable if not bought
    boughtLaptops.includes(laptopTitle) ? inStock.disabled = true : inStock.disabled = false;
}

function enableBankLoanBalance() {
    hasBankLoan ? bankLoanElement.innerHTML = "Bank Loan: " : bankLoanElement.innerHTML = " ";
}

function enableRepayLoanBtn() {
    hasBankLoan ? bankPayBtnElement.style.display = "block" : bankPayBtnElement.style.display = "none";
}

function repayBankLoan() {
    const payBalance = Number.parseInt(workBalanceElement.innerHTML);
    const loanBalance = Number.parseInt(loanBalanceElement.innerHTML);
    const bankBalance = Number.parseInt(bankBalanceElement.innerHTML);

    workBalanceElement.innerHTML = 0 + balanceNOK;

    loanBalanceElement.innerHTML = loanBalance - payBalance + balanceNOK;

    bankBalanceElement.innerHTML = bankBalance - payBalance + balanceNOK;

    if (payBalance > loanBalance) {
        const restLoanPayment = payBalance - loanBalance;

        bankBalanceElement.innerHTML = bankBalance + restLoanPayment + balanceNOK;

        hasBankLoan = false;
        loanBalanceElement.innerHTML = "";
        enableBankLoanBalance();
        enableRepayLoanBtn();
    } 
}
