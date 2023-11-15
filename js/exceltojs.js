async function readExcel() {
    const workbook = XLSX.read(await (await fetch("../assets/Tableau_Excel.xlsx")).arrayBuffer());
    let data = [];

    workbook.SheetNames.forEach(name => {
        const worksheet = workbook.Sheets[name];
        const sheetData = XLSX.utils.sheet_to_json(worksheet);
        data.push(sheetData);
    });

    let arr = []
    for(let i = 0; i < data[0].length; i++) {
        data[0][i]["Questions"] != null ? arr.push(data[0][i]) : null;
    }
    sessionStorage.setItem("x", JSON.stringify(arr));
    return arr;
}


function getDatas(i) {
    var q = getQuestion(i);
    var a = getAnswers(i);
    return [q, a]
}

function getQuestion(i) {
    return JSON.parse(sessionStorage.getItem("x"))[i]["Questions"];
}

function getAnswers(i) {
    let x = JSON.parse(sessionStorage.getItem("x"))[i]["Numbers"];
    let arr = []
    for(let j = 0; j < parseInt(x); j++) {
        arr.push(JSON.parse(sessionStorage.getItem("x"))[i]["Answers" + (j + 1)]);
    }
    return arr
}

function getExplication(i) {
    return JSON.parse(sessionStorage.getItem("x"))[i]["Explication"];
}