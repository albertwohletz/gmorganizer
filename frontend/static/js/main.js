$(function() {
	$('.sortable').sortable({
		axis: "y",
		update: function(e) {
			var type = $(this).attr('id');

			// Save order.
			var ids = []
			var i = 0;
			$(this).children().each(function(){
				ids.push($(this).attr('val'));
			});

			$.ajax({
	  			url: "/api/reorder/",
	  			type: "POST",
	  			data: {'type': type, 'order': ids},
	  			dataType: 'json',
			});
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
				var element = '#'+type;
				$(element).append(h);
			},
		});
		$("#event-modal").modal('hide');
	});
	$('.edit-btn').click(function(){
		var name = $('.event-name').val();
		var text = $('.event-text').val();
		var type = $('.type').val().toLowerCase();
		var hidden = $('.event-hidden').prop('checked');
		
		edit_item(edit_id, type, name, text, hidden);
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

var edit_id = 0;
$(document).on("click",".edit-event", function(){
	edit_id = $(this).attr('val');
	var type = 'Event';
	var name = $(this).parent().attr('name');
	var text = $(this).parent().attr('text');
	var hidden = $(this).parent().hasClass('list-group-item-warning');

	// Set Modal Params
	set_modal(type, name, text, hidden);
});


function set_modal(type, name, text, hidden){
	$("#event-modal").modal('show');
	$('.type').val(type);
	$('.event-name').val(name);
	$('.event-text').val(text);
	$('.event-hidden').prop('checked', hidden);
}

function delete_item(id, type){
	$.ajax({
			url: "/api/delete/",
			type: "GET",
			data: {'id': id, 'type': type},
			dataType: 'json'
	});
}

function edit_item(id, type, name, text, hidden){
	$.ajax({
		url: "/api/save/",
		type: "POST",
		data: {'id': id, 'type': type.toLowerCase(), 'name': name, 'text': text, 'hidden': hidden},
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
    s += '<button type="button" class="btn btn-default btn-xs pull-right delete-"'+event_str+'" val="'+id+'" type="' + event_str + '"">';
    s += '<span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>';
    s += '</button>';
    s += '<button type="button" class="btn btn-default btn-xs pull-right delete-"'+event_str+'" val="'+id+'" type="' + event_str + '"">';
    s += '<span class="glyphicon glyphicon-cog" aria-hidden="true"></span>';
    s += '</button>';
    s += '</a>';
    alert(s);
    return s;
}