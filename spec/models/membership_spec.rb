# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Membership, type: :model do
  it { should validate_presence_of(:scrum).with_message(:required) }
  it { should validate_presence_of(:user).with_message(:required) }
  it { should validate_presence_of(:initials) }
  it { should validate_length_of(:initials).is_at_least(1).is_at_most(3) }
  it { should respond_to :role }
  it { should respond_to :status }
  # it { should validate_presence_of :role }
  # its(:attributes) { should include 'role' }
  it { should validate_numericality_of :order }
  it { should allow_value(-1).for(:order) }
  it { should allow_value(0).for(:order) }
  it { should allow_value(nil).for(:order) }

  context 'with a saved membership' do
    # pending "add some examples to (or delete) #{__FILE__}"

    setup do
      @membership = create :membership, :with_user_and_scrum
    end
    subject { @membership }

    it { is_expected.to have_attributes(role: :owner) }
    it { is_expected.to have_attributes(status: :invited) }
    # it { should validate_uniqueness_of(:user).scoped_to(:scrum) }
    it { should validate_uniqueness_of(:initials).scoped_to(:scrum_id, :user_id) }
  end
end
