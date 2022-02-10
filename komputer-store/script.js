const bankBalanceElement = document.querySelector('#bankBalance')
const workBalanceElement = document.querySelector('#workBalance')

const bankLoanBtnElement = document.querySelector('#bankLoanBtn')
const bankPayBtnElement = document.querySelector('#bankPayBtn')
const workBankBtnElement = document.querySelector('#workBankBtn')
const workLaborBtnElement = document.querySelector('#workLaborBtn')

const balanceNOK = " Kr."

workLaborBtnElement.addEventListener('click', e => {
    const prevBalance = Number.parseInt(workBalanceElement.innerHTML);
    workBalanceElement.innerHTML = prevBalance + 100 + balanceNOK;
});

workBankBtnElement.addEventListener('click', e => {
    const bankBalance = Number.parseInt(bankBalanceElement.innerHTML);
    const salaryBalance = Number.parseInt(workBalanceElement.innerHTML);
    bankBalanceElement.innerHTML = bankBalance + salaryBalance + balanceNOK;
});

