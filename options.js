//import { readPatterns, savePatterns } from "./helper.js";

var dataPatterns = "dataPatterns";

function loadOptions(data) {
  if (data && data.length > 0) {
    var container = document.getElementById(dataPatterns);
    //Limpia por si existen datos
    container.innerHTML = "";
    var dataHtml = "";
    for (var i = 0; i < data.length; i++) {
      var iter = `
        <ul id="data">
              <li class="titleName">
                  Url <input value="${data[i].url}" />
              </li>            
              <li class="liNroOrder"><span>To</span><input value="${data[i]
                .to}" />
              </li>
              <li class="remove"><button id="remove" class="btn bmd-btn-icon bmd-btn-icon-sm">
                  <i class="fas fa-trash"></i></button>
              </li>
          </ul>`;
      dataHtml += iter;
    }
    container.insertAdjacentHTML("beforeend", dataHtml);

    removeRowAction();
  }
}

function saveOptions() {
  var container = document.getElementById(dataPatterns);
  var ulData = container.querySelectorAll("ul[id=data]");
  var spinnerSave = document.getElementById("spinnerSave");
  var slider = document.getElementById("slider");
  var patterns = [];
  slider.classList.toggle("closed");
  spinnerSave.style.display = "block";
  if (ulData && ulData.length > 0) {
    ulData.forEach(function(ele) {
      var inputs = ele.querySelectorAll("input");
      patterns.push({ url: inputs[0].value, to: inputs[1].value });
    });
  }
  //Guardamos sin cargar.
  savePatterns(patterns, function() {
    slider.classList.toggle("closed");
    setTimeout(function() {
      spinnerSave.style.display = "none";
    }, 50);
  });
}

function saveDefault() {
  var patterns = [
    { url: "(https?)://intranet/(.*)", to: "$1://intranet.gob.ar/$2" },
    { url: "(https?)://(.*).gov.ar/(.*)", to: "$1://$2.gob.ar/$3" }
  ];
  savePatterns(patterns, function() {
    readPatterns(loadOptions);
  });
}

function addRow() {
  var container = document.getElementById(dataPatterns);
  var newRow = `
    <ul id="data">
        <li class="titleName">
            Url <input value="" />
        </li>            
        <li class="liNroOrder"><span>To</span><input value="" /></li>
        <li class="remove"><button id="remove" class="btn bmd-btn-icon bmd-btn-icon-sm">
          <i class="fas fa-trash"></i></button>
        </li>
    </ul>`;
  container.insertAdjacentHTML("beforeend", newRow);
  //Llamamos para que fije la acción de remover.
  removeRowAction();
}

function removeRow(evt) {
  var ulData = evt.target;
  while (
    ulData.tagName.toLowerCase() !== "ul" &&
    ulData.tagName.toLowerCase() !== "body"
  ) {
    ulData = ulData.parentNode;
  }
  ulData.remove();
}

function removeRowAction() {
  var container = document.getElementById(dataPatterns);
  var matches = container.querySelectorAll("button[id=remove]");
  matches.forEach(function(ele) {
    ele.onclick = removeRow;
  });
}

function init() {
  //Fijar las acciones en la página.
  var btnSave = document.getElementById("saveOptions");
  btnSave.onclick = saveOptions;
  var btnSaveDef = document.getElementById("saveDefault");
  btnSaveDef.onclick = saveDefault;
  var btnAddRow = document.getElementById("addRow");
  btnAddRow.onclick = addRow;

  readPatterns(loadOptions);
}

init();
