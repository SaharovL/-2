// converter.js
document.getElementById('convert').addEventListener('click', async () => {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').textContent = 'Введите корректную сумму!';
        return;
    }

    try {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }
        const data = await response.json();
        const rates = {
            RUB: 1,
            USD: data.Valute.USD.Value,
            EUR: data.Valute.EUR.Value,
            CNY: data.Valute.CNY.Value,
            GBP: data.Valute.GBP.Value,
            TRY: data.Valute.TRY.Value,
            KZT: data.Valute.KZT.Value / 100 // Курс на 100 тенге
        };

        const result = (amount / rates[toCurrency]) * rates[fromCurrency];
        document.getElementById('result').textContent = 
            `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        document.getElementById('result').textContent = 'Не удалось выполнить конвертацию.';
        console.error(error);
    }
});
