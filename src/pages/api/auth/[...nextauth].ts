import NextAuth from "next-auth";
import Providers from "next-auth/providers";

var scope = "user-read-private user-read-email";
export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      scope,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      try {
        console.log(user);
        console.log(account);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async redirect(url) {
      url = "http://localhost:3000/PlaylistPage";
      return url;
    },
    // session: async (session, profile) => {
    //   console.log("In session");
    //   console.log(session);
    //   console.log(profile);

    //   return Promise.resolve(session);
    // },
  },
});
