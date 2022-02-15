# komputer-store-app
The Komputer Store is a dynamic webpage built using “vanilla” JavaScript.

## Overview
A simple webpage application of a Komputer Store in which you can buy komputers, but also work for money and take out loans from the bank. The webpage is structured and designed using HTML and CSS, and uses plain JavaScript to build the following areas which the user can interact with:
  * **The Bank** - an area where you will store funds and make bank loans 
  * **Work** - an area to increase your earnings and deposit cash into your bank balance
  * **Laptops** - an area to select and display information about the merchandise

## Detailed Description
The following sub-sections describes the above-mentioned areas more in-depth.

### The Bank
The first area, namely _“**Joe Banker**”_, shows a **Bank balance** in your currency (NOK). This is the amount available for you to buy a laptop. 

In the _“**Bank**”_, you have a _“**Get a loan**”_ button, which will attempt to get a loan from the bank. When the button is clicked, it shows a _“Prompt”_ popup box that allows you to enter an amount. Some constraints include not being able to get a loan more than double of your bank balance, or being able to get more than one bank loan before the initial loan is paid back in full. An additional **Loan balance** showing the outstanding Loan, will appear underneath the **Bank balance**, and is only visible after taking a loan. This amount reduces as the loan is paid back.

### Work
The second area, simply named _“**Work**”_, shows the pay of your current Pay/Salary amount in your currency. Moreover, shows how much money you have earned by 
“working”. This money is NOT part of your bank balance.

Beneath the Pay/salary balance, you have two buttons called _**Bank**_ and _**Work**_. You also have a _**Repay Loan**_ button, which only appears once you have a loan. Upon clicking this button, the full value of your current Pay amount will go towards the outstanding loan and NOT your bank account. Any remaining funds after paying the loan will however be transferred to your bank account.

The above-mentioned _**Bank**_ button, transfers the money from your **Pay balance** to your **Bank balance**, and resets your pay/salary once you transfer. Some constraints include that if you have a loan, 10% of your salary will first be deducted and transferred to the outstanding Loan amount. The remaining balance after the 10% deduction, however, will be transferred to your bank account. 

The _**Work**_ button, on the other hand, is how you work and earn money to buy laptops. The work button increases your **Pay balance** at a rate of 100 on each click. 

### Laptops
The third and final area, named _“**Laptops**”_, has 2 parts. Firstly, a **laptop selection area**, which uses a select box to show the available computers. The feature list of the selected laptop is also displayed here. Changing a laptop, updates the user interface with the information for that selected laptop. Then you have an **info section area** bellow, where the image, name, description as well as the price of the laptop is displayed. 

#### Laptop API
The data for the laptops is provided via a RESTful API. 

The endpoint for the API is: [https://noroff-komputer-store-api.herokuapp.com/computers](url)

The path to the image of a laptop can be found in the response by using the base URL WITHOUT the 
computers path:

e.g., [https://noroff-komputer-store-api.herokuapp.com/assets/images/1.png](url)

#### Buy Now button
The _**Buy Now**_ button is the final action of the website, and is located besides the **info section area**. This button will attempt to _“Buy”_ a laptop and validate whether the **bank balance** is sufficient to purchase the selected laptop. If you do not have enough money in the _“Bank”_, a message is shown that you cannot afford the laptop. When you have sufficient “Money” in the account, the amount will be deducted from the bank and you receive a message that you are now the owner of the new laptop!

## Getting Started

### Tools installed 

* Visual Studio Code
  
## Author and Developer

Jasotharan Cyril 
