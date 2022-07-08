



var digits = "0123456789";
var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz"
var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var whitespace = " \t\n\r";
var decimalPointDelimiter = "."


var iDay = "O dia da data deve estar entre 1 e 31.  Por favor corrija."
var iMonth = "O mês da data deve estar 1 e 12.  Por favor corrija."
var icpfcgc = "O CPF/CNPJ é inválido. Por favor corrija."
var iYear = "O ano deve ter 2 ou 4 dígitos.  Por favor corrija."
var iDatePrefix = ""
var iDateSuffix = " não é uma data válida.  Por favor corrija."
var pEntryPrompt = "Por favor entre um "
var pDay = "número de dia entre 1 e 31."
var pMonth = "número de mês entre 1 e 12."
var pYear = "número de ano com 2 ou 4 dígitos."
var defaultEmptyOK = false


function makeArray(n) {
    //*** BUG: If I put this line in, I get two error messages:
    //(1) Window.length can't be set by assignment
    //(2) daysInMonth has no property indexed by 4
    //If I leave it out, the code works fine.
    //   this.length = n;
    for (var i = 1; i <= n; i++) {
        this[i] = 0
    }
    return this
}



var daysInMonth = makeArray(12);
daysInMonth[1] = 31;
daysInMonth[2] = 29;   // must programmatically check this
daysInMonth[3] = 31;
daysInMonth[4] = 30;
daysInMonth[5] = 31;
daysInMonth[6] = 30;
daysInMonth[7] = 31;
daysInMonth[8] = 31;
daysInMonth[9] = 30;
daysInMonth[10] = 31;
daysInMonth[11] = 30;
daysInMonth[12] = 31;



function isEmpty(s) {
    return ((s == null) || (s.length == 0))
}


function isWhitespace(s) {
    var i;

    // Is s empty?
    if (isEmpty(s)) return true;

    for (i = 0; i < s.length; i++) {
        // Check that current character isn't whitespace.
        var c = s.charAt(i);

        if (whitespace.indexOf(c) == -1) return false;
    }

    // All characters are whitespace.
    return true;
}



// Removes all characters which appear in string bag from string s.

function stripCharsInBag(s, bag) {
    var i;
    var returnString = "";

    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.

    for (i = 0; i < s.length; i++) {
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }

    return returnString;
}

function stripCharsNotInBag(s, bag) {
    var i;
    var returnString = "";

    // Search through string's characters one by one.
    // If character is in bag, append to returnString.

    for (i = 0; i < s.length; i++) {
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
        if (bag.indexOf(c) != -1) returnString += c;
    }

    return returnString;
}


function stripWhitespace(s) {
    return stripCharsInBag(s, whitespace)
}


function charInString(c, s) {
    for (i = 0; i < s.length; i++) {
        if (s.charAt(i) == c) return true;
    }
    return false
}


function stripInitialWhitespace(s) {
    var i = 0;

    while ((i < s.length) && charInString(s.charAt(i), whitespace))
        i++;

    return s.substring(i, s.length);
}

function isLetter(c) {
    return (((c >= "a") && (c <= "z")) || ((c >= "A") && (c <= "Z")))
}

function isDigit(c) {
    return ((c >= "0") && (c <= "9"))
}

function isLetterOrDigit(c) {
    return (isLetter(c) || isDigit(c))
}

function isInteger(s) {
    var i;

    if (isEmpty(s))
        if (isInteger.arguments.length == 1) return defaultEmptyOK;
        else return (isInteger.arguments[1] == true);


    for (i = 0; i < s.length; i++) {
        // Check that current character is number.
        var c = s.charAt(i);

        if (!isDigit(c)) return false;
    }

    // All characters are numbers.
    return true;
}


function isSignedInteger(s) {
    if (isEmpty(s))
        if (isSignedInteger.arguments.length == 1) return defaultEmptyOK;
        else return (isSignedInteger.arguments[1] == true);

    else {
        var startPos = 0;
        var secondArg = defaultEmptyOK;

        if (isSignedInteger.arguments.length > 1)
            secondArg = isSignedInteger.arguments[1];

        // skip leading + or -
        if ((s.charAt(0) == "-") || (s.charAt(0) == "+"))
            startPos = 1;
        return (isInteger(s.substring(startPos, s.length), secondArg))
    }
}

function isPositiveInteger(s) {
    var secondArg = defaultEmptyOK;

    if (isPositiveInteger.arguments.length > 1)
        secondArg = isPositiveInteger.arguments[1];


    return (isSignedInteger(s, secondArg)
        && ((isEmpty(s) && secondArg) || (parseInt(s, 10) > 0)));
}

function isNonnegativeInteger(s) {
    var secondArg = defaultEmptyOK;

    if (isNonnegativeInteger.arguments.length > 1)
        secondArg = isNonnegativeInteger.arguments[1];

    return (isSignedInteger(s, secondArg)
        && ((isEmpty(s) && secondArg) || (parseInt(s, 10) >= 0)));
}


function isNegativeInteger(s) {
    var secondArg = defaultEmptyOK;

    if (isNegativeInteger.arguments.length > 1)
        secondArg = isNegativeInteger.arguments[1];

    // The next line is a bit byzantine.  What it means is:
    // a) s must be a signed integer, AND
    // b) one of the following must be true:
    //    i)  s is empty and we are supposed to return true for
    //        empty strings
    //    ii) this is a negative, not positive, number

    return (isSignedInteger(s, secondArg)
        && ((isEmpty(s) && secondArg) || (parseInt(s, 10) < 0)));
}


function isNonpositiveInteger(s) {
    var secondArg = defaultEmptyOK;

    if (isNonpositiveInteger.arguments.length > 1)
        secondArg = isNonpositiveInteger.arguments[1];

    // The next line is a bit byzantine.  What it means is:
    // a) s must be a signed integer, AND
    // b) one of the following must be true:
    //    i)  s is empty and we are supposed to return true for
    //        empty strings
    //    ii) this is a number <= 0

    return (isSignedInteger(s, secondArg)
        && ((isEmpty(s) && secondArg) || (parseInt(s, 10) <= 0)));
}


function isFloat(s) {
    var i;
    var seenDecimalPoint = false;

    if (isEmpty(s))
        if (isFloat.arguments.length == 1) return defaultEmptyOK;
        else return (isFloat.arguments[1] == true);

    if (s == decimalPointDelimiter) return false;

    for (i = 0; i < s.length; i++) {
        // Check that current character is number.
        var c = s.charAt(i);

        if ((c == decimalPointDelimiter) && !seenDecimalPoint) seenDecimalPoint = true;
        else if (!isDigit(c)) return false;
    }

    // All characters are numbers.
    return true;
}


function isSignedFloat(s) {
    if (isEmpty(s))
        if (isSignedFloat.arguments.length == 1) return defaultEmptyOK;
        else return (isSignedFloat.arguments[1] == true);

    else {
        var startPos = 0;
        var secondArg = defaultEmptyOK;

        if (isSignedFloat.arguments.length > 1)
            secondArg = isSignedFloat.arguments[1];

        // skip leading + or -
        if ((s.charAt(0) == "-") || (s.charAt(0) == "+"))
            startPos = 1;
        return (isFloat(s.substring(startPos, s.length), secondArg))
    }
}

function isAlphabetic(s) {
    var i;

    if (isEmpty(s))
        if (isAlphabetic.arguments.length == 1) return defaultEmptyOK;
        else return (isAlphabetic.arguments[1] == true);

    // Search through string's characters one by one
    // until we find a non-alphabetic character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++) {
        // Check that current character is letter.
        var c = s.charAt(i);

        if (!isLetter(c))
            return false;
    }

    // All characters are letters.
    return true;
}


function isAlphanumeric(s) {
    var i;

    if (isEmpty(s))
        if (isAlphanumeric.arguments.length == 1) return defaultEmptyOK;
        else return (isAlphanumeric.arguments[1] == true);

    // Search through string's characters one by one
    // until we find a non-alphanumeric character.
    // When we do, return false; if we don't, return true.

    for (i = 0; i < s.length; i++) {
        // Check that current character is number or letter.
        var c = s.charAt(i);

        if (!(isLetter(c) || isDigit(c)))
            return false;
    }

    // All characters are numbers or letters.
    return true;
}



function reformat(s) {
    var arg;
    var sPos = 0;
    var resultString = "";

    for (var i = 1; i < reformat.arguments.length; i++) {
        arg = reformat.arguments[i];
        if (i % 2 == 1) resultString += arg;
        else {
            resultString += s.substring(sPos, sPos + arg);
            sPos += arg;
        }
    }
    return resultString;
}

function isIntegerInRange(s, a, b) {
    if (isEmpty(s))
        if (isIntegerInRange.arguments.length == 1) return defaultEmptyOK;
        else return (isIntegerInRange.arguments[1] == true);

    // Catch non-integer strings to avoid creating a NaN below,
    // which isn't available on JavaScript 1.0 for Windows.
    if (!isInteger(s, false)) return false;

    // Now, explicitly change the type to integer via parseInt
    // so that the comparison code below will work both on 
    // JavaScript 1.2 (which typechecks in equality comparisons)
    // and JavaScript 1.1 and before (which doesn't).
    var num = parseInt(s, 10);
    return ((num >= a) && (num <= b));
}

function CompletaString(s, i) {
    var t, u
    u = new String()

    u = s

    if (u.length > i) {

        t = u.substring(0, i)
    }
    else {
        t = u
        for (j = u.length; j < i; j++) {
            t = t + " "
        }
    }
    return t
}

function CompletaNumero2(s, i) {
    var t, u
    u = new String(s)


    t = ""


    if (u.length > i) {

        t = u.substring(0, i)
    }
    else {
        t = u
        for (j = u.length; j < i; j++) {
            t = "0" + t
        }
    }

    return t
}





function checkRadio(r) {
    for (var i = 0; i < r.length; i++) {
        if (r[i].checked) {
            return true
        }
    }
    return false
}

function RadioValue(r) {
    for (var i = 0; i < r.length; i++) {
        if (r[i].checked) {
            return r[i].value
        }
    }
    return ""
}

function checkInput(i) {

    if (i.value == "" || isWhitespace(i.value)) {

        return false
    }
    else {
        return true
    }


}

function Limpar() {
    document.form1.periodo.value = ""
    document.form1.juros.value = ""
    document.form1.parcela.value = ""
    document.form1.montante.value = ""
}



function Calcular(opcao) {
    var s
    if (!checkInput(document.form1.periodo)) {
        if (!checkInput(document.form1.juros) ||
            !checkInput(document.form1.parcela) ||
            !checkInput(document.form1.montante)) {
            alert("Preencha 3 valores para calcular o 4º.")
            return
        }
        opcao = 1
    } else
        if (!checkInput(document.form1.juros)) {
            if (!checkInput(document.form1.periodo) ||
                !checkInput(document.form1.parcela) ||
                !checkInput(document.form1.montante)) {
                alert("Preencha 3 valores para calcular o 4º.")
                return
            }
            opcao = 2
        } else
            if (!checkInput(document.form1.parcela)) {
                if (!checkInput(document.form1.periodo) ||
                    !checkInput(document.form1.juros) ||
                    !checkInput(document.form1.montante)) {
                    alert("Preencha 3 valores para calcular o 4º.")
                    return
                }
                opcao = 3
            } else
                if (!checkInput(document.form1.montante)) {
                    if (!checkInput(document.form1.juros) ||
                        !checkInput(document.form1.parcela) ||
                        !checkInput(document.form1.periodo)) {
                        alert("Preencha 3 valores para calcular o 4º.")
                        return
                    }
                    opcao = 4
                } else {
                    alert("Preencha apenas 3 valores para calcular o 4º.")
                    return
                }

    if (opcao != 1) {
        s = document.form1.periodo.value
        s = s.replace(",", ".")
        if (!isFloat(s)) {
            alert("Período deve ser um valor inteiro.")
            return
        }

        per_int = parseFloat(s)
    }

    if (opcao != 2) {

        s = document.form1.juros.value
        s = s.replace(",", ".")

        if (!isFloat(s)) {
            alert("Taxa de Juros deve ser um valor númerico, tendo a vírgula(,) como delimitador da parte fracionária.")
            return
        }

        juros_float = parseFloat(s) / 100


    }

    if (opcao != 3) {
        s = document.form1.parcela.value
        s = s.replace(",", ".")
        if (!isFloat(s)) {
            alert("Valor da prestação deve ser um valor númerico, tendo a vírgula(,) como delimitador dos centavos.")
            return
        }

        parcela_float = parseFloat(s)


    }

    if (opcao != 4) {
        s = document.form1.montante.value
        s = s.replace(",", ".")

        if (!isFloat(s)) {
            alert("Valor do Financiamento deve ser um valor númerico maior que zero, tendo a vírgula(,) como delimitador dos centavos.")
            return
        }

        montante_float = parseFloat(s)


    }

    if (opcao == 1) {

        per_int = Math.log(1 - (montante_float * juros_float / parcela_float)) / Math.log(1 / (1 + juros_float))
        per_int = Math.round(per_int * 100) / 100

        var s = String(per_int)
        i = s.indexOf(".")
        if (i != -1) {
            s = s.substring(0, i) + "," + s.substring(i + 1, s.length)

        }
        document.form1.periodo.value = s
    }

    if (opcao == 2) {
        juros_inicial = parseFloat("-1")
        juros_final = parseFloat("99999")
        suposto_juros = parseFloat("0")
        suposto_parcela = parseFloat("0")
        var cont = 1
        var achou = false
        while (true) {
            suposto_juros = (juros_final + juros_inicial) / 2
            suposto_parcela = (montante_float * suposto_juros) / (1 - Math.pow(1 / (1 + suposto_juros), per_int))
            suposta_diferenca = Math.abs(parcela_float - suposto_parcela)
            if (suposta_diferenca > 0.000000001) {
                if (suposto_parcela > parcela_float) {
                    juros_final = suposto_juros
                }
                else {
                    juros_inicial = suposto_juros
                }
            }
            else {
                achou = true
                break
            }
            if (cont > 5000) {
                break
            }
            cont++
        }
        if (achou == false) {
            document.form1.juros.value = "NaN"
        }
        else {
            if (suposto_juros != -100) {
                suposto_juros = suposto_juros * 100
            }
            juros_float = Math.round(suposto_juros * 100000) / 100000
            var s = String(juros_float)
            i = s.indexOf(".")
            if (i != -1) {
                s = s.substring(0, i) + "," + s.substring(i + 1, s.length)
            }
            document.form1.juros.value = s
            return
        }
    }

    if (opcao == 3) {
        parcela_float = (montante_float * juros_float) / (1 - Math.pow(1 / (1 + juros_float), per_int))
        parcela_float = Math.round(parcela_float * 100) / 100
        var s = String(parcela_float)
        i = s.indexOf(".")
        if (i != -1) {
            s = s.substring(0, i) + "," + s.substring(i + 1, s.length)
        }
        document.form1.parcela.value = s
        return
    }

    if (opcao == 4) {
        montante_float = (parcela_float * (1 - Math.pow(1 / (1 + juros_float), per_int)) / juros_float)
        montante_float = Math.round(montante_float * 100) / 100
        var s = String(montante_float)
        i = s.indexOf(".")
        if (i != -1) {
            s = s.substring(0, i) + "," + s.substring(i + 1, s.length)
        }
        document.form1.montante.value = s
        return
    }
}


