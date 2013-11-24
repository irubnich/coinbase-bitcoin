class SiteController < ApplicationController
	def price
		# get whole enchilada
		response = HTTParty.get('https://coinbase.com/api/v1/currencies/exchange_rates')

		# parse
		json = JSON.parse(response.body)

		# render
		render :json => json["btc_to_usd"]
	end
	def index
	end
end
