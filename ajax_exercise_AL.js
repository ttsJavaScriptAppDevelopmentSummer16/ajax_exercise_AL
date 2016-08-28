$( document ).ready(function() {

  var contentDiv = $('.content')

  function renderArrayToUL(arg){
    var list = contentDiv.append('<ul></ul>').find('ul');
    for (var i = 0; i < arg.length; i++) {
      list.append('<li>' + arg[i] + '</li>')
    }
  }

  function clearAndRender(arg){
    contentDiv.empty();
    renderArrayToUL(arg);
  }

  $('#Button01').on('click', function(e){
    $.ajax({
      type: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts'
    }).done(function(resp){
      var renderMe = [];
      for (var i = 0; i < resp.length; i++) {
        renderMe.push(resp[i].id + " - " + resp[i].body);
      }
      clearAndRender(renderMe);
    })
  });

  $('#Button02').on('click', function(e){
    $.ajax({
      type: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts',
      data: {id: 10}
    }).done(function(resp){
      var renderMe = [];
      for (var i = 0; i < resp.length; i++) {
        renderMe.push(resp[i].id + " - " + resp[i].body);
      }
      clearAndRender(renderMe);
    })
  });

  $('#Button03').on('click', function(e){
    $.ajax({
      type: 'GET',
      url: 'https://jsonplaceholder.typicode.com/comments',
      data: {postId: 12}
    }).done(function(resp){
      var renderMe = [];
      for (var i = 0; i < resp.length; i++) {
        renderMe.push(resp[i].id + " - " + resp[i].postId);
      }
      clearAndRender(renderMe);
    })
  });

  $('#Button04').on('click', function(e){
    $.ajax({
      type: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts',
      data: {userId: 2}
    }).done(function(resp){
      var renderMe = [];
      for (var i = 0; i < resp.length; i++) {
        renderMe.push((i+1) + '. ' + resp[i].body);
      }
      clearAndRender(renderMe);
    })
  });

  $('#Button05').on('click', function(e){
    $.ajax({
      type: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      data: { userId: 1,
              title: 'potato',
              body: 'ireland does not have any'}
    }).done(function(resp){
      console.log(resp);
      var renderMe = [resp.id, resp.userId, resp.title, resp.body];
      clearAndRender(renderMe);
    })
  });
  //NOT COMPLETE
  $('#Button06').on('click', function(e){
    $.ajax({
      type: 'PUT',
      url: 'https://jsonplaceholder.typicode.com/posts/12',
      data: {title: 'Updated Title',
            body: 'This body has been updated'}
    }).done(function(resp){
      var renderMe = [];
        renderMe.push(resp.title + " - " + resp.body);
      clearAndRender(renderMe);
    })
  });
  // Difference between replace and updated
  $('#Button07').on('click', function(e){
    $.ajax({
      type: 'PUT',
      url: 'https://jsonplaceholder.typicode.com/posts/12',
      data: {title: 'Updated Title',
            body: 'This body has been updated'}
    }).done(function(resp){
      var renderMe = [];
        renderMe.push(resp.title + " - " + resp.body);
      clearAndRender(renderMe);
    })
  });

  $('#Button08').on('click', function(e){
    $.ajax({
      type: 'DELETE',
      url: 'https://jsonplaceholder.typicode.com/posts/12',
      data: {id: '12'}
    }).done(function(resp){
      var renderMe = ['Deleted Post 12'];
      clearAndRender(renderMe);
    })
  });

  // $('#Button09').on('click', function(e){
  //   $.ajax({
  //     type: 'GET',
  //     url: 'https://jsonplaceholder.typicode.com/posts',
  //   }).done(function(resp){
  //     var renderMe = [];
  //     for (var i = 0; i < resp.length; i++) {
  //       renderMe.push(resp[i].id + '. ' + resp[i].body);
  //       renderMe[i].onclick = function() {
  //       this.innerHTML = this.innerText.strike();
  //       setTimeout(function() {this.parentNode.removeChild(this)}.bind(this),1000
  //       )}
  //     }
  //     clearAndRender(renderMe);
  //   });
  // });
  function getPostComments(postId){
  		var list = $('ul#mainList');
  		clearList();
  		$.ajax({
  			url: 'https://jsonplaceholder.typicode.com/comments?postId=' +postId,
  			method: 'GET'
  		}).then(function(comments){
  				var liButton = $('<li></li>');
  				var backButton = $('<input type="button" value="Back to all posts">');
  				list.append(backButton);
  				backButton.on('click',function(){
  					getPosts();
  				});
  				comments.forEach(function(comment){
  					var li = $('<li></li>');
  					li.text(comment.body);
  					list.append(li);
  				});

  		});
  	}

  function clearList(){
  var list = $('ul#mainList');
  list.text("");
};

  function getPosts(){

  		var list = $('ul#mainList');
  		clearList();
  		$.ajax({
  			url: 'https://jsonplaceholder.typicode.com/posts',
  			method: 'GET'
  		}).then(function(posts){
  			posts.forEach(function(post){
  				var li = $('<li></li>');

  				var a = $('<a href="#"></a>');
  				a.text(post.id +" "+ post.title);
  				a.on('click',function(){
  					getPostComments(post.id);
  				})

  				li.append(a);
  				list.append(li);
  			});
  		});
  	}
  	$('#Button09').on('click',function(){
  		getPosts();
  		var list = $('ul#mainList');
  		clearList();
  		$.ajax({
  			url: 'http://jsonplaceholder.typicode.com/posts',
  			method: 'GET'
  		}).then(function(posts){
  			posts.forEach(function(post){
  				var li = $('<li></li>');

  				var a = $('<a href="#"></a>');
  				a.text(post.title);
  				a.on('click',function(){
  					getPostComments(post.id);
  				})

  				li.append(a);
  				list.append(li);
  			});
  		});
  	});
  });
