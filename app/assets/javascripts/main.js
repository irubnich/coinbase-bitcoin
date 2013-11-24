$(function() {
		function getPrice() {
			var price = $("#price");
			price.html("I'M FUCKING UPDATING HOLD YOUR SHIT...");
			$.ajax({
				url: "/USD",
				success: function(data) {
					// Get date
					var date = moment();

					// Parse price
					var priceData = parseFloat(data).toFixed(2);

					// Set HTML
					price.html("GODDAMN SON IT'S FUCKING<br>$" + priceData);
					$("#last-updated span").html(date.format("hh:mm:ss A"));
					$("title").html("$" + priceData + " | WHAT'S THE FUCKING PRICE OF BITCOIN?");
				}
			});
		}
		getPrice();
		setInterval(getPrice, 20000);
	});