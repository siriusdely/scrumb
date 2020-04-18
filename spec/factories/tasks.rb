# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    title { Faker::StarWars.character }
    scrum
  end
end
