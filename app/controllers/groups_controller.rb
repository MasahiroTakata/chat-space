class GroupsController < ApplicationController

  def index
  end

  def new
    @group = Group.new
    # ログインユーザを、グループに登録する（配列に要素を追加する）
    @group.users << current_user
  end

  def create
    # フォームから送信されるカラムを確認する
    # binding.pry
    # 登録は、newでもcreateでも可能
    @group = Group.new(group_params)

    # 保存が出来たかどうかの分岐
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    # 編集したグループの情報を取得
    @group = Group.find(params[:id])

    if @group.update(group_params)
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end
end