/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */

declare module "sst" {
  export interface Resource {
    "MyPostgres": {
      "database": string
      "host": string
      "password": string
      "port": number
      "type": "sst.aws.Postgres"
      "username": string
    }
    "MyUserPool": {
      "id": string
      "type": "sst.aws.CognitoUserPool"
    }
    "MyVpc": {
      "type": "sst.aws.Vpc"
    }
    "MyWeb": {
      "type": "sst.aws.Nextjs"
      "url": string
    }
    "WebClient": {
      "id": string
      "secret": string
      "type": "sst.aws.CognitoUserPoolClient"
    }
  }
}
/// <reference path="sst-env.d.ts" />

import "sst"
export {}