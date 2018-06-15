class Api::V1::MessagesController < ApiController
  def create
    message = Message.new(message_params)
    message.user = @current_user
    topic = Topic.find(message_params[:topic_id])
    if message.save
      MessagesChannel.broadcast_to topic, message.as_json(:only =>
        [:id, :content, :created_at, :topic_id],
        :include => { :user => { :only => :email, :methods => :avatar_url } })
head :ok
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :topic_id)
  end
end
