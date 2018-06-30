FactoryBot.define do
  factory :user do
    email 'foo@bar.com'
    password 'foobar'
    # password_confirmation 'foobar'

    # trait :with_scrums do
    #   after(:create) do |user|
    #     create_list(:scrum, 10, memberships: [{
    #       user: user, role: :admin
    #     }])
    #   end
    # end
  end
end
