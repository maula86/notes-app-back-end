/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable padded-blocks */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
/* eslint-disable indent */

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
		routes: {
			cors: {
				origin: ['*'],
			},
		},
  });

	server.route(routes)

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};
// eslint-disable-next-line eol-last
init();