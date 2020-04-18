# frozen_string_literal: true

FactoryBot.define do
  factory :membership do
    scrum nil
    user nil
    roles_mask 1
    initials { "#{user.first_name.first}#{user.last_name.last}".upcase }

    trait :with_user_and_scrum do
      scrum
      user
    end
  end
end
