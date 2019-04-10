module.exports = function(app) {

    var LoggedUser = app.models.LoggedUser;

    LoggedUser.findOne({ username: 'sysAdmin' }, (err, users) => {

        if (!users) {
        LoggedUser.create([
              {emailVerified: true, username: 'sysAdmin', email: 'sysadmin@ahref.net', password: 'password', city: 'Novi Sad', telephone: '069696969', image: 'Images/sysAdmin.png', name: 'System administrator', type: 'sysAdmin'}
          ], (err, users) => {
              if (err) throw(err);
              
              var Role = app.models.Role;
              var RoleMapping = app.models.RoleMapping;

              Role.findOne({name: 'sysAdmin'}, (err, role) => {

                  if (!role) {
                      Role.create({
                          name: 'sysAdmin'
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




    // THIS CODE WILL BE DELETED WHEN THE SYS-ADMINS FUNCTIONALITY TO ADD OTHER ADMINS IN IMPLEMENTED
    LoggedUser.findOne({ username: 'racAdmin' }, (err, users) => {

        if (!users) {
        LoggedUser.create([
                {emailVerified: true, username: 'racAdmin', email: 'racAdmin@ahref.net', password: 'password', city: 'Novi Sad', telephone: '069696969', image: 'Images/racAdmin.png', name: 'Rentacar administrator', type: 'racAdmin'}
            ], (err, users) => {
                if (err) throw(err);
                
                var Role = app.models.Role;
                var RoleMapping = app.models.RoleMapping;

                Role.findOne({name: 'arcAdmin'}, (err, role) => {

                    if (!role) {
                        Role.create({
                            name: 'racAdmin'
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
    LoggedUser.findOne({ username: 'hotelAdmin' }, (err, users) => {

        if (!users) {
        LoggedUser.create([
                {emailVerified: true, username: 'hotelAdmin', email: 'hoteladmin@ahref.net', password: 'password', city: 'Novi Sad', telephone: '069696969', image: 'Images/hotelAdmin.png', name: 'Hotel administrator', type: 'hotelAdmin'}
            ], (err, users) => {
                if (err) throw(err);
                
                var Role = app.models.Role;
                var RoleMapping = app.models.RoleMapping;

                Role.findOne({name: 'hotelAdmin'}, (err, role) => {

                    if (!role) {
                        Role.create({
                            name: 'hotelAdmin'
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
    LoggedUser.findOne({ username: 'airlineAdmin' }, (err, users) => {

        if (!users) {
        LoggedUser.create([
                {emailVerified: true, username: 'airlineAdmin', email: 'airlineadmin@ahref.net', password: 'password', city: 'Novi Sad', telephone: '069696969', image: 'Images/airlineAdmin.png', name: 'Airline administrator', type: 'airlineAdmin'}
            ], (err, users) => {
                if (err) throw(err);
                
                var Role = app.models.Role;
                var RoleMapping = app.models.RoleMapping;

                Role.findOne({name: 'airlineAdmin'}, (err, role) => {

                    if (!role) {
                        Role.create({
                            name: 'airlineAdmin'
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