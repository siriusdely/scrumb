FactoryBot.define do
  factory :membership do
    scrum nil
    user nil
    roles_mask 1

    trait :with_user_and_scrum do
      scrum
      user
    end
  end
end
