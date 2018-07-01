class Api::V1::DiscussionsController < ApiController
  def index
    discussions = Discussion.all
    render json: discussions.to_json(:include => { :messages => {
      :only => [:id, :content, :created_at, :discussion_id],
      :include => { :user => { :only => [:id, :email], :methods => :avatar_url } } } })
  end

  def create
    discussion = Discussion.new(discussion_params)
    if discussion.save
      ActionCable.server.broadcast 'discussions_channel', discussion.as_json
      json_response(discussion, :created)
    end
  end

  private

  def discussion_params
    params.require(:discussion).permit(:topic)
  end
end
