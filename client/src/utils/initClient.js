initClient = function() {
  const self = this;
  window.gapi.load('auth2', function() {
    window.gapi.auth2
      .init({
        client_id:
          '1061415806670-1l8r6vaqn21lc7h45l0ethglqat21kls.apps.googleusercontent.com'
      })
      .then(
        GoogleAuth => {
          const userProfile = GoogleAuth.currentUser.get().getBasicProfile();
          if (userProfile) {
            const currentUserEmail = userProfile.getEmail();
            self.setState(
              {
                userEmail: currentUserEmail
              },
              () => {
                self.loadUserInfo();
              }
            );
          }
        },
        err => {
          console.log(err);
        }
      );
  });
};
