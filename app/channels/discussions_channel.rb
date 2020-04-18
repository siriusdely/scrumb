# frozen_string_literal: true

class DiscussionsChannel < ApplicationCable::Channel
  def subscribed
    puts "DiscussionsChannel.current_user: #{current_user.inspect}"
    stream_from 'discussions_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    puts 'unsubscribed'
  end

  def create(opts)
    discussion = Discussion.new(topic: opts.fetch('content'))
    if discussion.save
      ActionCable.server.broadcast 'discussions_channel', discussion.as_json
    end
  end
end
