require 'rails_helper'

RSpec.describe Message, type: :model do
  it { should validate_presence_of(:content) }

  # it { should belongs_to(:user) }
  # it { should belongs_to(:topic) }
end
