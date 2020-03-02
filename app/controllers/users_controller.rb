class UsersController < ApplicationController
  def index
    # 何も入力されていなければ、何もしない
    return nil if params[:keyword] == ""
    # 自分の名前を除く、入力値を含むユーザ名を取得する（１０件まで）
    @users = User.where(['name LIKE ?', "%#{params[:keyword]}%"] ).where.not(id: current_user.id).limit(10)
    
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    # ログイン中のユーザ情報の編集が出来た時
    if current_user.update(user_params)
      # トップページに遷移する
      redirect_to root_path
    else
      # 編集出来なかった場合、もう一度戻す
      render :edit
    end
  end

  private # 他のクラスでは使えない（保守性が高まる）

  def user_params
    params.require(:user).permit(:name, :email)
  end
end