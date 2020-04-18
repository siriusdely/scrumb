# frozen_string_literal: true

class Api::V1::MessagesController < ApiController
  def create
    message = Message.new(message_params)
    message.user = @current_user
    discussion = Discussion.find(message_params[:discussion_id])
    if message.save
      MessagesChannel.broadcast_to discussion, message.as_json(only: %i[id content created_at discussion_id], include: {
                                                                 user: { only: :email, methods: :avatar_url }
                                                               })

      head :ok
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :discussion_id)
  end
end
