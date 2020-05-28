module.exports = {
  sequelize: {
    database: 'tfvjdres',
    username: 'tfvjdres',
    password: 'RgnRRIQn_6znYVSrZXIWnRhHZ-iylk0K',
    host: 'balarama.db.elephantsql.com',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  },
  knex: {
    client: 'pg',
    connection: {
      host: 'balarama.db.elephantsql.com',
      port: 5432,
      user: 'tfvjdres',
      password: 'RgnRRIQn_6znYVSrZXIWnRhHZ-iylk0K',
      database: 'tfvjdres',
    },
  },
  firebase: {
    appConfig: {
      apiKey: 'AIzaSyAZHLcijcR0d3gkh-lwA-zMwsxAwDZhZa8',
      authDomain: 'sweetpay-local-912c0.firebaseapp.com',
      databaseURL: 'https://sweetpay-local-912c0.firebaseio.com',
      projectId: 'sweetpay-local-912c0',
      storageBucket: '',
      messagingSenderId: '243712111268',
      appId: '1:243712111268:web:4b48d9001f70947c',
    },
    accountKey: {
      type: 'service_account',
      project_id: 'sweetpay-local-912c0',
      private_key_id: '35365cbb3c1e9cd7bd4cba694d603e00a04906d3',
      private_key: `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDKPPLK3SBBVBuc
h0SYN+l0+6vk8ahtDSNUx6nQbaBeoqoMwwfmTTMjC8tUOR7mhkGUy1UL7qu03F31
FCT52sgdIu0RcgxTo0giPrt2YGMEBX+kCz3eQVVXMlOY2cFcc+EvoW6p0CQOPalT
R4t09EvGqyda7zmB/3veQhupWyS6xKBRkMJAe+l0TH99Y7BbMD4bn5GT4o6VYJCJ
1wOwxq4VT7QRulhTdA8GFjt4xorr2X4jcGwJhfPbNCXRCD7fRwDMct9KfFaAXoL5
Nfhk/zpmTUvh9oAr6sLepHGpd7R8+gAFKD5DmbaBHdyLmgLnK5AM3olyNZ+dusHa
de4BiwcfAgMBAAECggEADo67lWG8eCdjQ22zQNfJfMu+8GB61Lq839XtgdzaTeWc
owWI9Il7FFs9fCcOc96XKuxGB3FbN84jD0ivbrLSc9J3SSmx/HVE9H4ahWdjyT7S
FM9gWTbPu1KalOab1hlbTM/shNnANqw2m5GLVtRc/gSE9TVCKProgjO1BQhUCQOM
dbqF528wyxDZLPBVy0rqEtiLZh/P5dJXvMVxfJ3rOhzclNFVTp4aWtJoQ8GEncnw
jMntvffxFd+00m1aizaghHQ3HhO/Q/dUAX+LLVra4m0GAvM6zyBQ0a4fHEP24CyY
6gK0hre5lxxqS3204GdstEOxGl2Yd/GHq4RioBLJTQKBgQD59RkTTuh2PLCjbCsj
2QLKLrC5PZ7WIl8s/OKkxC6R6WGJRclEH1oaAKnKBRqrNR5FVW/rwMOlApOb+Tu7
qGZrxE0d61IvuEBwsrXWjyGFmnUvpgR8CTPpr+manniAilmUibSvaLJgeBhlM0OA
F7da4LfRah94ylTEQrZTAVX/0wKBgQDPIIgXdlwdDlTyrj0z/mGVJjtD9uhcyWJH
FPZrPUQIhoy/xjimJ5kTqI9ptcd5n2vJARg2tH6G29cQr9KJpCjoAAyZY5FK6UvK
wx6pLi6ofWFoIGteOZuVKQj+lPbWmkhzJ69wR8ZaTdST3fDZyvXsvoMrEoyRs1q5
Z6pvGhHYBQKBgE4nBzcVRfOqGCSQrpBfytKCdLkGfkI/rvh2/To9KL5wdRGho0NM
djSJHo1OuT7stdFB3GOe+sz+GD79V2LeTV/GmcIQELtg5a0XA2nZiMaoO5mxU9eg
XP3lBapVgCHYoBekUr1Bg/xLsHz74VAMmkSs3Gx6vOpcgNJ4dV9QnJ4HAoGAGAqn
oUmMwZajR5Pv6LQTMZPBd08Wg4agkK2fOK1g0ziC59OjSa34964uD1AZOkXF5gvp
epgSw6aK3RX7cxyJ3vv6emdzOuW/dWaWjX6dzdLX1pVEwSggpfygXaR+zkQUOsGV
fIvoOx0jmpI9XZpQV015vismA9d0pWaiAslc3t0CgYBZ3mGgN1Vy5AAW2rRxorfZ
hVP5uufVC/ACFmBWMud5pq2cl+0jnapN8YBJC+FDRFdaHQBko6EfI3/8xUQmSZDV
m9omklzQouuqKoXyoJRjMhZexcGCOwStFhdmYnlOlkoziT/7zwHe0e0ShDQDz4q3
22oWsugwjEI71E93rFpVgg==
-----END PRIVATE KEY-----`,
      client_email: 'firebase-adminsdk-9dlir@sweetpay-local-912c0.iam.gserviceaccount.com',
      client_id: '100936907864248135337',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9dlir%40sweetpay-local-912c0.iam.gserviceaccount.com',
    },
  },
};
