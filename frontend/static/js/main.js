$(function() {
	$('.event').click(function(){
		var id = $(this).attr('val');
		$('.subevent').addClass('hidden');
		$('.subevent-'+id).removeClass('hidden');
		$('.event').removeClass('active');
		$(this).addClass('active');
	});

	$('.save-event').click(function(){
		var name = $('.event-name').val();
		var text = $('.event-text').val();
		var hidden = $('.event-hidden').val();
		$.ajax({
  			url: "/api/create/",
  			type: "POST",
  			data: {'name': name, 'text': text, 'hidden': false, 'type': 'event'},
  			dataType: 'json',
  			success: function(data){
				var h = get_new_event_html(name, text, hidden, data.id);
				$('.event-div').append(h);
			},
		});
	});
});


$(document).on("click",".delete-event", function(){
	var id = $(this).attr('val');
	var type = $(this).attr('type');
	$.ajax({
			url: "/api/delete/",
			type: "GET",
			data: {'id': id, 'type': type},
			dataType: 'json'
	});

	$(this).parent().remove();
});

function get_new_event_html(name, text, hidden, id){
	var hidden_str = '';
	if (hidden) {
		hidden_str = 'list-group-item-warning';
	}

	var s = '<a href="#" class="list-group-item event ' + hidden_str + ' val="{{event.id}}">';  
	s += name;
    s += '<button type="button" class="btn btn-default btn-xs pull-right delete-event" val="'+id+'">';
    s += '<span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>';
    s += '</button>';
    s += '</a>';
    return s;
}