import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Cookies from "cookies";

var scope =
  "user-top-read user-read-private user-read-email user-read-currently-playing";
const NextAuthOptions = (req, res) => ({
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
        const cookies = new Cookies(req, res);
        cookies.set("next-auth.refreshToken", account.refreshToken, {
          httpOnly: true,
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async redirect(url = "http://localhost:3000/Home") {
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

export default (req, res) => {
  return NextAuth(req, res, NextAuthOptions(req, res));
};
