#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { VpcChatBotStack } from '../lib/vpc_chat_bot-stack';

const app = new cdk.App();
new VpcChatBotStack(app, 'VpcChatBotStack');
