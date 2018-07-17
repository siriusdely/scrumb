FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email("#{first_name} #{last_name}") }
    pwd = Faker::Internet.password
    password { pwd }
    password_confirmation { pwd }

    # trait :with_scrums do
    #   after(:create) do |user|
    #     create_list(:scrum, 10, memberships: [{
    #       user: user, role: :admin
    #     }])
    #   end
    # end
  end
end
