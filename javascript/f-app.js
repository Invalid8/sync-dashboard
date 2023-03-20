let value1, value2, value3;
const checks = [0, 0, 0]
$(document).ready(function () {
    $("#email").bind("input", () => {
        outlineValidated(ValidateEmail($("#email")[0]), $("#email")[0]);
        ValidateEmail($("#email")[0]) ? checks[0] = 1 : checks[0] = 0
    });
    $("#username").bind("input", () => {
        determineError(1);
        setModaLenght(value1, "username", 1);
        checkForDigit(value2, "username");
        checkAllTrue(value1, value2) ? checks[1] = 1 : checks[1] = 0
        outlineValidated(checkAllTrue(value1, value2), $("#username")[0]);
    });
    $("#password").bind("input", () => {
        determineError(2);
        setModaLenght(value1, "password", 2);
        checkForDigit(value2, "password");
        EqualPassword(value3, "password", "comfirm_password");
        checkAllTrue(value1, value2, value3) ? checks[2] = 1 : checks[2] = 0
        outlineValidated(
            checkAllTrue(value1, value2, value3),
            $("#password")[0]
        );
        outlineValidated(
            checkAllTrue(value1, value2, value3),
            $("#comfirm_password")[0]
        );
    });
    $("#comfirm_password").bind("input", () => {
        determineError(2);
        EqualPassword(value3, "password", "comfirm_password");
        checkAllTrue(value1, value2, value3) ? checks[2] = 1 : checks[2] = 0
        outlineValidated(
            checkAllTrue(value1, value2, value3),
            $("#password")[0]
        );
        outlineValidated(
            checkAllTrue(value1, value2, value3),
            $("#comfirm_password")[0]
        );
    });

    document.querySelector("#form").addEventListener("submit", (e) => {
        e.preventDefault();
        if (checkAllTrueNormJs(...checks)) location.href = "/";
    })
});


const determineError = (num) => {
    value1 = $(`ul.log${num} li`)[0];
    value2 = $(`ul.log${num} li`)[1];
    value3 = $(`ul.log${num} li`)[2];
    return value1, value2, value3;
};
const setModaLenght = (value, selector, num) => {
    $(`#${selector}`).val().length > num
        ? $(`ul.log${num}`)[0].classList.add("visible")
        : $(`ul.log${num}`)[0].classList.remove("hidden");
    $(`#${selector}`).val().length >= 8 && $(`#${selector}`).val().length <= 15
        ? value.classList.add("correct")
        : value.classList.remove("correct");
};
const checkForDigit = (value, selector) => {
    function containsNumbers(str) {
        return /[0-9]/.test(str);
    }
    let string = $(`#${selector}`)[0].value;

    containsNumbers(string)
        ? value.classList.add("correct")
        : value.classList.remove("correct");
};
const EqualPassword = (value, selector1, selector2) => {
    $(`#${selector1}`)[0].value === $(`#${selector2}`)[0].value
        ? value.classList.add("correct")
        : value.classList.remove("correct");
};
const checkAllTrue = (...value) => {
    let bool;
    value.every((type) => {
        return type.classList.contains("correct")
            ? (bool = true)
            : (bool = false);
    });
    return bool;
};

const checkAllTrueNormJs = (...value) => {
    let bool;
    value.every((type) => {
        return type ? (bool = true) : (bool = false);
    });
    return bool;
};

function ValidateEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.value.match(mailformat);
}

function outlineValidated(boot, inputType) {
    boot
        ? (inputType.className = "good")
        : (inputType.className = "bad")
}
