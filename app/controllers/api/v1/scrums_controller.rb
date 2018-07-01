class Api::V1::ScrumsController < ApiController
  before_action :set_scrum, only: [:show, :update, :destroy]
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
    @scrum = Scrum.find(params[:id])
    @day = @scrum.days.first

    data = @day.as_json only: :created_at
    data[:scrum] = @scrum.as_json :only => [:id, :title, :description]
    data[:users] = []
    @day.rotations.includes(:user, :task).group_by(&:user).each do |user, rotations|
      user = user.as_json :only => [:id, :email], :methods => :avatar_url
      user[:rotations] = []
      rotations.each do |rotation|
        user[:rotations] << (rotation.as_json :only => :id, :include => {
          :task => {
            :only => [:id, :title], :include => {
              :owner => {
                :only => [:id, :email], :methods => :avatar_url
              }
            }
          }
        })
      end
      data[:users] << user
    end

    render json: data
    # render json: @day.to_json(:only => :created_at,
    #   :include => [{ :scrum => { :only => [:id, :title, :description] } },
    #     { :rotations => { :only => :id,
    #       :include => { :task => { :only => [:id, :title],
    #         :include => { :owner => { :only => [:id, :email], :methods => :avatar_url } } } } } }])
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
