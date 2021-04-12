const socket = io.connect("http://localhost:4000");

const message = document.getElementById("message");
const handle = document.getElementById("handle");
const button = document.getElementById("sendBtn");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

if (button) {
  button.addEventListener("click", () => {
    socket.emit("chatMessage", {
      message: message.value,
      handle: handle.value,
    });
    message.value = "";
  });
}

socket.on("chatMessage", (data) => {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

if (message) {
  message.addEventListener("keypress", () => {
    socket.emit("typing", handle.value);
  });
}

socket.on("typing", (data) => {
  feedback.innerHTML = "<p><em>" + data + ": is typing a message </em></p>";
});
