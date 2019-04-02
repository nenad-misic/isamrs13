module.exports = function(app) {

    var God = app.models.God;

    God.findOne({ username: 'god' }, (err, users) => {

        if (!users) {
            God.create([
                {username: 'god', email: 'god@heaven.ac.rs', password: 'god'}
            ], (err, users) => {
                if (err) throw(err);
                
                var Role = app.models.Role;
                var RoleMapping = app.models.RoleMapping;

                RoleMapping.destroyAll();

                Role.findOne({name: 'God'}, (err, role) => {

                    if (!role) {
                        Role.create({
                            name: 'God'
                        }, (err, role) => {
                            if (err) throw(err);
                            console.log("New Role: ", role);
            
                            role.principals.create({
                                principalType: RoleMapping.USER,
                                principalId: users[0].id
                            }, (err, principal) => {
                                if (err) throw(err);
                            });
                        });
                    }
                    else {
                        role.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: users[0].id
                        }, (err, principal) => {
                            if (err) throw(err);
                        });                            
                    }
                })
            });
        }
    });
}