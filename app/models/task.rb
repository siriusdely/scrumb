class Task < ApplicationRecord
  belongs_to :scrum
  belongs_to :owner, class_name: 'User', foreign_key: 'user_id', required: false
  has_one :discussion, as: :topicable, dependent: :destroy

  validates_presence_of :title
end
