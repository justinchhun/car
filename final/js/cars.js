$(document).ready(function() {
  $.getJSON("json/cars.json", function(data) {
    var carList = $("#car-list");
    var cartItems = [];

    $.each(data.cars, function(index, car) {
      var background = $("<div class='card'></div>");
      var header = $("<div class='card-header'>" + car.brand + " " + car.model + "</div>");
      var body = $("<div class='card-body'></div>");
      var item = $("<p class='card-title'>" + car.model_year + " " + car.category + "</p>");
      var mileage = $("<p class='card-text'>" + parseInt(car.mileage) + " km" + "</p>");
      var petty = $("<p class='card-text'>" + car.fuel_type + "</p>");
      var seats = $("<p class='card-text'>" + parseInt(car.seats) + " seats" + "</p>");
      var description = $("<p class='card-text'>" + car.description + "</p>");
      var price = $("<p class='card-text price'>$" + parseInt(car.price_per_day) + " / day</p>");
      var button = $("<input type='button' class='cart' data-car-id='" + car.model + "' value='Add to Cart'>");

      var imgSrc = getImageSrc(car.model);
      var photo = $("<img src='" + imgSrc + "' class='card-img-top'>");

      if (car.availability === true) {
        button.addClass("available");
      } 
      
      else {
        button.addClass("unavailable");
       // button.attr("disabled", "disabled");
      }

      button.click(function() {
        var carId = button.data('car-id');
        var selectedCar = data.cars.find(car => car.model === carId);

        if (selectedCar.availability === false) {
            alert('Sorry the ' + selectedCar.brand + ' ' + selectedCar.model + ' is not available now. Please try other cars.');
          
          }
        
        
        else {
          var carExists = cartItems.some(item => item.model === selectedCar.model);

          if (!carExists) {
            selectedCar.image = getImageSrc(selectedCar.model);
            cartItems.push(selectedCar);
            updateCartDisplay();
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
          }
        }
      });


      background.append(photo);
      body.append(item);
      body.append(mileage);
      body.append(petty);
      body.append(seats);
      body.append(price);
      body.append(description);
      body.append(button);
      background.append(header);
      background.append(body);
      carList.append(background);
    });

    function updateCartDisplay() {
      var cart = $('#cart-list');
      cart.empty();

      if (cartItems.length === 0) {
        cart.append('<p>No items in cart</p>');
      }
      
      else {
        var priceTotal = 0;
        $.each(cartItems, function(index, item) {
          var items = $('<li></li>');
          items.append('<p>' + item.brand + ' ' + item.model + ' - ' + item.price_per_day + '/day</p>');
          cart.append(items);
          priceTotal += parseInt(item.price_per_day);
        });

        $('#cart-total').text('$' + priceTotal);
      }
    }

    function getImageSrc(model) {
      var imageSrc = "";
      if (model === "Camry") {
        imageSrc = "camryy.png";
      } else if (model === "Puma") {
        imageSrc = "puma.png";
      } else if (model === "i30") {
        imageSrc = "i30.png";
      } else if (model === "s2000") {
        imageSrc = "s20000.png";
      } else if (model === "Impreza WRX") {
        imageSrc = "impreza.png";
      } else if (model === "V-Class") {
        imageSrc = "vclass.png";
      } else if (model === "Civic") {
        imageSrc = "civic.png";
      } else if (model === "CX-9") {
        imageSrc = "cx9.0.png";
      } else if (model === "Skyline GTR R34") {
        imageSrc = "gtr.jpg";
      } else if (model === "Corolla") {
        imageSrc = "corollaa.png";
      }
      return "images/" + imageSrc;
    }
  });
});
