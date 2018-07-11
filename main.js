

    /* Функция блокирует и разброкирует поле ввода, проводит проверку поля на наличие любых символов кроме цифр и удаляет их. */

(function workWithFieldPay (){
    var amauntPay = document.getElementById('amaunt_pay');
    var fieldPay = amauntPay.firstElementChild;
    var switchKey = amauntPay.lastElementChild;
    var buttom = document.getElementById('pay_button');
    var select = document.getElementById('select');
    
    /* Блокировка разблокировка поля ввода денежныхстердств */

    const blockUnlock = function(){
        fieldPay.hasAttribute('disabled')? fieldPay.removeAttribute('disabled') : fieldPay.setAttribute('disabled', 'disabled')
    }
    switchKey.addEventListener('click', blockUnlock );
    
    /* проверка на наличие букв в поле ввода денежных средств */

    const changeStr = function(){
        var verificationStr = fieldPay.value;
        temporaryStr =  verificationStr.replace(/[^1-9\.]/g, "");
        fieldPay.value = temporaryStr;

    };
    /* Font awesome по студенческой цене, 0 <i class="fas fa-ruble-sign"></i>, поэтому выглядит не очень (:
        
        Функция добавляет содержимое в кнопку*/
    const setPayBotton = function (){         
        switch(select.value){
            case "USD": buttom.innerHTML= `<i class="fas fa-lock"></i> Оплатить <i class="fas fa-dollar-sign"></i> ${fieldPay.value}`;
            break;
            case "EUR" : buttom.innerHTML= `<i class="fas fa-lock"></i> Оплатить <i class="fas fa-euro-sign"></i> ${fieldPay.value}`;
            break;
            case "RUB" : buttom.innerHTML= `<i class="fas fa-lock"></i> Оплатить <i class="fas fa-ruble-sign"></i> ${fieldPay.value}`;
            break;
        }        
    
    };
    select.addEventListener('click',setPayBotton);
    fieldPay.addEventListener('input',setPayBotton);
    fieldPay.addEventListener('input',changeStr );
   
}());

    /* Функция проводит проверку поля на наличие любых символов кроме латинских букв и удаляет их.
    а также возводит написаннге в верхний регистр */  

(function workWithFiledCardName(){
    var cardName = document.getElementById('card_name');
    var fieldCardName = cardName.firstElementChild;

    const changeStr = function(){
        var verificationStr = fieldCardName.value;
        temporaryStr = verificationStr.replace(/[^a-zA-Z\s]/gi, "");
        fieldCardName.value = temporaryStr.toUpperCase();
    }

    fieldCardName.addEventListener('input', changeStr);
}());

    /* функция котрая проверяет наличие любых символов кроме цифр, удаляет их.
    маска ввода номера карты
    а так же реализация иконки с символом платежной системы, в зависимости от номера карты*/

(function workWithFiledCardNamber(){
    var cardNamber = document.getElementById('card_namber');
    var fieldCardNamber = cardNamber.firstElementChild;

    const setIconTypeCard = function(){
        var val = this.value[0];

        switch(val){
            case '3' : fieldCardNamber.style.backgroundImage = "url('img/amexcard.png')";
            break;

            case '4' : fieldCardNamber.style.backgroundImage = "url('img/visacard.png')";
            break;

            case '5' : fieldCardNamber.style.backgroundImage = "url('img/mastercard.png')";
            break;

            case '6' : fieldCardNamber.style.backgroundImage = "url('img/discovercard.png')";
            break;

            default : fieldCardNamber.style.backgroundImage = "url('img/creditcard.png')";
            break;
        };

         
    };

    const setCursorPosition =  function(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
    }

    function mask(event) {
        var matrix = this.defaultValue,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
            def.length >= val.length && (val = def);
        matrix = matrix.replace(/[_\d]/g, function(a) {
            return val.charAt(i++) || "_"
        });
        this.value = matrix;
        i = matrix.lastIndexOf(val.substr(-1));
        i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
        setCursorPosition(i, this)
    }

    
    fieldCardNamber.addEventListener('focus', function(){
        this.setAttribute('value', '____ ____ ____ ____')   
    })


    fieldCardNamber.addEventListener("input", mask, false)
    fieldCardNamber.addEventListener('input',setIconTypeCard )
    fieldCardNamber.addEventListener('blur', function(){
        if(!isNaN(this.value)) {
            this.value = ''
        }
    })

}());

    /* Подсказка по нахождению защитного кода */

(function hintFindCVV(){
    var container = document.getElementById('container');
    var endTerm = document.getElementById('end_term');
    var cvvField = endTerm.lastElementChild;

    var hint1 = '<span>Секретный код находится с лицевой стороны</span>';
    var hint2 = '<span>Секретный код находится с тыльной стороны</span>';

    var hintField = document.createElement('div');
    hintField.id = "hint_field" ;
    endTerm.after(hintField);
    hintField.style.display = 'none';
    hintField.style.height = '0';
    
    /* добавляет подсказку при фокусе */

    const showHint = function(){
        var cardNamber = document.getElementById('card_namber');
        var fieldCardNamber = cardNamber.firstElementChild;
        var val = fieldCardNamber.value[0];

        /* плавное вплытие подсказки и модификация самой подсказки */

        const transitionStyle = function(){
            hintField.style.display = 'block';
            hintField.style.transition = 'height .5s';
            hintField.style.height = '18px';
            hintField.firstChild.style.fontSize = '1em'

            container.style.transition = 'height .5s';
            container.style.height = '420px';
        }

        
        switch(val){
            case '3' : hintField.innerHTML= `${hint1}` ;
            transitionStyle();
            break;

            case '4' : 
            case '5' : 
            case '6' : hintField.innerHTML= `${hint2}` ;
            transitionStyle();
            break;

            default : hintField.style.display = 'none';;

        }


    };

    /* удаляет подсказку при потери фокуса */

    const removeHint = function(){
        hintField.style.transition = 'height .5s';
        hintField.style.height = '0';        
        container.style.transition = 'height .5s';
        container.style.height = '400px';
        hintField.style.display = 'none';

    };

    const changeStr = function(){
        var verificationStr = cvvField.value;
        temporaryStr =  verificationStr.replace(/[^1-9]/g, "");
        cvvField.value = temporaryStr;

    };

    cvvField.addEventListener('focus', showHint);
    cvvField.addEventListener('blur', removeHint);
    cvvField.addEventListener('input',changeStr )


}());


/* функция создания <select> с датой срока службы карты */

(function createCardExperyDate(){
    var endTerm = document.getElementById('end_term');

    const createYearSelect = function(){
        var yearhSelect = document.createElement('select');
        yearhSelect.id = 'montg_select';
        var op  = document.createElement('option');
        op.innerHTML = "YY";
        yearhSelect.prepend(op)

        for(var i = 13; i<23; i++){
            var op  = document.createElement('option');
            op.innerHTML = i;
            yearhSelect.appendChild(op)
        } 

        endTerm.prepend(yearhSelect)
    };
    createYearSelect();

    const createMonthSelect = function(){
        var monthSelect = document.createElement('select');
        monthSelect.id = 'montg_select';
        var op  = document.createElement('option');
        op.innerHTML = "MM";
        monthSelect.prepend(op)

        for(var i = 1; i<13; i++){
            var op  = document.createElement('option');
            op.innerHTML = i;
            monthSelect.appendChild(op)
        } 

        endTerm.prepend(monthSelect)
    };
    createMonthSelect();

}())
