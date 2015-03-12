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
				| View All
PCs
| Sam
| Ethan
| Wesley
NPCS
| Bomb Voyage
| Mr X.

Features: 
	Hover over names to view bio in popover.
	Save this crap to an account, can type in slug to see duplic details
	Ability to 'Hide' components, which means you can't see them if not signed in.
	Uses Markdown

Structure:
	[[blah]] - Putting a string in [[]] does a lookup for mouse over link.
	{{blah}} - Putting a string in {{}} will hide it from players, only show to GM

Structure Code:

Structure DB:
	event
		id - int
		user - User
		name - string
		description - string
		hidden - Bool Default False

	subevent
		id - int
		event - int parent event id
		user - User
		name - string
		description - string
		hidden - Bool Default False

	npc
		id - int
		user - User
		name - string
		description - string
		hidden - Bool Default False
	pc
		id - int
		user - User
		name - string
		description - string
		hidden - Bool Default False

	user
		id - int 
		name - string - Can change freely to another that isn't used
		email - string
		password - string hashed



Requirements
	Django
	Python Markdown 2.6.1

