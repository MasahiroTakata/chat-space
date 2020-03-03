Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  # ユーザ管理機能のパス
  resources :users, only: [:index, :edit, :update, :delete]
  resources :groups, only: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
    # json形式
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end