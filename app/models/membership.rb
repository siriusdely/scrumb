class Membership < ApplicationRecord
  belongs_to :scrum
  belongs_to :user

  validates_presence_of :role

  ROLES = %i[owner creator admin member]

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
