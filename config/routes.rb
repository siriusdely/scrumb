Rails.application.routes.draw do
  root to: "static_pages#index"

  devise_for :users

  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end

  # resources :items
  # resources :scrums

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope '/api' do
    resources :scrums
  end

  # get '*path', to: "application#fallback_index_html", constraints: ->(request) do
  get '*path', to: "static_pages#index", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
