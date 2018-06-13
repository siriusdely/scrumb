require 'rails_helper'

RSpec.describe Topic, type: :model do
  it { should validate_presence_of(:title) }

  it { should have_many(:messages).dependent(:destroy) }
  it { should have_many(:users) }
end
