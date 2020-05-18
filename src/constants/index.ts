import RNFS from 'react-native-fs';

const env = process.env.ENV || "development";

export const URL =
    env === "development"
        ? process.env.PRISMA_URL_DEV ||
        "https://dakota2-api-dev.secondcompany.nl/graphql"
        : process.env.PRISMA_URL_ACC ||
        "https://dakota2-api-acc.secondcompany.nl/graphql";

export const LOCAL_FILE_PATH = RNFS.DocumentDirectoryPath;
