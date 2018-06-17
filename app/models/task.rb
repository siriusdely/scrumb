class Task < ApplicationRecord
  belongs_to :scrum

  validates_presence_of :description
end
