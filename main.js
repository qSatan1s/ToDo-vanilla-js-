let str = "";
var count = 0;
var count = localStorage.getItem("count");
let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

let performed = localStorage.getItem("performed")
  ? JSON.parse(localStorage.getItem("performed"))
  : [];

localStorage.setItem("items", JSON.stringify(itemsArray));
var data = JSON.parse(localStorage.getItem("items"));

if (data) {
  for (i = 0; i != data.length; i++) {
    str += data[i];
  }

  text.innerHTML = data
    .map(
      (elem) =>
        `<span id=id_${elem.id}> ${elem.count} - ${elem.text}</span> </br>`,
    )
    .join("");
  if (performed != null) {
    for (i = 0; i < performed.length; i++)
      if (document.getElementById(performed[i])) {
        document.getElementById(performed[i]).className = "performed";
      }
  }
}

var past__id = [];
var text__input = document.getElementById("name");

// оверлей
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".pan") || e.target.matches(".add__note")) {
    overlay.style.display = "block";
  }

  if (e.target.matches(".abolition")) {
    overlay.style.display = "none";
    text__input.value = "";
  }
});

// добавление элементов
document.body.addEventListener("click", (e) => {
  if (e.target.matches(".add")) {
    var action__text = text__input.value;

    if (action__text) {
      overlay.style.display = "none";
      text__input.value = "";

      i = Math.floor(Math.random() * (100 - 1) + 1);
      count++;
      let new_elem = document.createElement("span");
      new_elem.id = `id-${i}`;

      new_elem.innerHTML =
        `<span id=id-${i} >` +
        count +
        " - " +
        action__text +
        `</span> ` +
        "<br>";

      text.append(new_elem);

      itemsArray.push({ id: i, text: action__text, count: count });

      localStorage.setItem("count", count);
      localStorage.setItem("items", JSON.stringify(itemsArray));
    }
  }
});

// выполненно / не выполнено
document.querySelector("#text").addEventListener("click", function (e) {
  if (e.target.className != "text") {
    e.target.classList.toggle("performed");
  }
  if (e.target.className == "performed") {
    performed.push(e.target.id);
  } else {
    for (var i = performed.length - 1; i >= 0; i--) {
      if (performed[i] === e.target.id) {
        performed.splice(i);
      }
    }
  }
  localStorage.setItem("performed", JSON.stringify(performed));
});

// remove from list

document.body.addEventListener("click", (e) => {
  if (e.target.matches(".eraser") || e.target.matches(".remove")) {
    text.style.cursor = " no-drop";

    document
      .querySelector("#text")
      .addEventListener("click", function listener(e) {
        e.target.parentNode.removeChild(e.target);
        for (i = 0; i != data.length; i++) {
          if (e.target.id == "id_" + data[i].id) {
            data.splice(i, 1);
            localStorage.setItem("items", JSON.stringify(data));
          }
        }

        text.style.cursor = "pointer";
        document
          .querySelector("#text")
          .removeEventListener("click", listener, false);
      });
  }
});

//rename

document.querySelector("#text").addEventListener("dblclick", function (e) {
  overlay__name.style.display = "block";
  target = e.target;

  let numEl = parseInt(e.target.textContent.match(/\d+/));
  document.body.addEventListener("click", (e) => {
    rename = document.getElementById("renameq");
    if (e.target.matches(".rename")) {
      text = rename.value;
      target.textContent = numEl + "  - " + text;
      rename.value = "";
      for (i = 0; i != data.length; i++) {
        if (numEl == data[i].count) {
          console.log(data[i]);
          data[i].text = text;
          localStorage.setItem("items", JSON.stringify(data));
        }
      }
    }
  });
});
