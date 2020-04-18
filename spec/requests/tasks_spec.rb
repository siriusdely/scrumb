# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Tasks API Version 1' do
  let(:user) { create(:user) }
  let!(:scrum) { create(:scrum) }
  let!(:tasks) { create_list(:task, 20, scrum_id: scrum.id) }
  let(:scrum_id) { scrum.id }
  let(:task_id) { tasks.first.id }
  let(:headers) { valid_headers }

  describe 'GET /api/v1/scrums/:scrum_id/tasks' do
    before { get "/api/v1/scrums/#{scrum_id}/tasks", params: {}, headers: headers }

    context 'when scrum exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all todo tasks' do
        expect(json.size).to eq(20)
      end
    end

    context 'when scrum does not exist' do
      let(:scrum_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Scrum/)
      end
    end
  end

  describe 'GET /api/v1/scrums/:scrum_id/tasks/:id' do
    before { get "/api/v1/scrums/#{scrum_id}/tasks/#{task_id}", params: {}, headers: headers }

    context 'when scrum task exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the task' do
        expect(json['id']).to eq(task_id)
      end
    end

    context 'when scrum task does not exist' do
      let(:task_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Task/)
      end
    end
  end

  describe 'POST /api/v1/scrums/:scrum_id/tasks' do
    let(:valid_attributes) { { title: 'Visit Narnia' }.to_json }

    context 'when request attributes are valid' do
      before { post "/api/v1/scrums/#{scrum_id}/tasks", params: valid_attributes, headers: headers }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/api/v1/scrums/#{scrum_id}/tasks", params: {}, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Title can't be blank/)
      end
    end
  end

  describe 'PUT /api/v1/scrums/:scrum_id/tasks/:id' do
    let(:valid_attributes) { { title: 'Mozart' }.to_json }

    before do
      put "/api/v1/scrums/#{scrum_id}/tasks/#{task_id}", params: valid_attributes, headers: headers
    end

    context 'when task exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the task' do
        task = Task.find(task_id)
        expect(task.title).to match(/Mozart/)
      end
    end

    context 'when the task does not exist' do
      let(:task_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Task/)
      end
    end
  end

  describe 'DELETE /api/v1/scrums/#scrum_id/tasks/#{task_id}' do
    before { delete "/api/v1/scrums/#{scrum_id}/tasks/#{task_id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
