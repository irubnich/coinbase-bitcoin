var HMIAFB = {
	currencyCode: "USD",
	expletives: [
		"GODDAMN SON IT'S FUCKING",
		"HOLY SHIT IT'S FUCKING",
		"SWEET JESUS IT'S FUCKING",
		"GET THE FUCK OUT OF HERE IT'S"
	],

	getPrice: function(code) {
		this.currencyCode = code;
		$.ajax({
			url: "/" + this.currencyCode,
			success: this.updateSite.bind(this),
			error: function() {
				$("#price").html("SOMETHING WENT FUCKING WRONG. REFRESH THE PAGE. DO IT!");
			}
		});
	},

	updateSite: function(data) {
		var price = $("#price span#the-price");
		var oldValue = parseFloat(price.html());

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

		// Parse new price
		var newValue = parseFloat(data);
		var priceData = newValue.toPrice();

		// Set HTML
		$("span#expletive").html(this.expletives.random());
		price.html(priceData);
		$("#last-updated span").html(date.format("hh:mm:ss A"));
		$("title").html(priceData + " " + this.currencyCode + " | WHAT'S THE FUCKING PRICE OF BITCOIN?");
	}
};

// Get money get paid
$(function() {
	// Select box
	$('#currency').customSelect();

	// Events
	$("#currency").change(function() {
		HMIAFB.getPrice(this.value);
	});

	// Initial go
	var selectedCurrency = $("#currency")[0].value;
	HMIAFB.getPrice(selectedCurrency);

	// Interval
	setInterval(function() {
		var selectedCurrency = $("#currency")[0].value;
		HMIAFB.getPrice(selectedCurrency);
		ga('send', 'pageview');
	}, 10000);
});