import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import nookies from "nookies";
var scope =
  "user-top-read user-read-private user-read-email user-read-currently-playing";
export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const setRefreshToken = async () => {
        nookies.set(null, "next-auth.refreshToken", account.refreshToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      };
      await setRefreshToken();
      return true;
    },
    async redirect(url = `${process.env.BASE_URL}/Home`) {
      return url;
    },
    // session: async (session, profile) => {
    //   console.log("In session");
    //   console.log(session);
    //   console.log(profile);

    //   return Promise.resolve(session);
    // },
    async jwt(token, user, account, profile, isNewUser) {
      console.log(account);
      return token;
    },
  },
});

// export default (req, res) => {
//   return NextAuth(req, res, NextAuthOptions(req, res));
// };
