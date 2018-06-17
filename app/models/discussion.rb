class Discussion < ApplicationRecord
  belongs_to :topicable, polymorphic: true

  has_many :messages, dependent: :destroy
  has_many :users, through: :messages

  validates_presence_of :topic
end
