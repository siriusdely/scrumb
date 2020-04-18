# frozen_string_literal: true

class Membership < ApplicationRecord
  belongs_to :scrum
  belongs_to :user

  validates :role, :initials, presence: true

  # validates :initials, length: { in: 1..3 }
  validates :initials, length: { in: 1..3 }

  # validates :user, uniqueness: { scope: :scrum }
  validates :initials, uniqueness: { scope: %i[scrum_id user_id] }
  validates :order, numericality: true, allow_nil: true

  ROLES = %i[owner creator admin member].freeze

  def role=(role)
    role = role.to_sym
    self.roles_mask =
      ROLES.include?(role) ? 2**ROLES.index(role) : 0
  end

  def role
    ROLES.find do |bt|
      ((roles_mask.to_i || 0) & 2**ROLES.index(bt)).nonzero?
    end
  end
end
