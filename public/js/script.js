import shoppingList from "./shoppingList.js";
import chat from "./chat.js";

function init() {
  const chatContainer = document.getElementById("chat");
  const shoppingListContainer = document.getElementById("shopping-list-main");

  if (chatContainer) {
    chat();
  }
  if (shoppingListContainer) {
    shoppingList();
  }
}

init();
