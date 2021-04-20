export default function shoppingList() {
  const addItemInput = document.getElementById("addItemInput");
  const submitBtn = document.getElementById("submitBtn");
  const productList = document.getElementById("productList");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    firebase.database().ref("shoppingList").push().set({
      item: addItemInput.value,
    });

    addItemInput.value = "";
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

      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("data-Item", snapshot.key);
      deleteButton.innerText = "D";
      deleteButton.addEventListener("click", () => {
        deleteitem(deleteButton);
      });

      itemContainer.appendChild(deleteButton);
    });

  function deleteitem(self) {
    const itemId = self.getAttribute("data-Item");

    firebase.database().ref("shoppingList").child(itemId).remove();
  }

  firebase
    .database()
    .ref("shoppingList")
    .on("child_removed", (snapshot) => {
      const button = document.querySelector("#item-" + snapshot.key);
      button.parentNode.removeChild(button);
    });
}
