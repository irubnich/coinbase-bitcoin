$(function() {
		function getPrice() {
			var price = $("#price");
			price.html("I'M FUCKING UPDATING HOLD YOUR SHIT...");
			$.ajax({
				url: "/site/price",
				success: function(data) {
					var date = moment();
					var priceData = parseFloat(data.btc_to_usd).toFixed(2);
					price.html("GODDAMN SON IT'S FUCKING<br>$" + priceData);
					$("#last-updated span").html(date.format("hh:mm:ss A"));
				}
			});
		}
		getPrice();
		setInterval(getPrice, 20000);
	});