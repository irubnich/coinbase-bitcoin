REDIS = Redis.connect(:url => ENV["REDISTOGO_URL"], :password => ENV["REDISTOGO_PASS"])