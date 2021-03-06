import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Cookies from "cookies";

var scope =
  "user-top-read user-read-private user-read-email user-read-currently-playing";
const NextAuthOptions = (req, res) => ({
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const setCookies = async () => {
        const cookies = new Cookies(req, res);
        cookies.set("next-auth.refreshToken", account.refreshToken);
      };
      await setCookies();
      return true;
    },
    async redirect(url = `${process.env.BASE_URL}/getRefreshAcessToken`) {
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
