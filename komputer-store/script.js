const bankBalanceElement = document.querySelector('#bankBalance')
const workBalanceElement = document.querySelector('#workBalance')

const bankLoanBtnElement = document.querySelector('#bankLoanBtn')
const bankPayBtnElement = document.querySelector('#bankPayBtn')
const workBankBtnElement = document.querySelector('#workBankBtn')
const workLaborBtnElement = document.querySelector('#workLaborBtn')

const laptopSelectElement = document.querySelector('#laptopSelect')

let laptops;
let boughtLaptops;
let hasLoan = false;
const balanceNOK = " Kr.";

(async function() {
    const URL = "https://noroff-komputer-store-api.herokuapp.com/computers";;


    try {
        const response = await fetch(URL);
        const laptopsJson = await response.json();

        addLaptopSelectOptions(laptopsJson);
        
    }
    catch(error) {
        console.log(error.message);
    }
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
        alert("Rejected! You cannot get a loan more than double of your bank balance!")
        return;
    }

    // const eligible = checkLoanRequirements(loanAmount, bankBalance)

    bankBalanceElement.innerHTML = bankBalance + loanAmount + balanceNOK;
    hasLoan = true;
});

bankPayBtnElement.addEventListener('click', e => {
    if (!hasLoan) {
        alert("You don't have a loan to pay back...")
        return;
    }

    const loanAmount = Number(window.prompt("Enter an amount: ", ""));
    const bankBalance = Number.parseInt(bankBalanceElement.innerHTML);

    if (loanAmount > bankBalance * 2) {
        alert("Rejected! You cannot get a loan more than double of your bank balance!")
        return;
    }

    // const eligible = checkLoanRequirements(loanAmount, bankBalance)

    bankBalanceElement.innerHTML = loanAmount - bankBalance + balanceNOK;
    hasLoan = true;
});

function addLaptopSelectOptions(laptopsJson) {
    for (const laptop of laptopsJson) {
        const laptopOption = document.createElement('option')
        console.log(laptop.title);
        laptopOption.text = laptop.title;
        laptopSelectElement.append(laptopOption);
    }
}

