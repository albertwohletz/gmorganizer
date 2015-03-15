$(function() {
	$('.sortable').sortable({
		axis: "y",
		update: function(e) {
			var id = $(this).attr('id');

			var ids = []
			// Save order.
			$(this).children().each(function(){ids.push($(this).attr('val'))});

		}
	});
	$('.event').click(function(){
		var id = $(this).attr('val');
		$('.subevent').addClass('hidden');
		$('.subevent-'+id).removeClass('hidden');
		$('.event').removeClass('active');
		$(this).addClass('active');
		$('.subevent').removeClass('active');
		$('.add-subevent').removeClass('hidden');
		$('.summary').html($(this).attr('text'));
	});

	$('.subevent').click(function(){
		$('.subevent').removeClass('active');
		$(this).addClass('active');
		$('.summary').html($(this).attr('text'));
	});

	$('.save-event').click(function(){
		var name = $('.event-name').val();
		var text = $('.event-text').val();
		var hidden = $('.event-hidden').prop('checked');
		var type = $('.type').val().toLowerCase();
		$.ajax({
  			url: "/api/create/",
  			type: "POST",
  			data: {'name': name, 'text': text, 'hidden': hidden, 'type': type, 'event': $('.event.active').attr('val')},
  			dataType: 'json',
  			success: function(data){
				var h = get_new_event_html(name, text, hidden, data.id, $('.event.active').attr('val'));
				var element = '.'+type+'-div';
				$(element).append(h);
			},
		});
		$("#event-modal").modal('hide');
	});
	$('.add-subevent').click(function(){
		$('.type').val('Subevent');
	});
	$('.add-event').click(function(){
		$('.type').val('Event');
	});
	$('.add-npc').click(function(){
		$('.type').val('NPC');
	});
	$('.add-pc').click(function(){
		$('.type').val('PC');
	});
});



$(document).on("click",".delete-event", function(){
	var id = $(this).attr('val');
	delete_item(id, 'event');
	$(this).parent().remove();
});

$(document).on("click",".delete-subevent", function(){
	var id = $(this).attr('val');
	delete_item(id, 'subevent');
	$(this).parent().remove();
});

$(document).on("click",".delete-npc", function(){
	var id = $(this).attr('val');
	delete_item(id, 'npc');
	$(this).parent().remove();
});

$(document).on("click",".delete-pc", function(){
	var id = $(this).attr('val');
	delete_item(id, 'pc');
	$(this).parent().remove();
});

function delete_item(id, type){
	$.ajax({
			url: "/api/delete/",
			type: "GET",
			data: {'id': id, 'type': type},
			dataType: 'json'
	});
}

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