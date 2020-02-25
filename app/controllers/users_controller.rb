class UsersController < ApplicationController
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