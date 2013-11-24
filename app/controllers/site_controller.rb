class SiteController < ApplicationController
	def price
		# check memory store
		if REDIS.get("USD")
			render :json => REDIS.get("USD")
			return
		end

		# get whole enchilada
		response = HTTParty.get('https://coinbase.com/api/v1/currencies/exchange_rates')

		# parse
		json = JSON.parse(response.body)

		# set redis
		REDIS.setex("USD", 15, json["btc_to_usd"])

		# render
		render :json => json["btc_to_usd"]
	end
	def index
	end
end
