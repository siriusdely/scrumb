# frozen_string_literal: true

# TasksController
class Api::V1::TasksController < ApiController
  before_action :set_scrum, only: %i[create]
  # before_action :set_scrum_task, only: [:show, :update, :destroy]
  before_action :set_task, only: %i[show toggle update]

  def index
    json_response(@scrum.tasks)
  end

  def show
    json_response(@task)
  end

  def create
    task = @scrum.tasks.create! task_params

    order = 1 + Rotation.where(day_id: 1, user_id: task.user_id, types_mask: 4).count
    rotation = Rotation.new(rotation_params.merge({ order: order, task_id: task.id }))
    rotation.save!

    task_json = task.as_json
    rotation_json = rotation.as_json only: %i[id task_id user_id], methods: :type
    rotation_json[:name] = if rotation.type == :tomorrow
                             'Helps Needed'
                           else
                             rotation.type.to_s.capitalize
                           end

    task_json[:rotation] = rotation_json

    render json: task_json, status: :created
  end

  def update
    @task.update(task_params)
    task = @task.as_json
    json_response(task)
  end

  def toggle
    @task.toggle_state
    task = @task.as_json
    json_response(task)
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private

  def task_params
    params.permit(:title, :description, :user_id)
  end

  def rotation_params
    params[:rotation].permit(:day_id, :type, :user_id)
  end

  def set_scrum
    @scrum = Scrum.find(params[:scrum_id])
  end

  def set_scrum_task
    @task = @scrum.tasks.find_by!(id: params[:id]) if @scrum
  end

  def set_task
    @task = Task.find(params[:id])
  end
end
