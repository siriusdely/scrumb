class Rotation < ApplicationRecord
  belongs_to :day, required: true
  belongs_to :task, required: true
end
