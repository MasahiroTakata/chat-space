$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="mainChat__content__messageBox">
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
    } else {
      var html =
      `<div class="mainChat__content__messageBox">
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
    };
  }
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
});