require 'rails_helper'

RSpec.describe Rotation, type: :model do
  before do
    @rotation = FactoryBot.create(:rotation)
  end

  it { should belong_to(:day) }
  it { should validate_presence_of(:day).with_message(:required) }

  it { should belong_to(:task) }
  it { should validate_presence_of(:task).with_message(:required) }

  it { should belong_to :user }
  it { should validate_presence_of(:user).with_message(:required) }

  it { should respond_to :type }

  it { should validate_uniqueness_of(:order).scoped_to([:day_id, :user_id, :types_mask]) }
  it { should validate_numericality_of :order }
  it { should_not allow_value(-1).for(:order) }
  it { should_not allow_value(0).for(:order) }
  it { should_not allow_value(nil).for(:order) }
end
