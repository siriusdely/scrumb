# frozen_string_literal: true

require 'test_helper'

class ScrumsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @scrum = scrums(:one)
  end

  test 'should get index' do
    get scrums_url, as: :json
    assert_response :success
  end

  test 'should create scrum' do
    assert_difference('Scrum.count') do
      post scrums_url, params: { scrum: { description: @scrum.description, link: @scrum.link, items: @scrum.items, title: @scrum.title } }, as: :json
    end

    assert_response 201
  end

  test 'should show scrum' do
    get api_v1_scrum_url(@scrum), as: :json
    assert_response :success
  end

  test 'should update scrum' do
    patch scrum_url(@scrum), params: { scrum: { description: @scrum.description, link: @scrum.link, items: @scrum.items, title: @scrum.title } }, as: :json
    assert_response 200
  end

  test 'should destroy scrum' do
    assert_difference('Scrum.count', -1) do
      delete scrum_url(@scrum), as: :json
    end

    assert_response 204
  end
end
