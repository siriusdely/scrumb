class Api::V1::MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    topic = Topic.find(message_params[:topic_id])
    if message.save
      MessagesChannel.broadcast_to topic, message.to_json
      head :ok
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :topic_id)
  end
end
