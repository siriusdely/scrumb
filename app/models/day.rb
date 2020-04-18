# frozen_string_literal: true

class Day < ApplicationRecord
  belongs_to :scrum, optional: false

  has_many :rotations, dependent: :destroy
  has_many :tasks, through: :rotations
end
