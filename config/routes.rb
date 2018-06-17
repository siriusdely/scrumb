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
      post 'users/signup', to: 'users#create'
      post 'auth/login', to: 'auth#login'

      resources :sessions, only: [:create, :destroy]

      resources :scrums do
        resources :tasks
      end

      resources :discussions, only: [:index, :create] do
        resources :messages, only: [:index, :create]
      end
      resources :messages, only: [:create]
    end
  end

  # Serve websocket cable request
  mount ActionCable.server => '/cable'

  # get '*path', to: "static_pages#index", constraints: ->(request) do
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
