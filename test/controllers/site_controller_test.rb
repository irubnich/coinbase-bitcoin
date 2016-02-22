require 'test_helper'

class SiteControllerTest < ActionController::TestCase
  test "gets index" do
    get :index
    assert response.status, 200
  end

  test "gets price" do
    get :price
    assert response.status, 200
  end
end
