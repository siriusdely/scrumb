class Api::V1::ItemsController < ApiController
  before_action :set_scrum
  before_action :set_scrum_item, only: [:show, :update, :destroy]

  def index
    json_response(@scrum.items)
  end

  def show
    json_response(@item)
  end

  def create
    @scrum.items.create!(item_params)
    json_response(@scrum, :created)
  end

  def update
    @item.update(item_params)
    head :no_content
  end

  def destroy
    @item.destroy
    head :no_content
  end

  private

  def item_params
    params.permit(:description)
  end

  def set_scrum
    @scrum = Scrum.find(params[:scrum_id])
  end

  def set_scrum_item
    @item = @scrum.items.find_by!(id: params[:id]) if @scrum
  end

end
