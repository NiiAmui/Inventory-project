let addItemClick = document.querySelector(".addItem");
let modalHandler = document.querySelector(".backdrop");
let cancelAdd = document.querySelector(".cancelAdd");
let cancelUpdate = document.querySelector(".cancelUpdate");
let addModalHandler = document.querySelector(".addModal");
let updateModalHandler = document.querySelector("#updateItem");
let totalItems = document.querySelector("#totalItems");
let itemStock = document.querySelector("#itemStock");
let itemCategories = document.querySelector("#itemCategories");
let numberOfCategories = document.querySelector("#numberOfCategories");

let updateId = 0;

const updateSummary = () => {
  let total = 0;

  allItems.forEach((item) => {
    total += parseInt(item.quantity);
  });

  totalItems.innerText = total;
  itemStock.innerText = allItems.length;
  numberOfCategories.innerText = itemCategories.children.length;
};

const addItemHandler = () => {
  modalHandler.style.top = "0vh";
  addModalHandler.style.top = "50%";
};

const updateItemHandler = (id) => {
  updateId = Number(String(id).split("_")[1]);

  let dummyItems = JSON.parse(localStorage.getItem("allItems"));

  document.getElementById("updateItemName").value = dummyItems[updateId].name;
  document.getElementById("updateItemDescription").value = dummyItems[updateId].description;
  document.getElementById("updateItemCategory").value = dummyItems[updateId].category;
  document.getElementById("updateItemQuantity").value = dummyItems[updateId].quantity;

  

  modalHandler.style.top = "0vh";
  updateModalHandler.style.top = "50%";
};


const closeItemHandler = () => {
  modalHandler.style.top = "-110vh";
  updateModalHandler.style.top = "-50vh";
  addModalHandler.style.top = "-50vh";
  reset();
};

const closeUpdateItemHandler = () => {
  modalHandler.style.top = "-110vh";
  updateModalHandler.style.top = "-50vh";
  reset();
};


updateSummary();
addItemClick.addEventListener("click", addItemHandler);
modalHandler.addEventListener("click", closeItemHandler);
cancelAdd.addEventListener("click", closeItemHandler);
cancelUpdate.addEventListener("click", closeUpdateItemHandler);