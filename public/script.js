"use strict";
let sum = 0;
let tgl_c = 0;
let result_type;
// add event listeners to the answer buttons
document.querySelectorAll("[data-pts]").forEach((xb) => {
  xb.addEventListener("click", clck_nxt);
});

// show scores when clicking the #tgl element
document.querySelector("#tgl").addEventListener("click", tgl);

function clck_nxt(el) {
  let q = this.closest("[data-info]");
  let nxt_q = q.nextElementSibling;
  q.querySelectorAll("[data-pts]").forEach((x) => {
    x.classList.remove("selected");
    x.removeAttribute("selected");
  });
  this.classList.add("selected");
  this.setAttribute("selected", "");
  // sum += Number(this.getAttribute("data-pts"));
  // document.getElementById("sum").innerText = sum;
  // console.log(sum);

  q.hidden = true;
  nxt_q.hidden = false;
  document.body.style.backgroundPositionY = "-" + 200 * Number(q.id.split("q")[1]) + "px";
  // console.log(q.id);
  if (nxt_q.id == "results") {
    results();
  }
}

function results() {
  document.querySelectorAll("[id^='type']").forEach((x) => (x.hidden = true));
  sum = 0;
  document.querySelectorAll("p.selected").forEach((x) => (sum += Number(x.getAttribute("data-pts"))));
  document.getElementById("sum").innerText = sum;
  if (sum >= 40) {
    result_type = document.getElementById("type4");
  } else if (sum >= 27) {
    result_type = document.getElementById("type3");
  } else if (sum >= 16) {
    result_type = document.getElementById("type2");
  } else {
    result_type = document.getElementById("type1");
  }
  result_type.hidden = false;
  result_type.setAttribute("selected", "");
  let full_log = document.querySelector("#survey").innerHTML;
  send_log(full_log);
}

function send_log(full_log) {
  fetch("log_writer.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ log: full_log }),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function tgl() {
  tgl_c++;
  if (tgl_c % 3 == 0) {
    if (document.querySelector("#tgl_pts")) {
      document.querySelector("#tgl_pts").remove();
    } else {
      const tgl_pts = document.createElement("style");
      tgl_pts.id = "tgl_pts";
      document.querySelector("body").append(tgl_pts);
      tgl_pts.innerHTML = 'p[data-pts]:after {content: " ["attr(data-pts)"]"}';
    }
  }
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

document.querySelectorAll("div[data-info]").forEach((div) => {
  const pElements = Array.from(div.querySelectorAll("p[data-pts]"));
  shuffle(pElements).forEach((p) => div.appendChild(p));
});

// // Function to shuffle an array
// function shuffle(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }

// // Get all div elements with data-info attribute
// const divElements = document.querySelectorAll("div[data-info]");

// divElements.forEach((div) => {
//   // Get all p elements with data-pts attribute within the div
//   const pElements = div.querySelectorAll("p[data-pts]");

//   // Convert NodeList to an array
//   const pArray = Array.from(pElements);

//   // Shuffle the array
//   const shuffledArray = shuffle(pArray);

//   // Append shuffled elements back to the div
//   shuffledArray.forEach((p) => {
//     div.appendChild(p);
//   });
// });

// current time
// Math.floor(Date.now() / 1000);
