
var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");

var searchInput = document.getElementById("searchInput");

var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var updateIndex = 0;

var productContainer = [];

if(localStorage.getItem("products") !=null){
productContainer = JSON.parse(localStorage.getItem("products"))
}


function addProduct(){

   if(validationName() ==true){
      var product= {
         name:productNameInput.value,
         price:productPriceInput.value,
         category:productCategoryInput.value,
         desc:productDescriptionInput.value
        }
     
        productContainer.push(product);
     
        localStorage.setItem("products",JSON.stringify(productContainer))
     
        clearForm();
     
       displayData();
   }

   
}

function clearForm(){
    productNameInput= "";
    productPriceInput= "";
    productCategoryInput= "";
    productDescriptionInput = "";
}

displayData();

function displayData(){
    var cartona = "";
   for(var i=0 ; i<productContainer.length ; i++ ){
    cartona+= ` <tr> 
    <td>${productContainer[i].name}</td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].category}</td>
    <td>${productContainer[i].desc}</td>
    <td>
    <button class="btn btn-outline-warning btn-sm" onclick="setData(${i})">Update</button>
    <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
    </td>
    </tr>`;
   }

  document.getElementById("tablebody").innerHTML = cartona;
}

function deleteProduct(elementNumber){
   productContainer.splice(elementNumber,1);
   localStorage.setItem("products",JSON.stringify(productContainer))
   displayData();
 
}

deleteProduct();

function searchProduct(){
   var term = searchInput.value;
   var cartona = "";
   for(var i=0 ; i<productContainer.length ; i++ ){
    
if(productContainer[i].name.toLowerCase().includes(term.toLowerCase() )  ){
    cartona+= ` <tr> 
    <td>${productContainer[i].name}</td>
    <td>${productContainer[i].price}</td>
    <td>${productContainer[i].category}</td>
    <td>${productContainer[i].desc}</td>
    <td>
    <button class="btn btn-outline-warning btn-sm">Update</button>
    <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
    </td>
    </tr>`;
}
}
}

function setData(index){

   updateIndex = index;
   var currentProduct = productContainer[index];
   
   productNameInput.value = currentProduct.name;
   productPriceInput.value = currentProduct.price;
   productCategoryInput.value = currentProduct.category;
   productDescriptionInput.value = currentProduct.desc;

   updateBtn.classList.remove("d-none");
   addBtn.classList.add("d-none");
}

function updateProduct(){
   var product= {
      name:productNameInput.value,
      price:productPriceInput.value,
      category:productCategoryInput.value,
      desc:productDescriptionInput.value
     }
  productContainer.splice(updateIndex , 1 ,product);

  localStorage.setItem("products",JSON.stringify(productContainer));
  displayData();

  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
}

function validationName(){
   var messageName = document.getElementById("messageName");
   var text = productNameInput.value;
   var regexName = /^[A-Z][a-z]{2,8}$/

   if(regexName.test(text) == true){
   productNameInput.classList.add('is-valid');
   productNameInput.classList.remove('is-invalid');
   messageName.classList.add('d-none');

   return true;

   }
   else{
   productNameInput.classList.add('is-invalid');
   productNameInput.classList.remove('is-valid');
   messageName.classList.remove('d-none');

   return false;

   }
}






 
// var btn = document.getElementById("demo");

// btn.addEventListener('click',sayHello);

// function sayHello(){
//    console.log("Hello");
// }


