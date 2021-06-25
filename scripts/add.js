const addItemBtn = document.getElementById("add");
const table = document.getElementById('tableItems')
const empty = document.querySelector('.noItems')
const tableItems = document.getElementById('itemTable')
let allItems = [];
let statusMsg = "";

const status = (quantity) => {
  if(quantity === 0){
    statusMsg = `<h5 class="outOfStock">Out of stock</h5>`
  }
  else if(quantity > 0 && quantity < 21){
    statusMsg = `<h5 class="almostOutOfStock">Almost out of stock</h5>`
  }
  else{
    statusMsg = `<h5 class="inOfStock">In stock</h5>`
  }
}

const addItem = () => {
  let itemName = document.getElementById("itemName").value;
  let description = document.getElementById("itemDescription").value;
  let categories = document.getElementById("itemCategories").value;
  let quantity = document.getElementById("itemQuantity").value;

  let items = {
    name: itemName,
    description: description,
    category: categories,
    quantity: quantity,
  };

  allItems.push(items);

  localStorage.setItem("allItems", JSON.stringify(allItems));

  closeItemHandler();
  reset();
  updateSummary();
  noInventory();
  document.getElementById("itemTable").classList.remove("hideMe");
  location.reload();
};

const addTable = (id, items) => {
  let itemHtml = ""
  status(Number(items.quantity));

  itemHtml = `
    <tr>
    <td>${id}</td>
    <td>${items.name}</td>
    <td>${items.description}</td>
    <td>${items.category}</td>
    <td>${items.quantity}</td>
    <td>${statusMsg}</td>

    <td>
        <button id="updateItem_${id}" onClick="updateItemHandler(this.id)">Update</button>
        <button id="deleteItem_${id}" onClick="deleteItem(this.id)">Delete</button>
    </td>
    </tr>
    `;
  table.innerHTML += itemHtml;

};

let noInventory = () => {
  if (allItems = '') {
    empty.style.display = 'block';
    tableItems.classList('invisible')
  } else {
    empty.style.display = 'none'
  }
}



const reset = () => {
  document.getElementById("itemName").value = "";
  document.getElementById("itemDescription").value = "";
  document.getElementById("itemCategories").value = "";
  document.getElementById("itemQuantity").value = "";
};

const pageLoad = () => {
  let dummyItems = JSON.parse(localStorage.getItem("allItems"));

  if (dummyItems === null || dummyItems .length === 0) {
    document.getElementById("noItemCover").classList.remove("hideMe");
    document.getElementById("itemTable").classList.add("hideMe");
  } else {
    allItems = dummyItems;
    for (let i = 0; i < allItems.length; i++) {
      console.log(i);
      addTable(i, allItems[i]);
    }
    document.getElementById("noItemCover").classList.add("hideMe");
  }
}

const update = () => {

  let dummyItems = JSON.parse(localStorage.getItem("allItems"));

  let item ={
    name:document.getElementById("updateItemName").value,
    description:document.getElementById("updateItemDescription").value,
    category:document.getElementById("updateItemCategory").value,
    quantity:document.getElementById("updateItemQuantity").value
  }

  dummyItems[updateId] = item;

  localStorage.setItem("allItems",JSON.stringify(dummyItems))
  closeUpdateItemHandler();
  location.reload();
}

const deleteItem = (id) => {
  let deleteId = Number(String(id).split("_")[1]);
  if(confirm(`Do you want to delete "${allItems[deleteId].name}"?`)){
    allItems.splice(deleteId,1);
    localStorage.setItem("allItems",JSON.stringify(allItems));
    location.reload();
  }
} 

addItemBtn.addEventListener("click", addItem);
pageLoad();