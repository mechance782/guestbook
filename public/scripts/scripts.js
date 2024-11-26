document.getElementById("guestbookForm").onsubmit = function() {

    clearErrors();
    let isValid = true;

    let fname = document.getElementById("fname").value;
    if (fname == ""){
        document.getElementById("err-fname").style.display = "inline";
        isValid = false;
    }

    let lname = document.getElementById("lname").value;
    if (lname == ""){
        document.getElementById("err-lname").style.display = "inline";
        isValid = false;
    }

    let meeting = document.getElementById("meeting").value;
    if (meeting == "select"){
        document.getElementById("err-meetDropDown").style.display = "inline";
        isValid = false;
    }

    // If element is made required by other inputs, then validate user input for the element
   
    let email = document.getElementById("email").value;
    if (document.getElementById("mailing").checked) {
        if (email == ""){
            document.getElementById("err-email").style.display = "inline";
            isValid = false;
        }
    }

    if (document.getElementById("meeting").value == "other") {
        let meetingOther = document.getElementById("meetingOther").value;
        if (meetingOther == ""){
            document.getElementById("err-meetingOther").style.display = "inline";
            isValid = false;
        }
    }

    // Element is optional but requires specific formatting if entered

    if (!(email == "")){
        if (!(email.includes("@") && email.includes("."))){
            document.getElementById("err-emailFormat").style.display = "inline";
            isValid = false;
        }
    }

    let linkedIn = document.getElementById("linkedIn").value;
    if (!(linkedIn == "")){
        if (!linkedIn.startsWith("https://www.linkedin.com/in/")){
            document.getElementById("err-linkedIn").style.display = "inline";
            isValid = false;
        }
    }


    return isValid;
}


// Other textbook made visible when other is chosen from drop down

document.getElementById("meeting").oninput = function() {
    if (document.getElementById("meeting").value == "other"){
        document.getElementById("meetingOtherSegment").style.display = "block";
    } else {
        document.getElementById("meetingOtherSegment").style.display = "none";
    }
}

// Email format options made visible when mailing list checkbox is checked

document.getElementById("mailing").oninput = function() {
    if (document.getElementById("mailing").checked) {
        document.getElementById("emailFormat").style.display = "block";
    } else {
        document.getElementById("emailFormat").style.display = "none";
    }
}

// Create clear errors function 
function clearErrors(){
    let errors = document.getElementsByClassName("err");
    for (let i=0; i < errors.length; i++){
        errors[i].style.display = "none";
    }
}