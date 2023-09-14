document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const cartItemsContainer = document.getElementById('cart-items');
    let totalAmount = 0;

    cartItems.forEach((item, index) => { // Fix: Added parentheses around the function arguments
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.price}</td>
            <td><button class="remove-button" data-index="${index}">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
        totalAmount += item.price;
    }); // Fix: Added closing parentheses

    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', function() {
        alert(`Total amount: Rs. ${totalAmount}`);
        alert('Order placed successfully !!');
    });

    // Add event listener to each remove button
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(button.getAttribute('data-index'));
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            location.reload(); // Refresh the page to reflect the changes
        });
    });
});