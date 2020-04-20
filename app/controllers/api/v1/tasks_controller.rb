# frozen_string_literal: true

# TasksControllesa
class Api::V1::TasksController < ApiController
  # before_action :set_scrum
  # before_action :set_scrum_task, only: [:show, :update, :destroy]
  before_action :set_task, only: %i[show toggle update]

  def index
    json_response(@scrum.tasks)
  end

  def show
    json_response(@task)
  end

  def create
    @scrum.tasks.create!(task_params)
    json_response(@scrum, :created)
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
    params.permit(:title, :description)
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
