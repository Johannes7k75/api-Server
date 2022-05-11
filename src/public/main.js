let tableItems = document
  .getElementById("table")
  .getElementsByClassName("item");
for (let item of tableItems) {
  let width = item.clientWidth;
  let it = 1;
  width = width - 20;
  width = Math.ceil(width / item.childNodes.length);
  for (let child of item.childNodes) {
    if (child.nodeType === 1) {
      let offsetLeft = width * it;
      it++;
      child.style.offsetLeft = offsetLeft;
    }
    // child.style.width = width + "px";
  }
}
// .getElementsByClassName("item").forEach(function (item) {
//     console.log(item);
// });
// .addEventListener("load", moveDivRight, false);

function moveDivRight() {
  console.log("element");
}

function createNormalRow(name, stockSize, stock, id) {
  let row = document.createElement("div");
  row.id = `tableId-${id}`;
  row.className = "item";

  let h2_1_1 = document.createElement("input");
  h2_1_1.type = "checkbox";
  h2_1_1.className = "checkbox";
  h2_1_1.style = "display: none;";
  h2_1_1.id = `checkbox-${id}`;

  let h2_1 = document.createElement("h2");
  h2_1.className = "name";

  h2_1.appendChild(h2_1_1);
  h2_1.innerHTML += name;

  let h2_2 = document.createElement("h2");
  h2_2.textContent = stockSize;
  h2_2.className = "stock-size";

  let h2_3 = document.createElement("h2");
  h2_3.textContent = stock;
  h2_3.className = "stock";

  let action = document.createElement("div");
  action.className = "action";

  let h2_4 = document.createElement("div");
  h2_4.appendChild(getPlusSVG());
  h2_4.classList.add("add", "action");
  h2_4.addEventListener("click", clickAdd, false);

  let h2_5 = document.createElement("div");
  h2_5.appendChild(getMinusSVG());
  h2_5.classList.add("remove", "action");
  h2_5.addEventListener("click", clickRemove, false);

  action.appendChild(h2_4);
  action.appendChild(h2_5);

  row.appendChild(h2_1);
  row.appendChild(h2_2);
  row.appendChild(h2_3);
  row.appendChild(action);

  document.getElementById("table").appendChild(row);
  return row;
}

function createMultipleRows(name, id, data = []) {
  // console.log(data);
  let row = document.createElement("div");
  row.id = `tableId-${id}`;
  row.className = "item-multi";

  let h2_1 = document.createElement("h2");
  h2_1.className = "name";

  let h2_1_1 = document.createElement("input");
  h2_1_1.type = "checkbox";
  h2_1_1.className = "checkbox";
  h2_1_1.style = "display: none;";
  h2_1_1.id = `checkbox-${id}`;

  h2_1.appendChild(h2_1_1);
  h2_1.innerHTML += name;

  let rows = document.createElement("div");
  rows.className = "rows";

  for (let dataRow of data) {
    let multiRow = document.createElement("div");
    multiRow.className = "row";

    let h2_2 = document.createElement("h2");
    h2_2.className = "stock-size";

    h2_1_1.id = `checkbox-${id}-${data.indexOf(dataRow)}`;
    h2_2.appendChild(h2_1_1);
    h2_2.innerHTML += dataRow.stockSize;

    let h2_3 = document.createElement("h2");
    h2_3.textContent = dataRow.stock;
    h2_3.className = "stock";

    let action = document.createElement("div");
    action.className = "action";

    let h2_4 = document.createElement("h2");
    h2_4.classList.add("add", "action");
    h2_4.appendChild(getPlusSVG());

    let h2_5 = document.createElement("h2");
    h2_5.classList.add("remove", "action");
    h2_5.appendChild(getMinusSVG());

    // console.log(h2_4);

    action.appendChild(h2_4);
    action.appendChild(h2_5);

    multiRow.appendChild(h2_2);
    multiRow.appendChild(h2_3);
    multiRow.appendChild(action);

    rows.appendChild(multiRow);
  }

  row.appendChild(h2_1);
  row.appendChild(rows);

  document.getElementById("table").appendChild(row);
  return rows;
}

// do something if page is loaded
window.addEventListener("load", async function () {
  localStorage.setItem("removeBoxesChecked", JSON.stringify([]));

  let data = await fetch(
    `http://${require("ip").address()}:3000/items`
  ).then((res) => res.json());
  data = data.sort((a, b) => a.name.localeCompare(b.name));
  for (let rowData of data) {
    if (rowData.rows.length === 1) {
      createNormalRow(
        rowData.name,
        rowData.rows[0].stockSize,
        rowData.rows[0].stock,
        rowData.id
      );
    } else if (rowData.rows.length > 1) {
      createMultipleRows(rowData.name, rowData.id, rowData.rows);
    }
  }
  // createNormalRow("test", "100", "10", 1);
  // createMultipleRows("test", 20, [{ size: "S", stock: "10" }, { size: "M", stock: "10" }, { size: "L", stock: "10" }]);
  for (
    let i = 0;
    i < this.document.getElementById("table").children.length;
    i++
  ) {
    let children = this.document.getElementById("table").children[i];

    children.classList.add(`rowType${(i % 2) + 1}`);
    if (children.classList.contains("item-multi")) {
      for (let j = 0; j < children.children.length; j++) {
        if (children.children[j].classList.contains("rows")) {
          for (let k = 0; k < children.children[j].children.length; k++) {
            let modulus =
              i % 2 === 1 ? (k % 2 === 0 ? 1 : 0) : k % 2 === 0 ? 0 : 1;
            children.children[j].children[k].classList.add(
              `rowType${modulus + 1}`
            );
            if (
              i % 2 === 1 &&
              k % 2 === 1 &&
              children.children[j].children.length - 1 === k
            ) {
              children.children[j].children[k].setAttribute(
                "style",
                "border-bottom-left-radius: 0px; "
              );
            }
          }
        }
      }
    }
  }

  for (let item of document.getElementsByClassName("add")) {
    item.addEventListener("click", clickAdd, false);
  }
  for (let item of document.getElementsByClassName("remove")) {
    item.addEventListener("click", clickRemove, false);
  }

  // header>div>.header-action>h2

  // for (let menuItem of document.getElementsByClassName("header-action")) {
  // this.document.getElementById("header-action-add").addEventListener("click", clickMenuAdd, false);
  this.document
    .getElementById("header-action-remove")
    .addEventListener("click", clickMenuRemove, false);
  this.document
    .getElementById("header-action-edit")
    .addEventListener("click", clickMenuEdit, false);
  // }
});

function clickRemove(e) {
  let parent = e.srcElement.parentElement.parentElement.children;
  for (let item of parent) {
    if (!item.classList.contains("stock")) continue;
    let newNumber = parseInt(item.innerHTML) - 1;
    item.innerHTML = newNumber < 0 ? 0 : newNumber;
  }
}

function clickAdd(e) {
  console.log(1);
  let parent = e.srcElement.parentElement.parentElement.children;
  for (let item of parent) {
    if (!item.classList.contains("stock")) continue;
    item.innerHTML = parseInt(item.innerHTML) + 1;
  }
}

// function clickMenuAdd(e) {
//     document.getElementById("addOverlay").style.display = "block";
//     for (let addItems of document.getElementsByClassName("header-action-add")) {
//         addItems.addEventListener("click", clickMenuAddRowAdd, false);
//     }
// }

function clickMenuRemove(e) {
  let ckeckboxes = document.getElementsByClassName("checkbox");
  document
    .getElementById("header-action-remove-confirm")
    .addEventListener("click", clickMenuRemoveConfirm, false);
  for (let checkbox of ckeckboxes) {
    if (checkbox.style.display === "none") {
      checkbox.setAttribute("style", "");
      document
        .getElementById("header-action-remove-confirm")
        .setAttribute("style", "display: block;");
    } else {
      checkbox.setAttribute("style", "display: none;");
      document
        .getElementById("header-action-remove-confirm")
        .setAttribute("style", "display: none;");
    }
    checkbox.addEventListener("click", clickCheckbox, false);
  }
}

async function clickMenuRemoveConfirm(e) {
  let removeBoxesChecked = JSON.parse(
    localStorage.getItem("removeBoxesChecked")
  );

  for (let i = 0; i < removeBoxesChecked.length; i++) {
    console.log(i);
  }

  for (let i = 0; i < removeBoxesChecked.length; i++) {
    console.log(removeBoxesChecked[i], i);
    let id = removeBoxesChecked[i].split("-");
    // console.log(id);
    if (id.length === 2) {
      await fetch(`http://192.168.178.42:3000/items`, {
        method: "POST",

        headers: {
          Accept: "*/*",
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          action: "remove",
          id: id[1]
        })
      });
    } else if (id.length === 3) {
      fetch(`http://192.168.178.42:3000/items`, {
        method: "GET",

        headers: {
          Accept: "*/*",
          "Content-Type": "application/json"
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      let data = {};
      data.action = "add";
    }
  }
  window.location.reload();

  localStorage.setItem(
    "removeBoxesChecked",
    JSON.stringify(removeBoxesChecked)
  );
  // document.getElementById("header-action-remove-confirm").setAttribute("style", "display: none;");
  // console.log(removeBoxesChecked);
}

function clickCheckbox(e) {
  const checkboxesChecked = JSON.parse(
    localStorage.getItem("removeBoxesChecked")
  );
  // if (e.target.id.split("-").length > 2) {
  //     console.log("multi");
  //     checkboxesChecked.push(e.target.id);
  // } else {
  //     console.log("normal");
  //     checkboxesChecked.push(e.target.id);
  // }
  console.log(
    e.target,
    checkboxesChecked.includes(e.target.id),
    checkboxesChecked
  );
  if (checkboxesChecked.includes(e.target.id)) {
    checkboxesChecked.slice(checkboxesChecked.indexOf(e.target.id), 1);
  } else {
    checkboxesChecked.push(e.target.id);
  }
  localStorage.setItem("removeBoxesChecked", JSON.stringify(checkboxesChecked));
  console.log(e.target.id, "e.target", checkboxesChecked);
  // console.log(e.target.parentElement.parentElement.parentElement.parentElement);
}

function clickMenuEdit(e) {
  document.getElementById("editOverlay").style.display = "block";
}

function clickMenuAddRowAdd(e) {
  let menuDiv =
    e.srcElement.parentElement.parentElement.parentElement.parentElement;
  console.log(menuDiv);

  let row = document.createElement("div");
  row.classList.add("addOverlay");

  let div = document.createElement("div");
  row.appendChild(div);

  let rowPlus = document.createElement("svg");
  rowPlus.appendChild(getPlusSVG());
  let rowMinus = document.createElement("svg");
  rowMinus.appendChild(getMinusSVG());

  let rowAction = document.createElement("div");
  rowAction.classList.add("overlay-row-action");
  rowAction.appendChild(rowPlus);
  rowAction.appendChild(rowMinus);

  row.appendChild(rowAction);

  let stockSize = document.createElement("input");
  let stock = document.createElement("input");

  row.appendChild(stockSize);
  row.appendChild(stock);

  menuDiv.appendChild(row);
}

function getPlusSVG() {
  let plusPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  plusPath.setAttribute(
    "d",
    "M 8 0 L 12 0 L 12 8 L 20 8 L 20 12 L 12 12 L 12 20 L 8 20 L 8 12 L 0 12 L 0 8 L 8 8 L 8 0"
  );

  let svgPlus = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgPlus.classList.add("addSvg", "add");
  svgPlus.setAttribute("viewBox", "0 0 20 20");
  svgPlus.appendChild(plusPath);

  return svgPlus;
}

function getMinusSVG() {
  let minusPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  minusPath.setAttribute("d", "M 0 8 L 20 8 L 20 12 L 0 12");

  let svgMinus = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgMinus.classList.add("removeSvg", "remove");
  svgMinus.setAttribute("viewBox", "0 0 20 20");
  svgMinus.appendChild(minusPath);

  return svgMinus;
}
