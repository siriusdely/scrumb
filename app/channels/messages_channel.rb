# frozen_string_literal: true

class MessagesChannel < ApplicationCable::Channel
  def subscribed
    discussion = Discussion.find(params[:discussion_id])
    stream_for discussion
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
