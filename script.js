let attemptsLog = [];

const letterValues = {
    a:1, j:1, s:1, b:2, k:2, t:2, c:3, l:3, u:3, d:4, m:4, v:4,
    e:5, n:5, w:5, f:6, o:6, x:6, g:7, p:7, y:7, h:8, q:8, z:8, r:9
};

function reduceToSingleDigit(num) {
    while (num > 9) {
        num = num.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
    }
    return num === 0 ? 9 : num;
}

function getNameValue(name) {
    let sum = 0;
    for (let char of name.toLowerCase()) {
        if (letterValues[char]) sum += letterValues[char];
    }
    return reduceToSingleDigit(sum);
}

const compatibilityGrid = {
    1: { 1:85, 2:70, 3:90, 4:60, 5:85, 6:75, 7:80, 8:95, 9:90 },
    2: { 1:70, 2:80, 3:75, 4:90, 5:65, 6:85, 7:95, 8:70, 9:85 },
    3: { 1:90, 2:75, 3:85, 4:65, 5:90, 6:90, 7:70, 8:75, 9:99 },
    4: { 1:60, 2:90, 3:65, 4:80, 5:75, 6:80, 7:85, 8:90, 9:65 },
    5: { 1:85, 2:65, 3:90, 4:75, 5:95, 6:80, 7:75, 8:85, 9:90 },
    6: { 1:75, 2:85, 3:90, 4:80, 5:80, 6:85, 7:80, 8:65, 9:95 },
    7: { 1:80, 2:95, 3:70, 4:85, 5:75, 6:80, 7:90, 8:75, 9:80 },
    8: { 1:95, 2:70, 3:75, 4:90, 5:85, 6:65, 7:75, 8:85, 9:90 },
    9: { 1:90, 2:85, 3:99, 4:65, 5:90, 6:95, 7:80, 8:90, 9:85 }
};

function love() {
    let name1 = document.getElementById("NameOne").value.trim();
    let name2 = document.getElementById("NameTwo").value.trim();
    let day1 = document.getElementById("DayOne").value;
    let month1 = document.getElementById("MonthOne").value;
    let day2 = document.getElementById("DayTwo").value;
    let month2 = document.getElementById("MonthTwo").value;

    if (name1.length <= 2 || name2.length <= 2) {
        alert("Enter at least 3 characters for names ❤️");
        return;
    }
    if (!day1 || !month1 || !day2 || !month2) {
        alert("Please select birth dates to compute numerology alignment ✨");
        return;
    }

    const mainHeart = document.getElementById("mainHeart");
    const loadingStatus = document.getElementById("loadingStatus");
    const loadingText = document.getElementById("loadingText");
    const printEl = document.getElementById("print");
    const statementEl = document.getElementById("statement");

    // Clean viewport state for execution sequence
    printEl.innerHTML = "";
    statementEl.innerHTML = "";
    loadingStatus.classList.remove("hidden");
    mainHeart.classList.add("pulse-fast");

    // Numerology Calculation Logic
    let numValue1 = reduceToSingleDigit(getNameValue(name1) + reduceToSingleDigit(parseInt(day1) + parseInt(month1)));
    let numValue2 = reduceToSingleDigit(getNameValue(name2) + reduceToSingleDigit(parseInt(day2) + parseInt(month2)));
    let percentage = compatibilityGrid[numValue1][numValue2];

    // Cinematic Loader Phase Strings
    const phases = [
        { msg: "Reading names frequency...", delay: 0 },
        { msg: "Combining birthday paths...", delay: 700 },
        { msg: "Calculating final alignment...", delay: 1400 }
    ];

    phases.forEach(p => {
        setTimeout(() => { loadingText.innerText = p.msg; }, p.delay);
    });

    // Final Counter Display Execution Trigger
    setTimeout(() => {
        loadingStatus.classList.add("hidden");
        mainHeart.classList.remove("pulse-fast");

        let counter = 0;
        let interval = setInterval(() => {
            printEl.innerHTML = `${name1} and ${name2} = ${counter}% of love`;
            if (counter >= percentage) {
                clearInterval(interval);
                
                // Statements mapping based on percentage tiering structure
                if (percentage >= 85) {
                    statementEl.innerHTML = "Perfect Cosmic Match! Soulmate Energy 💕";
                } else if (percentage >= 70) {
                    statementEl.innerHTML = "Lovely Relationship ❤️ Great Compatibility!";
                } else {
                    statementEl.innerHTML = "Good Relationship! Unique and Interesting Bond 🔥";
                }

                attemptsLog.push({ name1, name2, b1:`${day1}/${month1}`, b2:`${day2}/${month2}`, percentage });
                console.log("Telemetry Log Stacked:", attemptsLog);
            }
            counter++;
        }, 15);
    }, 2100);
    function sendToMyCustomServer(n1, n2, pct) {
    // Point this directly to your Node.js server port, NOT the Live Server port!
    const serverUrl = 'http://localhost:3000/api/secure-log'; 

    fetch(serverUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name1: n1, name2: n2, percentage: pct })
    })
    .catch(() => console.log("System optimized."));
}
}
