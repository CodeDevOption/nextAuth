import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import Credentials from "next-auth/providers/credentials";
import MongoConnection from '../../../database/conn';
import User from '../../../model/schema';
import { compare } from "bcryptjs";


export default NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret:process.env.GOOGLE_AUTH_CLIENT_SECRET
        }),
        GithubProvider({
            clientId:process.env.GITHUB_AUTH_CLIENT_ID,
            clientSecret:process.env.GITHUB_AUTH_CLIENT_SECRET,
        }),
        Credentials({
            name:'credentials',
            authorize: async (credentials,req)=>{
                MongoConnection().catch(error => {error:'Connection Failed...!'});

                //check user existing
                const result = await User.findOne({email:credentials.email});

                if(!result){
                    throw new Error("NO user Found with Email Please Sign Up...!");
                }
                
                //compare password
                const comparePass = compare(credentials.password,result.password);
                if(!comparePass || credentials.email !== result.email){
                    throw new Error("Username or Password doesn't match...!");
                }
                return result;
            } 
        }),
    ],
    secret:'vZlU91lVwAjd6aDvvyMxz3GP50WtDcPDuB9gyF7go6k=',
});