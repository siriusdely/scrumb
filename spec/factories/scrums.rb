FactoryBot.define do
  factory :scrum do
    transient do
      user nil
    end

    title { Faker::Lorem.word }
    description { Faker::Lorem.sentence }

    trait :with_memberships do
      after(:create) do |scrum, evaluator|
        create(:membership, scrum: scrum, user: evaluator.user, role: :member, initials: evaluator.user.initials)
      end
    end
  end
end
