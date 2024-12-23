// API Stuff
const apiKey = "oops can't share this"
const apiUrl = 'https://v6.exchangerate-api.com/v6'


// Variables
const amount = document.getElementById('amount')

const currencyOne = document.getElementById('currency-one')
const swap = document.getElementById('swap-btn')
const currencyTwo = document.getElementById('currency-two')

const exchangeRatesBtn = document.getElementById('rates-btn')

const errorMessage = document.getElementById('error')
const rateForOne = document.getElementById('rate-for-one')
const amountIn = document.getElementById('amount-in')
const amountOut = document.getElementById('amount-out')


async function convertor(val) {

    currency_one = currencyOne.value 
    currency_two = currencyTwo.value
    amount_value = amount.value

    const response = await fetch(apiUrl + `/${apiKey}/latest/${currency_one}`)
    var data = await response.json()
    console.log(data)

    // acceess the conversion rates 
    rates = data.conversion_rates[currency_two]
    rateForOne.innerText = `1 ${currency_one} = ${rates} ${currency_two}`



    // Messages dissapear as Soon as person starts typing amount
    amount.addEventListener('input', ()=>{ 
        errorMessage.style.display = 'none';
        rateForOne.style.display = 'none'
    })

    // amount validator
    if (val == ''){ 
        errorMessage.style.display = 'block'
    } else if(isNaN(Number(val))) {
        errorMessage.style.display = 'block'
    } else{ 
        rateForOne.style.display = 'block'
    };

    // update amount in & amount out
    amountIn.innerHTML = `${val} ${currency_one}`
    amountOut.innerHTML = `${(Number(val)*rates).toFixed(2)} ${currency_two}`
}

// swap functionality
swap.addEventListener('click', () => {
    const tempCurrency = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = tempCurrency;
    convertor(amount.value);
});

// main event listener
exchangeRatesBtn.addEventListener('click', function showRate(){ 
    convertor(amount.value)
})
