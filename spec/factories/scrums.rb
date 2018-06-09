FactoryBot.define do
  factory :scrum do
    title { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
  end
end
