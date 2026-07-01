const messagesList = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const chatForm = document.getElementById("chat-form");

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return (`${hours}:${minutes}`);
}

function sendMessage(text) {
    const li = document.createElement('li');
    const textSpan = document.createElement('span');
    const timeSpan = document.createElement('span');

    textSpan.textContent = text;
    textSpan.classList.add('message-text');

    timeSpan.textContent = getCurrentTime();
    timeSpan.classList.add('message-time');

    li.classList.add('message-user');
    li.appendChild(textSpan);
    li.appendChild(timeSpan);
    messagesList.appendChild(li);
    messageInput.value = "";
    sendBtn.disabled = true;
    botReply();
}

function botReply() {
    const li = document.createElement('li');
    const textSpan = document.createElement('span');
    const timeSpan = document.createElement('span');

    textSpan.textContent = "Привет! Я бот 🤖";
    textSpan.classList.add('message-text');

    timeSpan.textContent = getCurrentTime();
    timeSpan.classList.add('message-time');

    li.classList.add('message-bot');
    li.appendChild(textSpan);
    li.appendChild(timeSpan);
    messagesList.appendChild(li);
    messagesList.scrollTop = messagesList.scrollHeight;
}

messageInput.addEventListener("input", (e) => {
    if (messageInput.value.trim() === "") {
        sendBtn.disabled = true;
    }
    else {
        sendBtn.disabled = false;
    }
})

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = messageInput.value.trim();
    sendMessage(text);
})


