class TopicsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "topics_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    puts "unsubscribed"
  end

  def create(opts)
    topic = Topic.new(title: opts.fetch('content'))
    if topic.save
      ActionCable.server.broadcast 'topics_channel', topic.as_json
    end
  end
end
