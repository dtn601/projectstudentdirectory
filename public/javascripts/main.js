$(function(){
//view all students
function loadStudentInfo(){
	$.get('/studentapi',function(res){

		res.forEach(function(post,index){
			var firstName = post.first_name,
				lastName = post.last_name,
				slack = post.slack,
				id = post._id;

		var studentInfo = [
			'<li>',
				'<div class="student" data-postid=',id,'>',
					'<section><span class="first">',firstName,'</span>',' ','<span class="last">',lastName,'</span></section>',	
					'<section class="slack">',slack,'</section>',
					'<a class="edit" href="#">Edit</a>',
					' ',
					'<a class="delete" href="#">Delete</a>',
			'</div>',
		'</li>'
		].join('');

		$('.main-content').find('ul.studentLists').prepend(studentInfo);
		});
	});
};

//click functions
function addEventListeners(){
//edit
	$('body').on('click','a.edit',function(e){
		event.preventDefault();

		var $post = $(this).closest('.student'),
			postId = $post.data('postid'),
			$postFirst = $post.find('.first').text(),
			$postLast = $post.find('.last').text(),
			$postSlack = $post.find('.slack').text();

	$post.html( [
				'<input class="edit-first" name="first" value="',$postFirst,'"/>',
				'<input class="edit-last" name="last" value="',$postLast,'"/>',
				'<input class="edit-slack" name="slack" value="',$postSlack,'"/>',
				'<button class="send-update">Update</button>'
		].join(''))
	});

	//update
		$('body').on('click', '.send-update',function(e){
			e.preventDefault();

			var $post = $(this).closest('.student'),
			postId = $post.data('postid'),
			$postFirst = $post.find('.edit-first').val(),
			$postLast = $post.find('.edit-last').val(),
			$postSlack = $post.find('.edit-slack').val();

			var updateStudent = $.ajax({
							url: '/studentapi',
							method: 'PUT',
							data: {
								first_name: $postFirst,
								last_name: $postLast,
								slack: $postSlack,
								id: postId
								}

							});

			updateStudent.done(function(res){
			console.log(res)
			$post.html([
					'<section><span class="first">',$postFirst,'</span>',' ','<span class="last">',$postLast,'</span></section>',	
					'<section class="slack">',$postSlack,'</section>',
					'<a class="edit" href="#">Edit</a>',
					' ',
					'<a class="delete" href="#">Delete</a>'
				].join('') );
			})


			updateStudent.fail(function(err){
				console.error('there was error: ', err);
			})	

		})

//delete
$('body').on('click','a.delete', function(event){
		event.preventDefault();

		console.log('clicked')
		 var $post = $(this).closest('.student'),
		     id = $(this).closest('.student').data('postid');

		var deleteStudent = $.ajax({
							url: '/studentapi',
							method: 'DELETE',
							data: {
								id: id
								}

							});
		deleteStudent.done(function(res){
		//	$('.post').find('data-postid=id').append('');
		var speed = $('.student').attr('data-postid');
			console.log(speed)

		$post.html([].join(''));
		});

	});








};


//run
function main(){
	addEventListeners();
	loadStudentInfo();
};




main();

});