// ===== Elements =====

const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const progressText = document.getElementById("progressText");
const progressCircle = document.querySelector(".progress");

const themeBtn = document.getElementById("themeBtn");
const voiceBtn = document.getElementById("voiceBtn");
const aiBtn = document.getElementById("aiBtn");

const suggestionText =
document.getElementById("suggestionText");

const streakElement =
document.getElementById("streak");

// ===== Local Storage =====

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

let streak =
parseInt(localStorage.getItem("streak")) || 0;

streakElement.textContent = streak;

// ===== Save =====

function saveTasks() {
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// ===== Render Tasks =====

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li =
        document.createElement("li");

        li.className =
        task.completed
        ? "task completed"
        : "task";

        li.innerHTML = `

        <div class="task-info">

            <strong>
                ${task.text}
            </strong>

            <span class="task-date">
                📅 ${task.date || "No Due Date"}
            </span>

        </div>

        <div class="task-actions">

            <button onclick="toggleTask(${index})">
                ✓
            </button>

            <button onclick="deleteTask(${index})">
                🗑
            </button>

        </div>

        `;

        taskList.appendChild(li);

    });

    updateStats();
    saveTasks();
}

// ===== Add Task =====

addBtn.addEventListener("click", () => {

    const text =
    taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        text: text,
        date: dueDate.value,
        completed: false
    });

    taskInput.value = "";
    dueDate.value = "";

    renderTasks();

});

// ===== Enter Key =====

taskInput.addEventListener("keypress", e => {

    if(e.key === "Enter") {
        addBtn.click();
    }

});

// ===== Toggle =====

function toggleTask(index) {

    tasks[index].completed =
    !tasks[index].completed;

    if(tasks[index].completed){

        streak++;

        streakElement.textContent =
        streak;

        localStorage.setItem(
            "streak",
            streak
        );

        // Confetti 🎉

        confetti({
            particleCount:120,
            spread:80,
            origin:{y:0.6}
        });

    }

    renderTasks();

}

// ===== Delete =====

function deleteTask(index){

    tasks.splice(index,1);

    renderTasks();

}

// ===== Update Stats =====

function updateStats(){

    let total =
    tasks.length;

    let completed =
    tasks.filter(
        task => task.completed
    ).length;

    totalTasks.textContent =
    total;

    completedTasks.textContent =
    completed;

    let percentage =
    total === 0
    ? 0
    : Math.round(
        (completed / total) * 100
      );

    progressText.textContent =
    percentage + "%";

    let offset =
    440 - (440 * percentage) / 100;

    progressCircle.style.strokeDashoffset =
    offset;

}

// ===== Theme =====

themeBtn.addEventListener(
"click",
() => {

    document.body.classList.toggle(
        "light"
    );

    if(
        document.body.classList.contains(
            "light"
        )
    ){

        themeBtn.innerHTML = "☀️";

        localStorage.setItem(
            "theme",
            "light"
        );

    }else{

        themeBtn.innerHTML = "🌙";

        localStorage.setItem(
            "theme",
            "dark"
        );

    }

}
);

// Load Theme

if(
localStorage.getItem("theme")
=== "light"
){

    document.body.classList.add(
        "light"
    );

    themeBtn.innerHTML = "☀️";

}

// ===== Voice Recognition =====

if(
'webkitSpeechRecognition'
in window
){

const recognition =
new webkitSpeechRecognition();

recognition.lang = "en-US";

voiceBtn.addEventListener(
"click",
() => {

    recognition.start();

}
);

recognition.onresult =
(event) => {

taskInput.value =
event.results[0][0].transcript;

};

}

// ===== AI Suggestions =====

const suggestions = [

"Learn JavaScript for 30 minutes",

"Build a portfolio project",

"Practice DSA questions",

"Read a tech article",

"Update LinkedIn profile",

"Watch a coding tutorial",

"Drink Water 💧",

"Go for a short walk 🚶",

"Review notes",

"Push code to GitHub"

];

aiBtn.addEventListener(
"click",
() => {

const randomTask =

suggestions[
Math.floor(
Math.random() *
suggestions.length
)
];

suggestionText.textContent =
"🤖 " + randomTask;

}
);

// ===== Cursor Glow =====

const glow =
document.querySelector(
".cursor-glow"
);

document.addEventListener(
"mousemove",
e => {

glow.style.left =
e.clientX + "px";

glow.style.top =
e.clientY + "px";

}
);

// ===== Particles =====

particlesJS(
"particles-js",
{
particles:{

number:{
value:80
},

size:{
value:3
},

move:{
speed:2
},

color:{
value:"#00ffff"
},

line_linked:{
enable:true,
color:"#00ffff"
}

}
}
);

// ===== Initial Render =====

renderTasks();
