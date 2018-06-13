class Topic < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :users, through: :messages

  validates_presence_of :title
end
