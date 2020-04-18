# frozen_string_literal: true

class Discussion < ApplicationRecord
  belongs_to :topicable, polymorphic: true

  has_many :messages, dependent: :destroy
  has_many :users, through: :messages

  validates :topic, presence: true
end
