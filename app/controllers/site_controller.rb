class SiteController < ApplicationController
	def price
		# set currency
		unless params.has_key?(:currency)
			params[:currency] = "USD"
		end

		# check memory store
		if REDIS.get(params[:currency])
			render :json => REDIS.get(params[:currency])
			return
		end

		# get whole enchilada
		response = HTTParty.get('https://coinbase.com/api/v1/currencies/exchange_rates')

		# parse
		json = JSON.parse(response.body)

		# set redis
		currency_lower = params[:currency].downcase
		REDIS.setex(params[:currency], 15, json["btc_to_" + currency_lower])

		# render
		render :json => json["btc_to_" + currency_lower]
	end
	def index
	end
end
