require "test_helper"

class Ap1::V1::NewsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get ap1_v1_news_index_url
    assert_response :success
  end

  test "should get create" do
    get ap1_v1_news_create_url
    assert_response :success
  end
end
