if Rails.env.production?
	REDIS = Redis.connect(:url => ENV["REDISTOGO_URL"], :password => ENV["REDISTOGO_PASS"])
else
	REDIS = Redis.connect
end