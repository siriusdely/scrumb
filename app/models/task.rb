class Task < ApplicationRecord
  belongs_to :scrum
  has_one :discussion, as: :topicable, dependent: :destroy

  validates_presence_of :title
end
