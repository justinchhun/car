$(document).ready(function() {
    var cartList = $('#cart-list');
    var storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      cartItems = JSON.parse(storedCartItems);
      updateCartDisplay();
    } else {
      cartList.append('<p>No items in cart</p>');
    }
  
    function updateCartDisplay() {
      cartList.empty();
      if (cartItems.length === 0) {
        cartList.append('<p>No items in cart</p>');
      } else {
        $.each(cartItems, function(index, item) {
          var listItem = $('<li></li>');
          listItem.append('<p>' + item.brand + ' ' + item.model + ' - ' + item.price_per_day + '/day</p>');
          cartList.append(listItem);
        });
      }
    }
  });
  