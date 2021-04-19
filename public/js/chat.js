const socket = io.connect();

const message = document.getElementById("message");
const handle = document.getElementById("handle");
const button = document.getElementById("sendBtn");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");
const errorElement = document.getElementById("error-msg");

if (button) {
  button.addEventListener("click", (e) => {
    let messages = [];
    e.preventDefault();

    if (handle.value.length <= 0) {
      messages.push("Fill your name");
    } else {
      errorElement.innerText = "";

      socket.emit("chatMessage", {
        message: message.value,
        handle: handle.value,
      });
      message.value = "";
    }

    if (messages.length > 0) {
      errorElement.innerText = messages.join(", ");
    }
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
