# frozen_string_literal: true

require 'rails_helper'

# Test suite for Scrum model
RSpec.describe Scrum, type: :model do
  # Association test
  it { should have_many(:memberships).dependent(:destroy) }
  it { should have_many :users }
  it { should have_many(:days).dependent(:destroy) }
  # ensure Scrum model has a 1:m relationship with the Task model
  it { should have_many(:tasks).dependent(:destroy) }

  # Validation tests
  # ensure columns title and description are present before saving
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }
end
