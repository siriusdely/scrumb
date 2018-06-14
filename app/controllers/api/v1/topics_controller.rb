class Api::V1::TopicsController < ApiController
  def index
    topics = Topic.all
    render json: topics.to_json(:include => :messages)
  end

  def create
    topic = Topic.new(topic_params)
    if topic.save
      ActionCable.server.broadcast 'topics_channel', topic.as_json
      json_response(topic, :created)
    end
  end

  private

  def topic_params
    params.require(:topic).permit(:title)
  end
end
