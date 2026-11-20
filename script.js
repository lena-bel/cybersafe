// search bar
console.log("yeahhh i'm working");
let searchButton = document.getElementById("searchButton");
searchButton.onclick = function () {
  let input = document.getElementById("searchInput");
  let keyword = input.value.toLowerCase();

  let container = document.getElementById("tipsContainer");
  let cards = container.getElementsByClassName("tip-card");

  let count = 0;
  for (let i = 0; i < cards.length; i++) {
    let title = cards[i].getElementsByTagName("h3")[0].textContent;
    let description = cards[i].getElementsByTagName("p")[0].textContent;

    // check if the word exists and display it else display none
    if (
      title.toLowerCase().indexOf(keyword) !== -1 ||
      description.toLowerCase().indexOf(keyword) !== -1
    ) {
      cards[i].style.display = "block";
      count++;
    } else {
      cards[i].style.display = "none";
    }
  }
  document.getElementById("searchCount").textContent =
    count + " result(s) found";
};

// function to save tips in local storage to avoid them being deleted after the user reloads
function saveTips() {
  let container = document.getElementById("tipsContainer");
  let cards = container.getElementsByClassName("new-tip");

  let tips = [];

  //Go through every tip card
  for (let i = 0; i < cards.length; i++) {
    let title = cards[i].getElementsByTagName("h3")[0].textContent;
    let paragraph = cards[i].getElementsByTagName("p")[0];

    // Store the tip information in an object named tip
    let tip = {
      title: title,
      content: paragraph.textContent,
      textColor: paragraph.style.color,
      backgroundColor: paragraph.style.backgroundColor,
      alignment: paragraph.style.textAlign,
    };

    tips.push(tip);
  }

  // Convert the array into a string and save it
  localStorage.setItem("savedTips", JSON.stringify(tips));
}

// function to display the saved tips
function loadTips() {
  // Retrieve saved tips from localStorage
  let savedTips = localStorage.getItem("savedTips");

  if (savedTips !== null) {
    // Convert the string back into an array
    let tips = JSON.parse(savedTips);

    let container = document.getElementById("tipsContainer");

    // Recreate each saved card
    for (let i = 0; i < tips.length; i++) {
      let newCard = document.createElement("article");
      newCard.className = "tip-card new-tip";
      let cards = container.getElementsByClassName("tip-card");
      let number = cards.length + 1;
      let tipNumber = document.createElement("span");
      tipNumber.className = "tip-number";

      if (number < 10) {
        tipNumber.textContent = "0" + number;
      } else {
        tipNumber.textContent = number;
      }

      let heading = document.createElement("h3");
      heading.textContent = tips[i].title;

      let paragraph = document.createElement("p");
      paragraph.textContent = tips[i].content;

      newCard.appendChild(tipNumber);
      newCard.appendChild(heading);
      newCard.appendChild(paragraph);

      container.appendChild(newCard);
    }
  }
}

// adding the tip
let addButton = document.getElementById("addButton");
addButton.onclick = function () {
  let title = document.getElementById("newTitle").value;
  let content = document.getElementById("newContent").value;

  if (title === "" || content === "") {
    document.getElementById("addMessage").textContent =
      "Please complete both fields.";
  } else {
    let container = document.getElementById("tipsContainer");

    let newCard = document.createElement("article");
    newCard.className = "tip-card new-tip";

    let cards = container.getElementsByClassName("tip-card");
    let number = cards.length + 1;

    let tipNumber = document.createElement("span");
    tipNumber.className = "tip-number";

    if (number < 10) {
      tipNumber.textContent = "0" + number;
    } else {
      tipNumber.textContent = number;
    }

    let heading = document.createElement("h3");
    heading.textContent = title;

    let paragraph = document.createElement("p");
    paragraph.textContent = content;

    newCard.appendChild(heading);
    newCard.appendChild(paragraph);

    container.appendChild(newCard);
    saveTips();

    document.getElementById("addMessage").textContent =
      "Your tip has been added successfully!";

    document.getElementById("newTitle").value = "";
    document.getElementById("newContent").value = "";
  }
};
loadTips();



// put on today's date in the footer which is not working
let today = new Date();

document.getElementById("currentDate").textContent =
  "Today's date: " + today.toLocaleDateString("en-GB");
