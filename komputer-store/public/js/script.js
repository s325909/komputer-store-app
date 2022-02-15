// DOM variables 
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

// Global variables
const baseURL = "https://noroff-komputer-store-api.herokuapp.com";
const balanceNOK = " Kr.";
let hasBankLoan = false;
let boughtLaptops = [];
let displayLaptops;

// Init async function to fetch computers from API
(async function() {
    try {
        const response = await fetch(`${baseURL}/computers`);
        const laptopsJson = await response.json();
        // Add computers to global variable
        displayLaptops = [...laptopsJson];
    } catch(error) {
        console.log(error.message);
    }
    // Populate select dropdown and display the initial computer
    addLaptopSelectOptions();
    displayStoreLaptop(displayLaptops[0]);
})();

// Adding Event Listeners to buttons

workLaborBtnElement.addEventListener('click', e => {
    const prevBalance = Number.parseInt(workBalanceElement.innerHTML);
    workBalanceElement.innerHTML = prevBalance + 100 + balanceNOK;
});

workBankBtnElement.addEventListener('click', e => {
    const bankBalance = Number.parseInt(bankBalanceElement.innerHTML);
    const loanBalance = Number.parseInt(bankBalanceElement.innerHTML);
    let salaryBalance = Number.parseInt(workBalanceElement.innerHTML);

    if (hasBankLoan) {
        // payAmount set to 10% of salary to pay loan
        const payAmount = salaryBalance * 0.1;
        repayBankLoan(payAmount);
        // bank remaining 90% of salary
        salaryBalance = salaryBalance * 0.9;
    }

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
    const payBalance = Number.parseInt(workBalanceElement.innerHTML);
    repayBankLoan(payBalance);
});

buyLaptopBtnElement.addEventListener('click', e => {
    const bankBalance = Number.parseInt(bankBalanceElement.innerHTML);
    const laptopPrice = Number.parseInt(laptopPriceElement.innerHTML);
    const laptopTitle = laptopTitleElement.innerHTML;

    if (bankBalance < laptopPrice) return alert("You cannot afford a " + laptopTitle);

    bankBalanceElement.innerHTML = bankBalance - laptopPrice + balanceNOK;

    boughtLaptops.push(laptopTitle);

    disableBoughtLaptopBtn(laptopTitle);

    return alert("You are now the owner of the new " + laptopTitle);
});

laptopSelectElement.addEventListener('change', e => {
    const laptop = displayLaptops.find(laptop => laptop.title === e.target.value);
    displayStoreLaptop(laptop);
    disableBoughtLaptopBtn(laptop.title);
});

// Functions

function addLaptopSelectOptions() {
    for (const laptop of displayLaptops) {
        const laptopOption = document.createElement('option');
        console.log(laptop.title);
        laptopOption.text = laptop.title;
        laptopSelectElement.append(laptopOption);
    }
}

function displayStoreLaptop(laptop) {
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
    // Bank Loan string if has loan, or else empty string
    hasBankLoan ? bankLoanElement.innerHTML = "Bank Loan: " : bankLoanElement.innerHTML = " ";
}

function enableRepayLoanBtn() {
    // show Pay loan btn if has loan, or else no button displayed
    hasBankLoan ? bankPayBtnElement.style.display = "block" : bankPayBtnElement.style.display = "none";
}

function repayBankLoan(payAmount) {
    const loanBalance = Number.parseInt(loanBalanceElement.innerHTML);
    const bankBalance = Number.parseInt(bankBalanceElement.innerHTML);
    
    // checks if payAmount is greater than the loanBalance
    restBankLoanSettlement(payAmount, loanBalance);

    if (hasBankLoan) {     
        workBalanceElement.innerHTML = 0 + balanceNOK;
        loanBalanceElement.innerHTML = loanBalance - payAmount + balanceNOK;
        bankBalanceElement.innerHTML = bankBalance - payAmount + balanceNOK;
    }
}

function restBankLoanSettlement(payAmount, loanBalance) {
    if (payAmount > loanBalance) {
        const bankBalance = Number.parseInt(bankBalanceElement.innerHTML);
        const deductedBankBalance = bankBalance - loanBalance;
        const restLoanPayment = payAmount - loanBalance;

        bankBalanceElement.innerHTML = deductedBankBalance + restLoanPayment + balanceNOK;

        hasBankLoan = false;
        loanBalanceElement.innerHTML = "";
        enableBankLoanBalance();
        enableRepayLoanBtn();
    } 
}