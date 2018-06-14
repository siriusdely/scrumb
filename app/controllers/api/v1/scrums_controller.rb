class Api::V1::ScrumsController < ApiController
  before_action :set_scrum, only: [:show, :update, :destroy]
  # GET /scrums
  def index
    @scrums = Scrum.select("id, title").all
    render json: @scrums.to_json
  end

  # GET /scrums/:id
  def show
    @scrum = Scrum.find(params[:id])
    render json: @scrum.to_json(:include => { :items => { :only => [:id, :description] } })
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
