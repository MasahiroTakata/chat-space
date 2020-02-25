Rails.application.routes.draw do
  devise_for :users

  root "messages#index"
  # ユーザ管理機能のパス
  resources :users, only: [:edit, :update, :delete]
end