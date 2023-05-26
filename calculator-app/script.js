let theme = 1;
let result = 0;
let numbers1 = null;
let numbers2 = null;
let operator = null;
let value = null;

let prefersColorScheme = localStorage.getItem('prefers-color-scheme');
if (prefersColorScheme) {
    switch (prefersColorScheme) {
        case '2':
            theme = 2;
            $('main').removeClass('calculator__theme1').addClass('calculator__theme2');
            break;
        case '3':
            theme = 3;
            $('main').removeClass('calculator__theme1').addClass('calculator__theme3');
            break;
    }
}

$('#header__theme-toggle-button').click(function () {
    switch (theme) {
        case 1:
            theme = 2;
            localStorage.setItem('prefers-color-scheme', '2');
            $('main').removeClass('calculator__theme1').addClass('calculator__theme2');
            break;
        case 2:
            theme = 3;
            localStorage.setItem('prefers-color-scheme', '3');
            $('main').removeClass('calculator__theme2').addClass('calculator__theme3');
            break;
        case 3:
            theme = 1;
            localStorage.setItem('prefers-color-scheme', '1');
            $('main').removeClass('calculator__theme3').addClass('calculator__theme1');
            break;
    }
});

function pushButton(button) {
    switch (button) {
        case '+':
        case '-':
        case '/':
        case '*':
            if (numbers1  !== null && numbers2  !== null) {
                pushButton('=');
            }
            operator = button;
            result = 0;
            break;
        case '=':
            let finalValue;
            switch (operator) {
                case '+':
                    finalValue = (parseFloat(numbers1) + parseFloat(numbers2));
                    break;
                case '-':
                    finalValue = (parseFloat(numbers1) - parseFloat(numbers2));
                    break;
                case '/':
                    finalValue = (parseFloat(numbers1) / parseFloat(numbers2));
                    break;
                case '*':
                    finalValue = (parseFloat(numbers1) * parseFloat(numbers2));
                    break;
                default:
                    finalValue = parseFloat(numbers1);
                    break;
            }
            operator = null;
            numbers1 = finalValue;
            numbers2 = null;
            result = 0;
            $('#calculator__result').text(finalValue.toString().replace('.', ',').substring(0, 10));
            break;
        case 'reset':
            operator = null;
            numbers1 = null;
            numbers2 = null;
            result = 0;
            $('#calculator__result').text(0);
            break;
        case 'del':
            if (result != 0) {
                value = $('#calculator__result').text();
                value = value.substring(0,value.length-1) === '' ? '0' : value.substring(0,value.length-1);
                $('#calculator__result').text(value);
                result = value;
                if (operator) {
                    numbers2 = parseInt(value.replace(",", '.'));
                } else {
                    numbers1 = parseInt(value.replace(",", '.'));
                }
            }
            break;
        case ',':
            value = $('#calculator__result').text();
            if (!value.includes(",") && value.length < 10) {
                $('#calculator__result').text(value+',');
                result = value+',';
                if (operator) {
                    numbers2 = value.replace(",", '.');
                } else {
                    numbers1 = value.replace(",", '.');
                }
            }
            break;
        default:
            if (result == 0) {
                $('#calculator__result').text(button);
                result = button;
            } else {
                let value = $('#calculator__result').text();
                if (value.length < 10) {
                    $('#calculator__result').text(value+button);
                }
            }
            if (operator) {
                numbers2 = $('#calculator__result').text().replace(",", '.');
            } else {
                numbers1 = $('#calculator__result').text().replace(",", '.');
            }
            break;
    }
}

$('.calculator__button').mousedown(function () {
   $(this).addClass('calculator__button-active');
});
$('body').mouseup(function () {
    $('.calculator__button').removeClass('calculator__button-active');
});