require 'rails_helper'

RSpec.describe Discussion, type: :model do
  it { should validate_presence_of(:topic) }

  it { should have_many(:messages).dependent(:destroy) }
  it { should have_many(:users) }
end
