function loadScore() {
    let points = sessionStorage.getItem("points");
    let totalPoints = 0;
    let x = JSON.parse(sessionStorage.getItem("x"))

    for(let key in x) {
        console.log(x[key]["Answers"].toString().split(",").length)
        totalPoints += x[key]["Answers"].toString().split(",").length
    }

    document.querySelector("main h1").children[0].textContent = points;
    document.querySelector("main h1").children[1].textContent = "/" + totalPoints.toString();
}