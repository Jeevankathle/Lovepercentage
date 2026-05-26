// Hidden log of attempts
let attemptsLog = [];

function love(){
    let name1 = document.getElementById("NameOne").value.trim().toLowerCase();
    let name2 = document.getElementById("NameTwo").value.trim().toLowerCase();

    if(name1.length <= 2 || name2.length <= 2){
        alert("Enter at least 3 characters");
        return;
    }

    // Deterministic hash based on names (same names → same percentage)
    let combined = name1 + name2;
    let hash = 0;
    for(let i=0; i<combined.length; i++){
        hash = (hash + combined.charCodeAt(i) * (i+1)) % 101;
    }
    let percentage = hash;

    // Animate percentage count-up
    let counter = 0;
    let interval = setInterval(() => {
        document.getElementById("print").innerHTML = 
            `${name1} and ${name2} = ${counter}% of love`;
        if(counter >= percentage) clearInterval(interval);
        counter++;
    }, 20);

    document.getElementById("statement").innerHTML = 
        percentage < 50 ? "Good Relationship 💕" : "Lovely Relationship ❤️";

    // Save attempt to hidden log (only visible to you)
    attemptsLog.push({ name1, name2, percentage });
    console.log("Attempts Log:", attemptsLog);
}
