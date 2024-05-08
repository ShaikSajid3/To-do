const inputBox = document.getElementById("input-box");
const dateBox = document.getElementById("date-box");
const listContainer = document.getElementById("list-container");
const addTask = () => {
    if (inputBox.value === "") {
        alert("You haven't mentioned your task");
    }
    else {
        let li = document.createElement("li");
        let taskText = inputBox.value;
        taskText = splitTextIntoLines(taskText);
        if (dateBox.value != "") {
            li.innerHTML = taskText + "<br/>\t" + dateBox.value;
        }
        else {
            li.innerHTML = taskText;
        }
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    dateBox.value = "";
    sorting();
    storeData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");

    }
    else if (e.target.tagName == "SPAN") {
        e.target.parentElement.remove();
    }
    storeData();

}, false);

function storeData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function sorting() {
    const liElements = listContainer.querySelectorAll("li");
    var liWithDates = [];
    var liWithoutDates = [];
    liElements.forEach(li => {
        console.log(dateBox.value);

        const dateValueMod = li.textContent.split("\t")[1];
        console.log(dateValueMod);
        if (dateValueMod !== undefined && dateValueMod !== "") {
            const dateValue = dateValueMod.trim();
            const datePart = dateValue.split("T")[0];

            liWithDates.push({ liElement: li, dateVal: datePart });
        }
        else {
            liWithoutDates.push({ liElement: li });
        }
    });
    liWithDates.sort((a, b) => {
        return (new Date(a.dateVal) - new Date(b.dateVal));
    });

    listContainer.innerHTML = "";
    liWithDates.forEach(item => {
        listContainer.appendChild(item.liElement);
    });
    liWithoutDates.forEach(item => {
        listContainer.appendChild(item.liElement);
    });
    liWithoutDates = [];
    liWithDates = [];
}

function splitTextIntoLines(text) {
    if (text.length <= 18) {
        return text;
    } else {
        let firstLine = text.slice(0, 18);
        let remainingText = text.slice(18);
        return firstLine + "<br/>" + splitTextIntoLines(remainingText);
    }
}

function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showData();
