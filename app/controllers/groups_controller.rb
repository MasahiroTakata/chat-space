class GroupsController < ApplicationController
  def index
  end

  def new
    @group = Group.new
    # ログインユーザを、グループに登録する（配列に要素を追加する）
    @group.users << current_user
  end
end