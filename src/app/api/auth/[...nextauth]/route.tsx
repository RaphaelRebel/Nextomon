import nextAuth from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github"

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? ""
        })
    ]
};

export const handler = nextAuth(authOptions);

export {handler as GET, handler as POST}