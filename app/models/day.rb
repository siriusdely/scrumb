class Day < ApplicationRecord
  belongs_to :scrum, required: true

  has_many :rotations, dependent: :destroy
  has_many :tasks, through: :rotations
end
