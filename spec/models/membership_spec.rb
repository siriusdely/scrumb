require 'rails_helper'

RSpec.describe Membership, type: :model do
  it { should validate_presence_of(:scrum).with_message(:required) }
  it { should validate_presence_of(:user).with_message(:required) }
  it { should respond_to :role }
  # it { should validate_presence_of :role }
  # its(:attributes) { should include 'role' }

  context "with a saved membership" do
    # pending "add some examples to (or delete) #{__FILE__}"

    setup do
      @membership = create :membership, :with_user_and_scrum
    end
    subject { @membership }

    it { is_expected.to have_attributes(:role => :owner) }
  end
end
