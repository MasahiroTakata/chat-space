class Group < ApplicationRecord
  has_many :group_users
  # グループとユーザーは多対一の関係で、中間テーブルを経由する
  has_many :users, through: :group_users
  validates :name, presence: true, uniqueness: true
end
