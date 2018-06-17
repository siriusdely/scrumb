FactoryBot.define do
  factory :task do
    title { Faker::StarWars.character }
    scrum_id nil
  end
end
