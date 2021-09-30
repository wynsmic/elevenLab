import dotenv from "dotenv";
dotenv.config();



const getConfig=(env)=>{
  switch(env){
    case 'TEST': case 'test':
      return [
        process.env.SQL_DB_TEST,
        process.env.SQL_USER,
        process.env.SQL_PSW,
        {
          host: process.env.SQL_HOST_TEST,
          dialect: "mysql",
        }
      ];

    default:
      return [
        process.env.SQL_DB,
        process.env.SQL_USER,
        process.env.SQL_PSW,
        {
          host: process.env.SQL_HOST,
          dialect: "mysql",
        }
      ];
  }
}

export const config = getConfig(process.env.NODE_ENV)
