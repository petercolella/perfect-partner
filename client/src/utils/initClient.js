initClient = function() {
  const self = this;
  window.gapi.load('auth2', function() {
    window.gapi.auth2
      .init({
        client_id:
          '773798651320-0da27e8d6k9mo9ldaijdlupeib1r56jq.apps.googleusercontent.com'
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
