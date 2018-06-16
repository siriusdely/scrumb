require 'rails_helper'

RSpec.describe Rotation, type: :model do
  it { should belong_to(:day) }
  it { should validate_presence_of(:day).with_message(:required) }

  it { should belong_to(:item) }
  it { should validate_presence_of(:item).with_message(:required) }
end
