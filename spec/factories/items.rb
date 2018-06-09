FactoryBot.define do
  factory :item do
    description { Faker::StarWars.character }
    scrum_id nil
  end
end
