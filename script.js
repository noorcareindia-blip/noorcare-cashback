const button = document.getElementById("claimBtn");
const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

button.addEventListener("click", async () => {

    const code = document.getElementById("code").value.trim().toUpperCase();

    if(code==""){
        alert("Please enter cashback code");
        return;
    }

    button.disabled = true;
    result.innerHTML = "Checking code...";

    try{

        const response = await fetch("https://script.google.com/macros/s/AKfycbwR4y8gOik8OsVy4F-0Qvd_hDX7IWqfqo9pZz2bOKuEYbDbQdF7HF0zdPKhbFNez0wF/exec",{
            method:"POST",
            body:new URLSearchParams({
                code:code
            })
        });

        const text = await response.text();

        if(text=="INVALID_CODE"){
            result.innerHTML="❌ Invalid Cashback Code";
            button.disabled=false;
            return;
        }

        if(text=="ALREADY_USED"){
            result.innerHTML="❌ Cashback Code Already Used";
            button.disabled=false;
            return;
        }

        const rotation = 3600 + Math.floor(Math.random()*360);

        wheel.style.transform=`rotate(${rotation}deg)`;

        setTimeout(()=>{

            result.innerHTML=`🎉 Congratulations!<br><br>You Won ₹${text} Cashback`;

            button.disabled=false;

        },5000);

    }catch(err){

        result.innerHTML="⚠️ Server Error";

        button.disabled=false;

    }

});
