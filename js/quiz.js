let answers = []

function select(elem, i) {
    let checkBox = elem.children[1];
    if(checkBox.style.backgroundColor === "") {
        elem.style.borderColor = "#FD6001"
        checkBox.style.backgroundColor = "#FD6001"
        checkBox.style.borderColor = "#FD6001"
        answers.push(i)
    } else {
        elem.style.borderColor = "#E7E7E7"
        checkBox.style.backgroundColor = ""
        checkBox.style.borderColor = "#E7E7E7"
        answers = answers.filter(n => n !== i)
    }
}

function start() {
    sessionStorage.setItem("q", "0");
    sessionStorage.setItem("points", 0)
    location.href = "../pages/quiz.html";
}

function loadDatas() {
    let index = 0;
    index = sessionStorage.getItem("q") == null ?
        index = 0 :
        index = parseInt(sessionStorage.getItem("q"));
    let x = getDatas(index);
    console.log(x)
    document.querySelector(".status h1").children[0].textContent = pad(index + 1)
    document.querySelector(".status h1").children[1].textContent = "/" + pad(JSON.parse(sessionStorage.getItem("x")).length)

    loadQuestionPad();

    document.querySelector(".questions h2").textContent = getDatas(index)[0];

    loadAnswers(getDatas(index)[1]);
}

function loadAnswers(answers) {
    for(let i = 0; i < answers.length; i++) {
        let art = document.createElement("article");
        let h2 = document.createElement("h2");
        let check = document.createElement("div");

        art.onclick = () => select(art, i + 1);
        h2.textContent = answers[i];

        art.appendChild(h2);
        art.appendChild(check);

        document.querySelector(".questions").appendChild(art)
    }
}

function loadQuestionPad() {
    let ql = JSON.parse(sessionStorage.getItem("x")).length;

    for(let i = 0; i < JSON.parse(sessionStorage.getItem("x")).length; i++) {
        let q = document.createElement("div");
        q.classList.add("q")
        q.style.width = `calc(86vw / ${ql} - (20px * ${ql - 1}) / ${ql})`;
        document.querySelector(".status div").appendChild(q);
    }
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function loadSecondPart() {
    if(document.querySelector(".questions").style.display !== "none") {
        document.querySelector(".questions").style.display = "none";
        document.querySelector(".sec-part").style.display = "unset";
        document.querySelector(".sec-part h2").textContent = getExplication(parseInt(sessionStorage.getItem("q")))
    } else {
        if(parseInt(sessionStorage.getItem("q")) < JSON.parse(sessionStorage.getItem("x")).length - 1) {
            let as = JSON.parse(sessionStorage.getItem("x"))[parseInt(sessionStorage.getItem("q"))]["Answers"].toString().split(",");
            let points = sessionStorage.getItem("points");
            points = parseInt(points);
            as.forEach(a => {
                if(answers.includes(parseInt(a))) {
                    points += 1;
                    sessionStorage.setItem("points", (points + 1))
                    answers = answers.filter(n => n != a)
                }
            });
            console.log(sessionStorage.getItem("points"))
            points -= answers.length;
            sessionStorage.setItem("points", points)

            sessionStorage.setItem("q", parseInt(sessionStorage.getItem("q")) + 1);
            location.href = "../pages/quiz.html"
        }
    }
}