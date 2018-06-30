require "rails_helper"

RSpec.describe Scrum, type: :request do
  let(:user) { create(:user) }
  # initialize test data
  let!(:scrums) { create_list(:scrum, 10, :with_memberships, user: user) }
  let(:scrum_id) { scrums.first.id }
  # authorize request
  let(:headers) { valid_headers }

  # Test suite for GET scrums
  describe 'GET /api/v1/scrums' do
    # make HTTP get request before each example
    before { get '/api/v1/scrums', params: {}, headers: headers }

    it 'returns scrums' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /scrums/:id
  describe 'GET /api/v1/scrums/:id' do
    before { get "/api/v1/scrums/#{scrum_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'returns the scrum' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(scrum_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let (:scrum_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Scrum/)
      end
    end
  end

  describe 'POST /api/v1/scrums' do
    let(:valid_attributes) do
      { title: 'Learn Elm', description: 'Learn Elm Description' }.to_json
    end

    context 'when the request is valid' do
      before { post '/api/v1/scrums', params: valid_attributes, headers: headers }

      it 'creates a scrum' do
        expect(json['title']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/scrums', params: { title: 'Invalid scrum without description' }.to_json, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body).to match(/Validation failed: Description can't be blank/)
      end
    end
  end

  describe 'PUT /api/v1/scrums/:id' do
    let(:valid_attributes) { { title: 'Shopping' }.to_json }

    context 'when the record exists' do
      before { put "/api/v1/scrums/#{scrum_id}", params: valid_attributes, headers: headers }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  describe 'DELETE /api/v1/scrums/:id' do
    before { delete "/api/v1/scrums/#{scrum_id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
