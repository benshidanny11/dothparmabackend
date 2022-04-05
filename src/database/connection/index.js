import {Client, Pool} from 'pg';
import { databaseConfig as config, serverConfig } from '../../config';

export default () => new Pool(config[serverConfig.env]);