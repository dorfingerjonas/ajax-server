function loadData(){

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){

        if (this.readyState === 4 && this.status === 200) {

            console.log(this.responseText);
            console.log(JSON.parse(this.responseText));

                let obj = JSON.parse(this.responseText);
                let chat_block = '';

                for (let i = 0; i < obj.names.length; i++){
                    if (obj.names[i] !== undefined || obj.messages[i] !== undefined) {
                        chat_block += `<div><h3>${obj.names[i]}</h3><p>${obj.messages[i]}</p></div>`;
                    }
                }
            document.getElementById("chat").innerHTML = chat_block;
        }
    };
    xhttp.open("GET", "chat", true);
    xhttp.send();
}

loadData();