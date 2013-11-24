class SiteController < ApplicationController

	CURRENCIES = ["AFN", "ALL", "DZD", "AOA", "ARS", "AMD", "AWG", "AUD", "AZN", "BSD", "BHD", "BDT", "BBD", "BYR", "BZD", "BMD", "BTN", "BOB", "BAM", "BWP", "BRL", "GBP", "BND", "BGN", "BIF", "KHR", "CAD", "CVE", "KYD", "XAF", "XPF", "CLP", "CNY", "COP", "KMF", "CDF", "CRC", "HRK", "CUP", "CZK", "DKK", "DJF", "DOP", "XCD", "EGP", "ERN", "EEK", "ETB", "EUR", "FKP", "FJD", "GMD", "GEL", "GHS", "GHS", "GIP", "GTQ", "GNF", "GYD", "HTG", "HNL", "HKD", "HUF", "ISK", "INR", "IDR", "IRR", "IQD", "ILS", "JMD", "JPY", "JPY", "JOD", "KZT", "KES", "KWD", "KGS", "LAK", "LVL", "LBP", "LSL", "LRD", "LYD", "LTL", "MOP", "MKD", "MGA", "MWK", "MYR", "MVR", "MRO", "MUR", "MXN", "MDL", "MNT", "MAD", "MZN", "MMK", "NAD", "NPR", "ANG", "TWD", "NZD", "NIO", "NGN", "KPW", "NOK", "OMR", "PKR", "PAB", "PGK", "PYG", "PEN", "PHP", "PLN", "QAR", "RON", "RUB", "RWF", "SHP", "SVC", "WST", "SAR", "RSD", "SCR", "SLL", "SGD", "SBD", "SOS", "ZAR", "KRW", "LKR", "SDG", "SRD", "SZL", "SEK", "CHF", "SYP", "STD", "TJS", "TZS", "THB", "TOP", "TTD", "TND", "TRY", "TMM", "UGX", "UAH", "AED", "USD", "UYU", "UZS", "VUV", "VEF", "VND", "XOF", "YER", "ZMK", "ZWL"]

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
		@currencies = CURRENCIES
	end
end
