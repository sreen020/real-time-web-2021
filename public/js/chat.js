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

      firebase.database().ref("message").push().set({
        sender: handle.value,
        message: message.value,
      });

      message.value = "";
    }

    if (messages.length > 0) {
      errorElement.innerText = messages.join(", ");
    }
  });
}

// socket.on("chatMessage", (data) => {
//   feedback.innerHTML = "";
//   output.innerHTML +=
//     "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
// });

firebase
  .database()
  .ref("message")
  .on("child_added", (snapshot) => {
    feedback.innerHTML = "";
    output.innerHTML +=
      "<div class=" +
      "message-container" +
      "  id=" +
      "message-" +
      snapshot.key +
      "><p><strong>" +
      snapshot.val().sender +
      ": </strong>" +
      snapshot.val().message;
    +"</p></div>";

    if (handle.value == snapshot.val().sender) {
      const messageContainer = document.getElementById(
        "message-" + snapshot.key
      );
      messageContainer.innerHTML +=
        "<button data-id=" +
        snapshot.key +
        " onclick=" +
        "deleteMessage(this)" +
        ">D</button>";
    }
  });

if (message) {
  message.addEventListener("keypress", () => {
    socket.emit("typing", handle.value);
  });
}

socket.on("typing", (data) => {
  feedback.innerHTML = "<p><em>" + data + ": is typing a message </em></p>";
});

function deleteMessage(self) {
  const messageId = self.getAttribute("data-id");

  firebase.database().ref("message").child(messageId).remove();
}

firebase
  .database()
  .ref("message")
  .on("child_removed", (snapshot) => {
    document.querySelector("#message-" + snapshot.key + " p").innerHTML =
      "this message has been removed";

    const button = document.querySelector(
      "#message-" + snapshot.key + " button"
    );
    button.parentNode.removeChild(button);
  });
