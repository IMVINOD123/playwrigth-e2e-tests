import { test as base } from '@playwright/test';

export type EnvConfig = {
  envName: string;
  appURL: string;
   dbConfig: {
    serverName: string;
    dbName: string;
    connectionStr: string;
    
  };
   nopCommerceURL: string;
};

export const test = base.extend<EnvConfig>({
  envName: ['test', { option: true }],
  appURL: ['<provideURL>', { option: true }],
  dbConfig: [{ serverName: '', dbName: '', connectionStr: '' }, { option: true }],
  nopCommerceURL: ['<provideURL>', { option: true }],
});