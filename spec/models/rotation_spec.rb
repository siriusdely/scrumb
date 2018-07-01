require 'rails_helper'

RSpec.describe Rotation, type: :model do
  it { should belong_to(:day) }
  it { should validate_presence_of(:day).with_message(:required) }

  it { should belong_to(:task) }
  it { should validate_presence_of(:task).with_message(:required) }

  it { should belong_to :user }
  it { should validate_presence_of(:user).with_message(:required) }

  it { should respond_to :type }
end
