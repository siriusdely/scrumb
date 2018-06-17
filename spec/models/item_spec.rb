require "rails_helper"

# Test suite for the Task model
RSpec.describe Task, type: :model do
  # Association test
  # ensure an task record belongs to a single Scrum record
  it { should belong_to(:scrum) }

  # Validation test
  # ensure column description is present before saving
  it { should validate_presence_of(:description) }
end
