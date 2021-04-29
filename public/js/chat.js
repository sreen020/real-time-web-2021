const socket = io.connect();

/**
 *
 */
export default function chat() {
  const message = document.getElementById("message");
  const handle = document.getElementById("handle");
  const button = document.getElementById("sendBtn");
  const output = document.getElementById("output");
  const feedback = document.getElementById("feedback");
  const errorElement = document.getElementById("error-msg");

  if (button) {
    // if user has not filled in a name, show error message
    button.addEventListener("click", (e) => {
      let messages = [];
      e.preventDefault();

      if (handle.value.length <= 0) {
        messages.push("Fill your name");
      } else {
        errorElement.innerText = "";

        // The sender and the message will be emitted
        if (message.value.length > 0) {
          socket.emit("chatMessage", {
            message: message.value,
            handle: handle.value,
          });

          // The sender and the message will also be send to the firebase database
          firebase.database().ref("message").push().set({
            sender: handle.value,
            message: message.value,
          });

          // Clear the message field
          message.value = "";
        } else {
          return;
        }
      }

      if (messages.length > 0) {
        errorElement.innerText = messages.join(", ");
      }
    });
  }

  // When the is a new child in the "message" database, this function will be triggered
  // This function will add the new message to the client
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

      // When name of the user from the new message is the same as the user using the chat
      // there will be a delete button to delete the message
      if (handle.value == snapshot.val().sender) {
        const messageContainer = document.getElementById(
          "message-" + snapshot.key
        );

        const deleteButton = document.createElement("img");
        deleteButton.setAttribute("data-id", snapshot.key);
        deleteButton.src = "./img/delete.svg";
        deleteButton.classList.add("delete-button");

        messageContainer.appendChild(deleteButton);
      }
    });

  // When user is typing there will be a messages displayed to other users
  if (message) {
    message.addEventListener("keypress", () => {
      socket.emit("typing", handle.value);
    });
  }

  socket.on("typing", (data) => {
    feedback.innerHTML = "<p><em>" + data + ": is typing a message </em></p>";
  });

  // this function will trigger the function to remove from database
  function removeElements() {
    const container = document.getElementById("output");
    container.onclick = (event) => {
      if (event.target && event.target.classList.contains("delete-button")) {
        deleteMessage(event.target);
      }
    };
  }

  removeElements();

  // this function will remove the message from the database
  function deleteMessage(self) {
    const messageId = self.getAttribute("data-id");

    firebase.database().ref("message").child(messageId).remove();
  }

  // when a child is removed from the database this function wille be called
  // this function will remove the message on the client
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
}
