const calculator = {
    hasError: false, // پرچم وضعیت خطا

    getDisplay: function () {
        return document.getElementById('display');
    },
    getNumber: function () {
        const buttons = document.querySelectorAll('.buttons button');
        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const value = button.innerText; // مقدار دکمه کلیک شده
                const display = this.getDisplay();
                
                if (value === '=') { // اگر دکمه '=' فشار داده شد
                    const result = this.evalExpression(display.value);
                    display.value = result; // نمایش نتیجه در دیسپلی
                } else if (value === 'AC') { // اگر دکمه 'AC' فشار داده شد
                    display.value = ''; // پاک کردن نمایش
                    this.hasError = false; // ریست وضعیت خطا
                } else if (value === '←') { // اگر دکمه حذف فشار داده شد
                    display.value = display.value.slice(0, -1); // حذف آخرین کاراکتر
                } else if (!this.hasError && this.isValidInput(display.value, value)) {
                    display.value += value; // اگر ورودی معتبر بود و خطا نیست، مقدار را به دیسپلی اضافه کن
                }
            });
        });

        // اضافه کردن رویداد keydown
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            const display = this.getDisplay();
            if (!this.hasError && this.isValidInput(display.value, key)) {
                display.value += key; // اگر خطا نیست و ورودی معتبر است، مقدار را به دیسپلی اضافه کن
            } else if (key === 'Enter') { // اگر کلید Enter فشرده شد
                const result = this.evalExpression(display.value);
                display.value = result; // نمایش نتیجه در دیسپلی
            } else if (key === 'Backspace') { // اگر کلید Backspace فشرده شد
                display.value = display.value.slice(0, -1); // حذف آخرین کاراکتر
            }
        });
    },
    isValidInput: function (currentValue, input) {
        // الگوی Regex برای بررسی ورودی
        const validPattern = /^[0-9+\-*/.]$/; // فقط اعداد، عملگرها و نقطه مجاز
        const isOperator = /[+\-*/]/.test(input);
        const hasDecimalPoint = currentValue.includes('.');

        // اگر ورودی یک عملگر باشد، بررسی می‌کنیم که آیا ورودی قبلی هم عملگر نیست
        if (isOperator) {
            return validPattern.test(input) && !/[+\-*/]$/.test(currentValue);
        }
        
        if (input === '.') {
            // بررسی می‌کند که آیا در آخرین عدد وارد شده (بعد از عملگر آخر) نقطه‌ای وجود دارد یا نه
            const lastNumber = currentValue.split(/[+\-*/]/).pop(); // آخرین عدد را از کل عبارت جدا می‌کند
            return !lastNumber.includes('.'); // اگر در این عدد نقطه‌ای نباشد، اجازه ورود می‌دهد
        }
        

        // اگر ورودی عدد باشد
        return validPattern.test(input);
    },
    evalExpression: function (expression) {
        try {
            const result = eval(expression); // محاسبه عبارت
            this.hasError = false; // اگر محاسبه موفقیت‌آمیز بود، وضعیت خطا را ریست کن
            return result;
        } catch (error) {
            this.hasError = true; // اگر خطا رخ داد، وضعیت خطا را فعال کن
            return 'ERROR'; // نمایش خطا
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    calculator.getNumber();
});
