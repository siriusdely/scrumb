# frozen_string_literal: true

FactoryBot.define do
  factory :discussion do
    topic { Faker::Lorem.word }
    topicable nil
  end
end
