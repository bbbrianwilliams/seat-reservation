let reservedSeats = {};

function makeRows(sectionLength, rowLength, placement) {
  const rows = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
  ];

  let html = "";
  let counter = 1;

  rows.forEach((row) => {
    switch (placement) {
      case "left":
        html += `<div class="label">${row}</div>`;
        break;
      case "right":
        counter = counter + (rowLength - sectionLength);
        break;
      default:
        counter = counter + (rowLength - sectionLength) / 2;
        break;
    }

    for (let i = 0; i < sectionLength; i++) {
      html += `<div class="a" id="${row + counter}">${counter}</div>`;
      counter++;
    }

    switch (placement) {
      case "left":
        counter = counter + (rowLength - sectionLength);
        break;
      case "right":
        html += `<div class="label">${row}</div>`;
        break;
      default:
        counter = counter + (rowLength - sectionLength) / 2;
        break;
    }
  });
  document.getElementById(placement).innerHTML = html;
}

makeRows(3, 15, "left");
makeRows(3, 15, "right");
makeRows(9, 15, "middle");

let selectedSeats = [];
let seats = document.querySelectorAll(".a");

for (const key in reservedSeats) {
  if (reservedSeats.hasOwnProperty(key)) {
    const obj = reservedSeats[key];

    document.getElementById(obj.seat).className = "r";
    document.getElementById(obj.seat).innerHTML = "R";
  }
}

seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    reserveSeat(seat.id);
  });
});

function reserveSeat(seat) {
  if (!document.getElementById(seat).classList.contains("r")) {
    let index = selectedSeats.indexOf(seat);

    if (index > -1) {
      selectedSeats.splice(index, 1);
      document.getElementById(seat).className = "a";
    } else {
      selectedSeats.push(seat);
      document.getElementById(seat).className = "s";
    }

    manageConfirmForm();

    //console.log(selectedSeats);
  }
}

document.getElementById("reserve").addEventListener("click", (event) => {
  event.preventDefault();

  document.getElementById("resform").style.display = "block";
});

document.getElementById("cancel").addEventListener("click", (event) => {
  event.preventDefault();

  document.getElementById("resform").style.display = "none";
});

function manageConfirmForm() {
  if (selectedSeats.length > 0) {
    document.getElementById("confirmres").style.display = "block";

    if (selectedSeats.length === 1) {
      document.getElementById(
        "selectedseats"
      ).innerHTML = `You have selected seat ${selectedSeats[0]}`;
    } else {
      let seatString = selectedSeats.toString();
      seatString = seatString.replace(/,/g, ", ");
      seatString = seatString.replace(/,(?=[^,]*$)/, " and");
      document.getElementById(
        "selectedseats"
      ).innerHTML = `You have selected seats ${seatString}`;
    }
  } else {
    document.getElementById("confirmres").style.display = "none";

    document.getElementById("selectedseats").innerHTML =
      "You need to select some seats to reserve. <br> <a href='#' id='error'>Close</a> this dialog box and pick at least one seat.";

    document.getElementById("error").addEventListener("click", () => {
      document.getElementById("resform").style.display = "none";
    });
  }
}

manageConfirmForm();

document.getElementById("confirmres").addEventListener("submit", (event) => {
  event.preventDefault();
  processReservation();
});

function processReservation() {
  const hardCodeRecords = Object.keys(reservedSeats).length;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  let counter = 1;
  let nextRecord = "";

  selectedSeats.forEach((seat) => {
    document.getElementById(seat).className = "r";
    document.getElementById(seat).innerHTML = "R";

    nextRecord = `record${hardCodeRecords + counter}`;
    reservedSeats[nextRecord] = {
      seat: seat,
      owner: {
        fname: fname,
        lname: lname,
      },
    };

    counter++;
  });

  document.getElementById("resform").style.display = "none";
  selectedSeats = [];
  manageConfirmForm();

  console.log(hardCodeRecords);
}
