class Api::V1::ScrumsController < ApiController
  before_action :set_scrum, only: [:show, :update, :destroy, :today]
  # GET /scrums
  def index
    @scrums = @current_user.scrums
    render json: @scrums.to_json
  end

  # GET /scrums/:id
  def show
    render json: @scrum.to_json(:include => { :tasks => { :only => [:id, :title] } })
  end

  def today
    day = @scrum.days.first

    data = day.as_json only: :created_at
    data[:scrum] = @scrum.as_json :only => [:id, :title, :description]
    users = []

    memberships = {}
    @scrum.memberships.each do |membership|
      memberships[membership.user_id] = membership
    end

    day.rotations.includes(:user, task: :owner).group_by(&:user).each do |user, rotations|
      usr = user.as_json :only => [:id, :email], :methods => :avatar_url
      usr[:role] = memberships[user.id].role
      usr[:order] = memberships[user.id].order

      rotations = rotations.group_by(&:type).sort do |a, b|
        Rotation::TYPES.index(a[0]) <=> Rotation::TYPES.index(b[0])
      end

      usr[:rotations] = []
      rotations.each do |type, rotation|
        rttn = { :type => type, :name => type.to_s.capitalize }
        rttn[:name] = 'Helps Needed' if type == :tomorrow
        rttn[:tasks] = []
        rotation.sort_by(&:order).each do |r|
          task = (r.task.as_json :only => [:id, :title], :include => {
            :owner => {
              :only => [:id, :email], :methods => :avatar_url
            }
          })
          task[:order] = r.order
          rttn[:tasks] << task
        end
        usr[:rotations] << rttn
      end
      users << usr
    end

    users = users.sort do |a, b|
      Membership::ROLES.index(a[:role]) <=> Membership::ROLES.index(b[:role])
    end

    data[:users] = users

    render json: data
  end

  def create
    @scrum = Scrum.create!(scrum_params)
    json_response(@scrum, :created)
  end

  def update
    @scrum.update(scrum_params)
    head :no_content
  end

  def destroy
    @scrum.destroy
    head :no_content
  end

  private

  def scrum_params
    # whitelist params
    params.permit(:title, :description)
  end

  def set_scrum
    @scrum = Scrum.find(params[:id])
  end
end
