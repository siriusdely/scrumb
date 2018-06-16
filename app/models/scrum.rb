class Scrum < ApplicationRecord
  has_many :days, dependent: :destroy
  has_many :items, dependent: :destroy

  validates_presence_of :title, :description
end
