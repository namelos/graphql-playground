import path from 'path'
import express from 'express'
import webpack from 'webpack'
import config from '../webpack.config'
import graphqlHTTP from 'express-graphql'

import { schema } from './graphql-server'

express()

.use(require('webpack-dev-middleware')(webpack(config), {
  noInfo: true,
  publicPath: config.output.publicPath
}))

.use('/graphql', graphqlHTTP({ schema, pretty: true }))

.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../index.html')))

.listen(3000, _ => console.log('listening on 3000...'))