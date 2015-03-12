$(function() {
	$('.event').click(function(){
		var id = $(this).attr('val');
		$('.subevent').addClass('hidden');
		$('.subevent-'+id).removeClass('hidden');
	});

	$('.save-event').click(function(){
		var name = $('.event-name').val();
		var text = $('.event-text').val();
		var hidden = $('.event-hidden').val();
		$.ajax({
  			url: "/api/create/",
  			type: "POST",
  			data: {'name': name, 'text': text, 'hidden': false, 'type': 'event'},
  			dataType: 'json'
		});
	});

	$('.delete-event').click(function(){
		var id = $(this).attr('val');
		var type = $(this).attr('type');
		$.ajax({
  			url: "/api/delete/",
  			type: "GET",
  			data: {'id': id, 'type': type},
  			dataType: 'json'
		});
		$(this).parent().remove()
	});
});
