let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector('#close-cart');
let openCart = document.querySelector('#open-cart');
let cartItems = document.getElementsByClassName('cart-content')[0];

// Open cart
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

// Close cart
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// Cart working JS
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Function to handle cart functionality
function ready() {
    // Remove Items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCartButtons = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        button.addEventListener("click", addCartClicked);
    }

    // Update the total when the page loads
    updateTotal();
}





// Function to remove a cart item
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal(); // Update the total after removing an item
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;

        
    }
    updateTotal();
}

// Function to add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.parentElement; 
    var title = shopProduct.getElementsByClassName('product-title')[0].innerText;
    var price = shopProduct.getElementsByClassName('price')[0].innerText;
    var productImg = shopProduct.getElementsByTagName('img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();

}


function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItemsNames = cartItems.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert("You have already added this item to the cart");
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!--remove cart-->
        <i class='ri-delete-bin-6-line cart-remove'></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change", quantityChanged);
}

function updateTotal() {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector('.cart-price');
        var quantityElement = cartBox.querySelector('.cart-quantity');

        if (priceElement && quantityElement) {
            var priceText = priceElement.innerText.replace("KSH. ", "");
            var price = parseFloat(priceText);
            var quantity = parseFloat(quantityElement.value);

            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        }
    }

    var totalElement = document.querySelector('.total-price');
    if (totalElement) {
        totalElement.innerText = 'KSH. ' + total;
    }
}
