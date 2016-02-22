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
		var date = new Date();

		// Parse new price
		var newValue = parseFloat(data);
		var priceData = newValue.toPrice();

		// Set HTML
		$("span#expletive").html(this.expletives.random());
		price.html(priceData);
		$("#last-updated span").html(date.toString());
		$("title").html(priceData + " " + this.currencyCode + " | WHAT'S THE FUCKING PRICE OF BITCOIN?");
	},

	getPriceForSelection: function(field) {
		var selectedCurrency = field.val();
		HMIAFB.getPrice(selectedCurrency);
	}
};

// Get money get paid
$(function() {
	var field = $("#currency");
	field.customSelect();

	HMIAFB.getPriceForSelection(field);
	field.change(HMIAFB.getPriceForSelection.bind(this, field));

	// Polling
	setInterval(function() {
		HMIAFB.getPriceForSelection(field);
		ga('send', 'pageview');
	}, 10000);
});
