const cartItems = {}; // Object to store item details


//Added Event Listener to Carts
document.addEventListener('click', function (event) {
    const clickedElement = event.target.closest('.add');


    if (clickedElement) {
        const itemName = clickedElement.getAttribute('data-name');
        const itemPrice = parseFloat(clickedElement.getAttribute('data-price'));


        // Update or add item details in the cartItems object
        if (cartItems[itemName]) {
            cartItems[itemName].quantity += 1;
        }

        else {
            cartItems[itemName] = {
                price: itemPrice,
                quantity: 1
            };

            updateItemNumber(); // Update item number when a new item is added

        }
    }
    
});


//Built Update Function
function updateItemNumber() {
    const itemCount = document.getElementById('item-count');
    let currentItemCount = parseInt(itemCount.textContent);
    currentItemCount += 1;
    itemCount.textContent = currentItemCount;
}



//Added Event Listener to the Main Cart
const cart = document.getElementById('cart');
const cartPopup = document.getElementById("cart-popup");
const checkoutItems = document.getElementById("checkout-items")
const bill = document.getElementById("total-amount")
const checkout = document.querySelector("#checkout")
let amountTotal = 0;



cart.addEventListener('click', function () {
    cartPopup.classList.toggle("show")

    checkoutItems.innerHTML = '';   // Clear the existing content in checkoutItems

    amountTotal = 0   // Initialize the total amount

    for (const [itemTitle, itemInfo] of Object.entries(cartItems)) {

        checkoutItems.innerHTML += `<p> ${itemTitle} : ${itemInfo.price} (${itemInfo.quantity}) </p>`

        // Calculate item total and add it to the total amount
        const itemTotal = itemInfo.price * itemInfo.quantity;
        amountTotal += itemTotal;
    }

    bill.innerHTML = amountTotal
    whatsappLink = "https://api.whatsapp.com/send?phone=918114720014&text=Order%20details"
    whatsappApi()
});




//Whatsapp Api

let whatsappLink = "https://api.whatsapp.com/send?phone=918114720014&text=Order%20details"

function whatsappApi() {

    for (const [itemTitle, itemInfo] of Object.entries(cartItems)) {

        whatsappLink += "%0A" + itemTitle + ":" + "%20" + "Rs." + itemInfo.price + "%20" + "(" + itemInfo.quantity + ")"

    }

    whatsappLink += "%0A" + "The total amount is Rs." + amountTotal
}


checkout.addEventListener("click", () => {
    window.open(whatsappLink)
})