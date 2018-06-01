class ScrumsController < ApiController
  # GET /scrums
  def index
    @scrums = Scrum.select("id, title").all
    render json: @scrums.to_json
  end

  # GET /scrums/:id
  def show
    @scrum = Scrum.find(params[:id])
    render json: @scrum.to_json(:include => { :items => { :only => [:id, :description] } } )
  end
end
