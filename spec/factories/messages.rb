# frozen_string_literal: true

FactoryBot.define do
  factory :message do
    user nil
    discussion nil
    content 'MyString'
  end
end
