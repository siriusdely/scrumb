class Rotation < ApplicationRecord
  belongs_to :day, required: true
  belongs_to :task, required: true
  belongs_to :user, required: true

  validates_presence_of :type

  validates_uniqueness_of :order, :scope => [:day_id, :user_id, :types_mask]
  # validates :order, uniqueness: { scope: [:day_id, :types_mask] }
  validates :order, :numericality => { :greater_than => 0 }, :allow_nil => false

  TYPES = %i[past yesterday today tomorrow future]

  def type=(type)
    type = type.to_sym
    self.types_mask =
      TYPES.include?(type) ? 2**TYPES.index(type) : 0
  end

  def type
    TYPES.find do |bt|
      ((types_mask.to_i || 0) & 2**TYPES.index(bt)).nonzero?
    end
  end
end