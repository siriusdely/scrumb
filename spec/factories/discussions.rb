FactoryBot.define do
  factory :discussion do
    topic { Faker::Lorem.word }
    topicable nil
  end
end
