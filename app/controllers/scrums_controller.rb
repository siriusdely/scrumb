class ScrumsController < ApplicationController
  before_action :set_scrum, only: [:show, :update, :destroy]

  # GET /scrums
  def index
    @scrums = Scrum.all

    render json: @scrums
  end

  # GET /scrums/1
  def show
    render json: @scrum
  end

  # POST /scrums
  def create
    @scrum = Scrum.new(scrum_params)

    if @scrum.save
      render json: @scrum, status: :created, location: @scrum
    else
      render json: @scrum.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /scrums/1
  def update
    if @scrum.update(scrum_params)
      render json: @scrum
    else
      render json: @scrum.errors, status: :unprocessable_entity
    end
  end

  # DELETE /scrums/1
  def destroy
    @scrum.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_scrum
      @scrum = Scrum.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def scrum_params
      params.require(:scrum).permit(:title, :description, :tasks, :link)
    end
end
