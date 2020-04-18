# frozen_string_literal: true

Rails.application.routes.draw do
  # root to: "static_pages#index"

  devise_for :users

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end

  # resources :tasks
  # resources :scrums

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1, defaults: { format: :json } do
      post 'users/register', to: 'users#create'
      post 'auth/login', to: 'auth#login'

      resources :sessions, only: %i[create destroy]

      resources :scrums do
        resources :days, only: %i[create show]
        resources :tasks
        get 'today', on: :member
      end

      resources :tasks do
        put :toggle, on: :member
      end

      resources :discussions, only: %i[index create] do
        resources :messages, only: %i[index create]
      end
      resources :messages, only: [:create]
    end
  end

  # Serve websocket cable request
  mount ActionCable.server => '/cable'

  # get '*path', to: "static_pages#index", constraints: ->(request) do
  get '*path', to: 'application#fallback_index_html', constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }
end
