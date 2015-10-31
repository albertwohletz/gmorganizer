I think we can delete the Subevent stuff, kinda useless, i'd rather just a big paragraph i think.

Drag to order

Events
| The Data 
| Black Mail
| The Artifact

| The Data <—	| Sub Event 1 | Overall description.
| Black Mail	| Sub Event 2 |
| The Artifact	| Sub Event 3 |


| The Data <—	| Sub Event 1 <— 	| Contacted by A to do B, but it turns out C.  
| Black Mail	| Sub Event 2	    |
| The Artifact	| Sub Event 3		|
(+)				| View All/Summary?
				(+)
PCs
| Sam (-) <-- Delete buttons on right side of all elements.  Change this to an edit button or add edit button.  Or a dropdown with delete and edit.
| Ethan (-)
| Wesley (-)
(+)
NPCS
| Bomb Voyage (-)
| Mr X. (-)
(+)

Features: 
	Hover over names to view bio in popover.
	Save this crap to an account, can type in slug to see duplic details
	Ability to 'Hide' components, which means you can't see them if not signed in.
	Uses Markdown

Structure:
	[[blah]] - Putting a string in [[]] does a lookup for mouse over link.
	{{blah}} - Putting a string in {{}} will hide it from players, only show to GM

Structure Code:
	API
		save(type, text, name, hidden, parent) - returns id
		delete(id, type)
		account stuff

	HTML
		Events:
			id=sql id
			class = something

		SubEvents
			class = sub+something

		PC/NCS

		All
			class ='warning' <-- for hidden, don't even print html for players.

	Javascript:
		highlight over text to show summary
		click tabs to expand out subtabs
		drag to reorder
		click to edit
		click to create



Structure DB:
	event
		id - int
		user - User
		name - string
		text - string
		hidden - Bool Default False

	subevent
		id - int
		event - int parent event id
		user - User
		name - string
		text - string
		hidden - Bool Default False

	npc
		id - int
		user - User
		name - string
		text - string
		hidden - Bool Default False
	pc
		id - int
		user - User
		name - string
		text - string
		hidden - Bool Default False

	user
		id - int 
		name - string - Can change freely to another that isn't used
		email - string
		password - string hashed


Requirements
	Django
	Python Markdown 2.6.1

Features to add
Sort to order fix

Known Bugs
deleting event doesn't delete subevents.
Visible subevents will be printed but have html hidden class if parent class is hidden.  
