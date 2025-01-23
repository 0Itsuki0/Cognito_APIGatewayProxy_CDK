#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CognitoDemoStack } from '../lib/handler-stack';

const app = new cdk.App();
const stack = new CognitoDemoStack(app, 'CognitoDemoStack', {})
