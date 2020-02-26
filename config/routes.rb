Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  # ユーザ管理機能のパス
  resources :users, only: [:edit, :update, :delete]
  resources :groups, only: [:index, :new, :create, :edit, :update]
end