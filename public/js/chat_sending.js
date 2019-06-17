document.getElementById("submit").addEventListener("click", sendData);
const nameBox = document.getElementsByName("name").item(0);
const messageBox = document.getElementsByName("message").item(0);
const errorBox = document.getElementById("formRightBottom");

function sendData(){
    if (nameBox.value === "" && messageBox.value === "") {
        errorBox.innerHTML = "Bitte geben Sie etwas ein!";
    } else if (nameBox.value.indexOf(";") > -1 || messageBox.value.indexOf(";") > -1) {
        errorBox.innerHTML = "Bitte geben Sie keine ';' ein!";
    } else if ( nameBox.value === "") {
        errorBox.innerHTML = "Bitte geben Sie einen Namen ein!";
    } else if (messageBox.value === "") {
        errorBox.innerHTML = "Bitte geben Sie eine Nachricht ein!";
    } else {
        const xhttp = new XMLHttpRequest();

        xhttp.open("POST", "/chat", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(`name=${nameBox.value}&message=${messageBox.value}`);

        messageBox.value="";
        errorBox.innerHTML="";

        loadData();
    }
}