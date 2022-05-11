window.addEventListener("load", function () {
    for (let addButton of document.getElementsByClassName("add")) {
        console.log(addButton);
        addButton.addEventListener("click", clickAddButton, false);
    }

    for (let removeButton of document.getElementsByClassName("remove")) {
        removeButton.addEventListener("click", clickRemoveButton, false);
    }

    document.getElementById("submit").addEventListener("click", function () {
        console.log("submit");

        let dataFormated = {};
        dataFormated.action = "add";
        /**
         * {
         *  "name": "NAME",
         *  "rows": [
         *     {
         *      "stockSize": "SIZE",
         *      "stock": "STOCK"
         *    }
         *  ]
         * }
         */
        let table = document.getElementById("table");
        let rows = table.getElementsByClassName("row");
        const name = document.getElementById("tableId-1").children[0].value;
        if (name === "") return toast("Bitte gebe einen Namen ein");
        dataFormated.name = name;

        let rowsData = [];

        for (let row of rows) {
            let rowData = {};
            for (let rowOfRow of row.children) {
                if (rowOfRow.tagName === "INPUT") {
                    if (rowOfRow.classList.contains("name")) continue;
                    if (rowOfRow.classList.contains("stockSize") && rowOfRow.value === "") return toast("Bitte gebe eine Größe ein");
                    if (rowOfRow.classList.contains("stock") && rowOfRow.value === "") return toast("Bitte gebe eine Anzahl ein");
                    rowData[rowOfRow.className] = rowOfRow.value;
                }
            }
            rowsData.push(rowData);
        }
        dataFormated.rows = rowsData;
        // fetch("http://192.168.178.42:3000/items", {
        //     method: "POST",
        //     headers: {
        //         "Accept": "*/*",
        //         "Access-Control-Allow-Origin": "*",
        //     },
        //     body: JSON.stringify(dataFormated)
        // }).then(res => res.json()).then(res => { console.log(res); });
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        };
        let bodyContent = JSON.stringify(dataFormated);

        fetch("http://192.168.178.42:3000/items", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        }).then(response => {
            window.location = "http://192.168.178.42:3000/index.html";
        });
    });

});

// create a toast message at the bottom of the page
function toast(message) {
    let toast = document.createElement("div");
    let text = document.createElement("p");
    toast.className = "toast";
    text.textContent = message;
    toast.appendChild(text);
    document.body.appendChild(toast);
    setTimeout(function () {
        toast.classList.add("show");
    }, 10);
    setTimeout(function () {
        toast.classList.remove("show");
        setTimeout(function () {
            toast.remove();
        }, 500);
    }, 3000);
}

function clickAddButton(e) {
    let table = document.getElementById("table");

    let row = document.createElement("div");
    row.id = `tableId-${table.childElementCount}`;
    row.classList.add("row");

    let element1 = document.createElement("div");

    let element2 = document.createElement("div");
    element2.classList.add("button", "add");

    let element3 = document.createElement("div");
    element3.classList.add("button", "remove");

    element2.appendChild(getPlusSVG());
    element3.appendChild(getMinusSVG());

    element2.addEventListener("click", clickAddButton, false);
    element3.addEventListener("click", clickRemoveButton, false);

    let element4 = document.createElement("input");
    element4.classList.add("stockSize");
    let element5 = document.createElement("input");
    element5.classList.add("stock");

    row.appendChild(element1);
    row.appendChild(element2);
    row.appendChild(element3);
    row.appendChild(element4);
    row.appendChild(element5);

    table.appendChild(row);
}

function clickRemoveButton(e) {
    let table = document.getElementById("table");
    let row = e.target.parentElement;
    if (row.id === "tableId-1") return;
    table.removeChild(row);
    console.log(row);
}



function getPlusSVG() {
    let plusPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    plusPath.setAttribute("d", "M 8 0 L 12 0 L 12 8 L 20 8 L 20 12 L 12 12 L 12 20 L 8 20 L 8 12 L 0 12 L 0 8 L 8 8 L 8 0");

    let svgPlus = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgPlus.classList.add("addSvg", "add");
    svgPlus.setAttribute("viewBox", "0 0 20 20");
    svgPlus.appendChild(plusPath);

    return svgPlus;
}

function getMinusSVG() {

    let minusPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    minusPath.setAttribute("d", "M 0 8 L 20 8 L 20 12 L 0 12");

    let svgMinus = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgMinus.classList.add("removeSvg", "remove");
    svgMinus.setAttribute("viewBox", "0 0 20 20");
    svgMinus.appendChild(minusPath);

    return svgMinus;
};