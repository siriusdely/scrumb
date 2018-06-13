class TopicsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "topics_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
