let myForm = document.querySelector("form");
myForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = document.getElementById("name");
    let mail = document.getElementById("mail");

    if (!username.value || !mail.value)
        alert(`Please Ensure you input a valid username`);

    console.log(username.value);
    console.log(mail.value);
});
