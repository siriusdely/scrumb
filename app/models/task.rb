class Task < ApplicationRecord
  belongs_to :scrum
  belongs_to :owner, class_name: 'User', foreign_key: 'user_id', required: false
  has_one :discussion, as: :topicable, dependent: :destroy

  validates_presence_of :title

  STATES = %i[unstarted started finished delivered rejected accepted]

  def state=(state)
    state = state.to_sym
    self.states_mask =
      STATES.include?(state) ? 2**STATES.index(state) : 0
  end

  def state
    STATES.find do |bt|
      ((states_mask.to_i || 0) & 2**STATES.index(bt)).nonzero?
    end
  end

  def toggle_state
    self.state = self.state == :finished ? :unstarted : :finished
    self.save
  end

  def as_json(*)
    super(only: %i[id title description],
          methods: :state, include: {
            owner: {
              only: [:id], methods: %i[
                full_name avatar_url initials
              ]
            }
          }
         )
  end
end
