var last_type = '';
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
		var hidden = $('.event-hidden').prop('checked');
		$.ajax({
  			url: "/api/create/",
  			type: "POST",
  			data: {'name': name, 'text': text, 'hidden': hidden, 'type': last_type, 'event': $('.event.active').attr('val')},
  			dataType: 'json',
  			success: function(data){
				var h = get_new_event_html(name, text, hidden, data.id, $('.event.active').attr('val'));
				$('.'+last_type+'-div').append(h);
			},
		});
	});

	$('.add-subevent').click(function(){
		last_type = 'subevent';
	});
	$('.add-event').click(function(){
		last_type = 'event';
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

// event_parent = '' for event, value for subevent
function get_new_event_html(name, text, hidden, id, event_parent){
	var hidden_str = '';
	if (hidden) {
		hidden_str = 'list-group-item-warning';
	}

	var event_str = 'event';
	if ( event_parent != '' ) {
		event_str = 'subevent';
	}

	var s = '<a href="#" class="list-group-item ' + event_str + ' ' + hidden_str + ' ';
	if (event_str == 'subevent'){
		s += 'subevent-' + event_parent + ' ';
	}
	s += ' val="'+id+'">';  
	s += name;
    s += '<button type="button" class="btn btn-default btn-xs pull-right delete-event" val="'+id+'" type="' + event_str + '"">';
    s += '<span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>';
    s += '</button>';
    s += '</a>';
    return s;
}