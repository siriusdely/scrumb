class MessagesChannel < ApplicationCable::Channel
  def subscribed
    topic = Topic.find(params[:topic_id])
    stream_for topic
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
