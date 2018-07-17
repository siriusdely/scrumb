require "rails_helper"

RSpec.describe User, type: :model do
  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password) }

  it { should respond_to :full_name }
  it { should respond_to :initials }
  it { should respond_to :avatar_url }

  it { should have_many(:memberships).dependent(:destroy) }
  it { should have_many(:scrums) }
  it { should have_many(:tasks) }

  it { should have_many :rotations }
  it { should have_many :todos }

  it { should have_many(:messages) }
  it { should have_many(:discussions) }
end
