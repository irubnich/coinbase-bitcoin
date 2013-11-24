$(function() {

	var expletives = [
		"GODDAMN SON IT'S FUCKING"
	];

	// Magic price function
	getPrice = function(currencyCode) {
		var price = $("#price span#the-price");
		price.html("HOLD YOUR SHIT I'M UPDATING");
		$.ajax({
			url: "/" + currencyCode,
			success: function(data) {
				// Get date
				var date = moment();

				// Parse price
				var priceData = parseFloat(data).toFixed(2).replace(/./g, function(c, i, a) {
    				return i && c !== "." && !((a.length - i) % 3) ? "," + c : c;
				});

				// Set HTML
				$("span#expletive").html(expletives[0]);
				price.html(priceData);
				$("#last-updated span").html(date.format("hh:mm:ss A"));
				$("title").html(priceData + " " + currencyCode + " | WHAT'S THE FUCKING PRICE OF BITCOIN?");
			},
			error: function() {
				$("#price").html("SOMETHING WENT FUCKING WRONG. REFRESH THIS PAGE. DO IT!");
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
	}, 20000);

});