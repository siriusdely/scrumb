class Rotation < ApplicationRecord
  belongs_to :day, required: true
  belongs_to :item, required: true
end
