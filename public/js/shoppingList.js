export default function shoppingList() {
  const addItemInput = document.getElementById("addItemInput");
  const submitBtn = document.getElementById("submitBtn");
  const productList = document.getElementById("productList");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (addItemInput.value.length > 0) {
      firebase.database().ref("shoppingList").push().set({
        item: addItemInput.value,
      });

      addItemInput.value = "";
    } else {
      return;
    }
  });

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

  firebase
    .database()
    .ref("shoppingList")
    .on("child_removed", (snapshot) => {
      const button = document.querySelector("#item-" + snapshot.key);
      button.parentNode.removeChild(button);
    });

  function removeElements() {
    const container = document.getElementById("productList");
    container.onclick = (event) => {
      if (event.target && event.target.classList.contains("delete-button")) {
        deleteItem(event.target);
      }
    };
  }

  removeElements();

  function deleteItem(self) {
    const itemId = self.getAttribute("data-Item");

    firebase.database().ref("shoppingList").child(itemId).remove();
  }
}
