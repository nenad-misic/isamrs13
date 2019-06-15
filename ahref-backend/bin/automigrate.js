var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.postgres;

	ds.automigrate('sRoom', function(err){
		app.models.Room.find(function(err,model2){
			
			model2.forEach(function(room){
	
					app.models.sRoom.create({mongoId: room.id}, function(err,a){
				
						if(err) throw err;
						console.log('Created: ',a);
					});
			});
		
		
		});
	
		});
	



