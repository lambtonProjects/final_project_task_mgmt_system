class UserService {
    constructor(db) {
      this.db = db
    }
    getUsers(success, error) {
        this.db.collection('users').get().then(function(values){
            success(values.data());
        }).catch(function(err){
            error(err);
        });
    }
    saveUser(userData, success, error) {
        db.collection("users").doc(userData.id)
            .set(userData)
            .then((docRef) => 
            {
                success(docRef);
            })
            .catch((err) => {
                error(err);
            });
    }
  }