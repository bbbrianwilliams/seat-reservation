

function makeRows(sectionLength, rowLength, placement) {

  const rows = ["a","b","c","d","e","f","g","h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t"];

  let html = "";
  let counter = 1;

  rows.forEach(function (row) {

    switch (placement) {
      case "left": html += `<div class="label">${row}</div>`; break;
      case "right": counter = counter + (rowLength - sectionLength); break;
      default: counter = counter + ((rowLength - sectionLength) / 2); break;
    }

    for (let i = 0; i < sectionLength; i++) {
      html += `<div class="a" id="${row + counter}">${counter}</div>`;
      counter++;
    }

    switch (placement) {
      case "left": counter = counter + (rowLength - sectionLength); break;
      case "right": html += `<div class="label">${row}</div>`; break;
      default: counter = counter + ((rowLength - sectionLength) / 2); break;
    }

  });
  document.getElementById(placement).innerHTML = html;
}

makeRows(3, 15, "left");
makeRows(3, 15, "right");
makeRows(9, 15, "middle");
