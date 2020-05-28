module.exports = {
  server: {
    port: 3000,
  },
  logger: {
    writeInOneLogFile: false,
    disableConsoleWriting: false,
    namespaces: {
      default: {
        level: 'all',
      },
      app: {
        level: 'all',
      },
    },
  },
  pagination: {
    offset: 0,
    limit: 20,
  },
  root: {
    mail: 'root@gmail.com',
    pass: '123456',
  },
  aws: {
    mainInfo: {
      region: 'eu-central-1',
      accessKeyId: 'AKIARVNHUETZSRWSNS2F',
      secretAccessKey: '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',
    },
    serviceS3: {
      bucket: 'sp-bucket-dev',
      acl: 'public-read',
    },
  },
  sentry: {
    dsn: 'https://9c027245e98b4ef4a1ee7dab4ac9d946@sentry.io/1723373',
    userProps: ['id', 'email', 'role'],
  },
};
