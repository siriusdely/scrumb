# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :user
  belongs_to :discussion

  validates :content, presence: true
end
