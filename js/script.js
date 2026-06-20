const messagesList = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const chatForm = document.getElementById("chat-form");

function sendMessage(text) {
    const li = document.createElement('li');
    li.textContent = text;
    li.classList.add('message-user');
    messagesList.appendChild(li);
    messageInput.value = "";
    sendBtn.disabled = true;
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


