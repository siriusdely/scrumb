require "rails_helper"

# Test suite for the Task model
RSpec.describe Task, type: :model do
  # Association test
  # ensure a task record belongs to a single Scrum record
  it { should belong_to(:scrum) }
  it { should belong_to(:user) }

  # Validation test
  # ensure column description is present before saving
  it { should validate_presence_of :title }
  it { should_not validate_presence_of :user }

  it { should have_one(:discussion).dependent(:destroy) }
  it { should_not validate_presence_of :discussion }
end
