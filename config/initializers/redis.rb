if Rails.env.production?
	REDIS = Redis.connect(:url => ENV["REDISTOGO_URL"])
else
	REDIS = Redis.connect
end
