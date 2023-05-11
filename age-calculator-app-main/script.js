function animateNumber(inputId, value, target) {
    let refreshIntervalId = setInterval(function() {
        if (value != target) {
            value++;
        } else {
            clearTimeout(refreshIntervalId);
        }
        $(inputId).text(value);
    }, 40);
}
let buttonStatus = true;
$("#calculator__button").click(function() {
    let dayDisplayValue = 0;
    let monthDisplayValue = 0;
    let yearDisplayValue = 0;
    let valid = true;
    let d1 =  $('#calculator__day').val();
    let m1 =  $('#calculator__month').val();
    let y1 =  $('#calculator__year').val();

    let date = new Date();
    let d2 = date.getDate();
    let m2 = 1 + date.getMonth();
    let y2 = date.getFullYear();
    let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    $(".calculator__input").each(function() {
        $(this).children(".calculator__error-message").removeClass("calculator__error-message--active");
        $(this).removeClass("calculator__input--error");
        let inputId = $(this).children("input").attr("id");
        switch (inputId) {
            case 'calculator__day':
                if (d1 === '') {
                    valid = false;
                    $(this).addClass("calculator__input--error");
                    $(this).children(".calculator__error-message").addClass("calculator__error-message--active");
                    $(this).children(".calculator__error-message").text("the field is required");
                } else if(!($.isNumeric(d1)) || !(d1 >= 1 && d1 <= 31)) {
                    valid = false;
                    $(this).addClass("calculator__input--error");
                    $(this).children(".calculator__error-message").addClass("calculator__error-message--active");
                    $(this).children(".calculator__error-message").text("Must be a valid day");
                }
                break;
            case 'calculator__month':
                if (m1 === '') {
                    valid = false;
                    $(this).addClass("calculator__input--error");
                    $(this).children(".calculator__error-message").addClass("calculator__error-message--active");
                    $(this).children(".calculator__error-message").text("the field is required");
                } else if (!($.isNumeric(m1)) || !(m1 >= 1 && m1 <= 12)) {
                    valid = false;
                    $(this).addClass("calculator__input--error");
                    $(this).children(".calculator__error-message").addClass("calculator__error-message--active");
                    $(this).children(".calculator__error-message").text("Must be a valid month");
                }
                break;
            case 'calculator__year':
                if (y1 === '') {
                    valid = false;
                    $(this).addClass("calculator__input--error");
                    $(this).children(".calculator__error-message").addClass("calculator__error-message--active");
                    $(this).children(".calculator__error-message").text("the field is required");
                } else if(!($.isNumeric(y1)) || !(y1 <= y2)) {
                    valid = false;
                    $(this).addClass("calculator__input--error");
                    $(this).children(".calculator__error-message").addClass("calculator__error-message--active");
                    $(this).children(".calculator__error-message").text("Must be in the past");
                }
                break;
        }
    });

    let checkDate = new Date(y1 + '-' + m1 + '-' + d1);
    if (valid && ((checkDate.getFullYear() != y1 || 1 + checkDate.getMonth() != m1 || checkDate.getDate() != d1) || (checkDate > date))) {
        $(".calculator__input").addClass("calculator__input--error");
        $(".calculator__input").first().children(".calculator__error-message").addClass("calculator__error-message--active");
        let errorMessage = (checkDate > date) ? 'Must be in the past' : 'Must be a valid date';
        $(".calculator__input").first().children(".calculator__error-message").text(errorMessage);
        valid = false;
    }

    if (valid) {
        if (d1 > d2) {
            d2 = d2 + month[m2 - 1];
            m2 = m2 - 1;
        }
        if (m1 > m2) {
            m2 = m2 + 12;
            y2 = y2 - 1;
        }
        let dayValue = d2 - d1;
        let monthValue = m2 - m1;
        let yearValue = y2 - y1;

        animateNumber('#calculator__day-value', dayDisplayValue, dayValue);
        (dayValue > 1) ?  $("#calculator__day-label").text("days") : $("#calculator__day-label").text("day");
        animateNumber('#calculator__month-value', monthDisplayValue, monthValue);
        (monthValue > 1) ?  $("#calculator__month-label").text("months") : $("#calculator__month-label").text("month");
        animateNumber('#calculator__year-value', yearDisplayValue, yearValue);
        (yearValue > 1) ?  $("#calculator__year-label").text("years") : $("#calculator__year-label").text("year");
    } else {
        $('#calculator__day-value').text("--");
        $("#calculator__day-label").text("days");
        $('#calculator__month-value').text("--");
        $("#calculator__month-label").text("months");
        $('#calculator__year-value').text("--");
        $("#calculator__year-label").text("years");
    }
});