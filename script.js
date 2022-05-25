const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')


// Selection of id's and classes from html document
const bgclr = document.getElementById("clr");
const headingg = document.querySelector(".head");

// Here we are adding event listener which
// is used to detect the mouse movement
bgclr.addEventListener("input", () => {
    // This updates the background color which is
    // picked by the user from the picker
    document.body.style.backgroundColor = bgclr.value;

    // This is the conditional statement that is used
    // to change the text color from BLACK to WHITE
    // when the background color changes to dark!
    if (
        bgclr.value.includes("00") ||
        bgclr.value.includes("0a") ||
        bgclr.value.includes("0b") ||
        bgclr.value.includes("0c") ||
        bgclr.value.includes("0d") ||
        bgclr.value.includes("0e") ||
        bgclr.value.includes("0f")
    ) {
        headingg.style.color = "#fff";
    } else {
        headingg.style.color = "#000";
    }
});

const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function getLength() {
    var element = document.getElementById('message-input');
    var length = element.value.length;

    document.getElementById("demo").innerHTML = length;

}

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}