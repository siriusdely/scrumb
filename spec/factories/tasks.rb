FactoryBot.define do
  factory :task do
    description { Faker::StarWars.character }
    scrum_id nil
  end
end
