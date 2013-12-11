$(function() {

	var expletives = [
		"GODDAMN SON IT'S FUCKING",
		"HOLY SHIT IT'S FUCKING",
		"SWEET JESUS IT'S FUCKING",
		"GET THE FUCK OUT OF HERE IT'S"
	];

	// Magic price function
	getPrice = function(currencyCode) {
		var price = $("#price span#the-price");
		var oldValue = parseFloat(price.html());
		price.html("HOLD YOUR SHIT I'M UPDATING");
		$.ajax({
			url: "/" + currencyCode,
			success: function(data) {
				// Check for some problem...
				if(data.error) {
					$("#price").html("SHIT, COINBASE FUCKED UP...");
					setInterval(function() {
						location.reload();
					}, 10000);
					return;
				}

				// Get date
				var date = moment();

				// Parse new value
				var newValue = parseFloat(data);

				// Parse price
				var priceData = newValue.toFixed(2).replace(/./g, function(c, i, a) {
    				return i && c !== "." && !((a.length - i) % 3) ? "," + c : c;
				});

				// Set HTML
				$("span#expletive").html(expletives[Math.floor(Math.random()*expletives.length)]);
				price.html(priceData);
				$("#last-updated span").html(date.format("hh:mm:ss A"));
				$("title").html(priceData + " " + currencyCode + " | WHAT'S THE FUCKING PRICE OF BITCOIN?");
			},
			error: function() {
				$("#price").html("SOMETHING WENT FUCKING WRONG.");
				location.reload();
			}
		});
	}

	// Select box
	$('#currency').customSelect();

	// Events
	$("#currency").change(function() {
		getPrice(this.value);
	});

	// Initial go
	var selectedCurrency = $("#currency")[0].value;
	getPrice(selectedCurrency);

	// Interval
	setInterval(function() {
		var selectedCurrency = $("#currency")[0].value;
		getPrice(selectedCurrency);
		ga('send', 'pageview');
	}, 5000);

});