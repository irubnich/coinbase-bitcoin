class Price < ActiveRecord::Base
	validates :currency, presence: true
	validates :value, presence: true
end
