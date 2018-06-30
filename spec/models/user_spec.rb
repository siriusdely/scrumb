require "rails_helper"

RSpec.describe User, type: :model do
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password) }

  it { should have_many(:memberships).dependent(:destroy) }
  it { should have_many(:scrums) }
  it { should have_many(:tasks) }

  it { should have_many(:messages) }
  it { should have_many(:discussions) }
end
