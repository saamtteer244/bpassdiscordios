(function () {
  const { metro, patcher } = window.vendetta;
  const UserStore = metro.findByStoreName("UserStore");
  const patches = [];

  return {
    onLoad() {
      if (UserStore) {
        patches.push(
          patcher.after("getCurrentUser", UserStore, (_, user) => {
            if (user && typeof user === "object") {
              user.nsfwAllowed = true;
            }
          })
        );
        const current = UserStore.getCurrentUser();
        if (current) current.nsfwAllowed = true;
      }
    },
    onUnload() {
      for (const unpatch of patches) unpatch();
    }
  };
})();
