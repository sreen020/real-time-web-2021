/**
 *
 */
export default function shoppingList() {
  const addItemInput = document.getElementById("addItemInput");
  const submitBtn = document.getElementById("submitBtn");
  const productList = document.getElementById("productList");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // the message will be send to the firebase database
    if (addItemInput.value.length > 0) {
      firebase.database().ref("shoppingList").push().set({
        item: addItemInput.value,
      });

      // Clear the message field
      addItemInput.value = "";
    } else {
      return;
    }
  });

  // When the is a new child in the "shoppingList" database, this function will be triggered
  // This function will add the new message to the client
  // There will be a remove button for each item
  firebase
    .database()
    .ref("shoppingList")
    .on("child_added", (snapshot) => {
      productList.innerHTML +=
        "<li id=" +
        "item-" +
        snapshot.key +
        " class=" +
        "listItem" +
        ">" +
        snapshot.val().item +
        "</li>";

      const itemContainer = document.getElementById("item-" + snapshot.key);

      const deleteButton = document.createElement("img");
      deleteButton.setAttribute("data-Item", snapshot.key);
      deleteButton.src = "./img/delete.svg";
      deleteButton.classList.add("delete-button");

      itemContainer.appendChild(deleteButton);
    });

  // When a child in the "shoppingList" database is removed, this function will be triggered
  // this function will remove the message on the client
  firebase
    .database()
    .ref("shoppingList")
    .on("child_removed", (snapshot) => {
      const button = document.querySelector("#item-" + snapshot.key);
      button.parentNode.removeChild(button);
    });

  // this function will trigger the function to remove from database
  function removeElements() {
    const container = document.getElementById("productList");
    container.onclick = (event) => {
      if (event.target && event.target.classList.contains("delete-button")) {
        deleteItem(event.target);
      }
    };
  }

  removeElements();

  // this function will remove the message from the database
  function deleteItem(self) {
    const itemId = self.getAttribute("data-Item");

    firebase.database().ref("shoppingList").child(itemId).remove();
  }
}
