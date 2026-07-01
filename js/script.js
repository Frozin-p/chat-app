const messagesList = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const chatForm = document.getElementById("chat-form");

const botReplies = [
    "Привет! Чем могу помочь?",
    "Интересно, расскажи подробнее!",
    "Понял тебя, продолжай.",
    "Хм, дай подумаю...",
    "Звучит разумно!",
    "Не уверен что понял, можешь повторить?",
    "Отличная идея!",
    "Я с тобой полностью согласен.",
    "Это сложный вопрос...",
    "Давай разберёмся вместе.",
    "Ты уверен в этом?",
    "Хорошо, запомнил.",
    "Мне нужно больше информации.",
    "Всё понятно, спасибо!",
    "Интересная точка зрения.",
    "Не могу с этим не согласиться.",
    "Попробуй ещё раз.",
    "Это именно то, что я думал!",
    "Подожди, я обрабатываю запрос...",
    "Окей, что дальше?",
    "Ты задаёшь правильные вопросы.",
    "Дай мне секунду...",
    "Я не совсем понимаю, объясни иначе.",
    "Звучит как план!",
    "Хороший вопрос, кстати."
];

let messages = JSON.parse(localStorage.getItem('messages')) || [];

function saveMessages() {
    localStorage.setItem('messages', JSON.stringify(messages));
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return (`${hours}:${minutes}`);
}

function showTypingIndicator() {
    document.querySelectorAll('.dot').forEach(dot => dot.classList.add('visible'));
}

function removeTypingIndicator() {
    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('visible'));
}

function createMessageElement(type, text, time) {
    const li = document.createElement('li');
    if (type === 'user') {
        li.classList.add('message-user');
    }
    else {
        li.classList.add('message-bot');
    }

    const avatar = document.createElement('img');
    if (type === 'user') {
        avatar.src = "https://i.pravatar.cc/40?img=7";
    }
    else {
        avatar.src = "https://i.pravatar.cc/40?img=3";
    }
    avatar.classList.add('avatar');

    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');

    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    textSpan.classList.add('message-text');

    const timeSpan = document.createElement('span');
    timeSpan.textContent = time;
    timeSpan.classList.add('message-time');

    bubble.appendChild(textSpan);
    bubble.appendChild(timeSpan);
    li.appendChild(avatar);
    li.appendChild(bubble);

    return li;
}

function sendMessage(text) {
    const time = getCurrentTime();
    const li = createMessageElement('user', text, time);

    messagesList.appendChild(li);
    messagesList.scrollTop = messagesList.scrollHeight;
    messageInput.value = "";
    sendBtn.disabled = true;

    showTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        botReply();
    }, 1500);

    messages.push({type: 'user', text: text, time: time});
    saveMessages();
}

function botReply() {
    const time = getCurrentTime();
    const botText = botReplies[Math.floor(Math.random() * botReplies.length)];
    const li = createMessageElement('bot', botText, time);

    messagesList.appendChild(li);
    messagesList.scrollTop = messagesList.scrollHeight;

    messages.push({ type: 'bot', text: botText, time: time});
    saveMessages();
}

function renderMessages() {
    messages.forEach(msg => {
        const li = createMessageElement(msg.type, msg.text, msg.time);
        messagesList.appendChild(li);
    });
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

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const icon = themeToggle.querySelector("i");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
});

renderMessages();