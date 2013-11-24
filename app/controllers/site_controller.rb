class SiteController < ApplicationController
	def price
		response = HTTParty.get('https://coinbase.com/api/v1/currencies/exchange_rates')
		render :json => response.body
	end
	def index
	end
end
