require "rails_helper"

RSpec.describe 'Items API Version 1' do
  let(:user) { create(:user) }
  let!(:scrum) { create(:scrum) }
  let!(:items) { create_list(:item, 20, scrum_id: scrum.id) }
  let(:scrum_id) { scrum.id }
  let(:item_id) { items.first.id }
  let(:headers) { valid_headers }

  describe 'GET /api/v1/scrums/:scrum_id/items' do
    before { get "/api/v1/scrums/#{scrum_id}/items", params: {}, headers: headers }

    context 'when scrum exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all todo items' do
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

  describe 'GET /api/v1/scrums/:scrum_id/items/:id' do
    before { get "/api/v1/scrums/#{scrum_id}/items/#{item_id}", params: {}, headers: headers }

    context 'when scrum item exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the item' do
        expect(json['id']).to eq(item_id)
      end
    end

    context 'when scrum item does not exist' do
      let(:item_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Item/)
      end
    end
  end

  describe 'POST /api/v1/scrums/:scrum_id/items' do
    let(:valid_attributes) { { description: 'Visit Narnia' }.to_json }

    context 'when request attributes are valid' do
      before { post "/api/v1/scrums/#{scrum_id}/items", params: valid_attributes, headers: headers }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/api/v1/scrums/#{scrum_id}/items", params: {}, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Description can't be blank/)
      end
    end
  end

  describe 'PUT /api/v1/scrums/:scrum_id/items/:id' do
    let(:valid_attributes) { { description: 'Mozart' }.to_json }

    before {
      put "/api/v1/scrums/#{scrum_id}/items/#{item_id}", params: valid_attributes, headers: headers
    }

    context 'when item exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the item' do
        item = Item.find(item_id)
        expect(item.description).to match(/Mozart/)
      end
    end

    context 'when the item does not exist' do
      let(:item_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Item/)
      end
    end
  end

  describe 'DELETE /api/v1/scrums/#scrum_id/items/#{item_id}' do
    before { delete "/api/v1/scrums/#{scrum_id}/items/#{item_id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
