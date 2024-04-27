function Active() {
    document.querySelector(".burger_links").classList.toggle("active")
}

document.querySelector(".burger_button").addEventListener("click", Active)

// const selected = document.getElementById("selected")
// const doctor = getElementById("Doctor")
// const patient = getElementById("Patient")

// document.getElementById(".selected").appendChild()

function myFunction() {   
    let selection = document.getElementById("mySelect").value
    document.getElementById("selected").innerHTML = "You selected " + selection;
}


