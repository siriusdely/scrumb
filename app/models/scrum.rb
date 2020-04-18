# frozen_string_literal: true

class Scrum < ApplicationRecord
  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships
  has_many :days, dependent: :destroy
  has_many :tasks, dependent: :destroy

  validates :title, :description, presence: true
end
