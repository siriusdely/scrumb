require 'rails_helper'

RSpec.describe Day, type: :model do
  it { should belong_to(:scrum) }
  it { should validate_presence_of(:scrum).with_message(:required) }

  it { should have_many(:rotations).dependent(:destroy) }
  it { should have_many(:tasks) }
end
