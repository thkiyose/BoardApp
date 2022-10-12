Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/v1/auth', controllers: {
    registrations: 'api/v1/auth/registrations'
  }
  namespace :api do
    namespace :v1 do
      namespace :auth do
        resources :sessions, only: [:index]
      end
      resources :sections, only:[:index, :create,:show] do
        get :raw_sections, on: :collection
      end
      resources :news, only: [:index, :create, :show, :edit, :update, :destroy] do
        get :search, on: :collection
        get :user_news, on: :member
        get :user_archive_list, on: :member
        put :archive, on: :member
      end
      resources :events, only: [:index, :create, :show, :destroy] do
        get :search, on: :collection
      end
      resources :notifications, only: [:index]
      namespace :users do
        get :search, to: "search"
      end
    end
  end
end
