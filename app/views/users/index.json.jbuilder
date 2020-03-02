# 入力後、そのワードを含めるユーザーを取得する
json.array! @users do |user|
  json.id user.id
  json.name user.name
end