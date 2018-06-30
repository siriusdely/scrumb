class Task < ApplicationRecord
  belongs_to :scrum
  belongs_to :user, required: false
  has_one :discussion, as: :topicable, dependent: :destroy

  validates_presence_of :title
end
