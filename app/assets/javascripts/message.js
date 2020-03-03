$(function(){
  var buildHTML = function(message) {
    if (message.content && message.image) { // メッセージと画像が送信された場合
      var html =
      `<div class="mainChat__content__messageBox" data-message-id=${message.id}>
         <div class="mainChat__content__messageBox__mAndT">
           <div class="mainChat__content__messageBox__mAndT__member">
             ${message.user_name}
           </div>
           <div class="mainChat__content__messageBox__mAndT__time">
             ${message.created_at}
           </div>
         </div>
         <div class="mainChat__content__messageBox__message">
           <p class="mainChat__content__messageBox__message__content">
             ${message.content}
           </p>
           <img src=${message.image} class = "mainChat__content__messageBox__message__image">
         </div>
       </div>`

      return html;
    } else if (message.content) { // メッセージのみ送信された場合
      var html =
      `<div class="mainChat__content__messageBox" data-message-id=${message.id}>
        <div class="mainChat__content__messageBox__mAndT">
          <div class="mainChat__content__messageBox__mAndT__member">
            ${message.user_name}
          </div>
          <div class="mainChat__content__messageBox__mAndT__time">
            ${message.created_at}
          </div>
        </div>
        <div class="mainChat__content__messageBox__message">
          <p class="mainChat__content__messageBox__message__content">
            ${message.content}
          </p>
        </div>
      </div>`

      return html;
    } else if (message.image) { // 画像のみ送信された場合
      var html =
      `<div class="mainChat__content__messageBox" data-message-id=${message.id}>
         <div class="mainChat__content__messageBox__mAndT">
           <div class="mainChat__content__messageBox__mAndT__member">
             ${message.user_name}
           </div>
           <div class="mainChat__content__messageBox__mAndT__time">
             ${message.created_at}
           </div>
         </div>
         <div class="mainChat__content__messageBox__message">
          <img src=${message.image} class = "mainChat__content__messageBox__message__image">
         </div>
       </div>`

      return html;
    };
  };

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.mainChat__content__messageBox:last').data("message-id");
    $.ajax({
      //「hoge」と入力すると、「groups/3/hoge」と表示される
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message);
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.mainChat__content').append(insertHTML);
        $('.mainChat__content').animate({ scrollTop: $('.mainChat__content')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    /* 今回はform要素自体を指す */
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.mainChat__content').append(html);
      $('.mainChat__content').animate({scrollTop:$('.mainChat__content')[0].scrollHeight});
      // ボタン押下時に、テキストの中身を空にする処理
      $('form')[0].reset();
      // HTMLの無効化を解除する
      $('.mainChat__footer__inputspace__send').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000); // 一定時間おきにメソッドを呼び出す
  }
});