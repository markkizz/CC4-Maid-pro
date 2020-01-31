const buildingTypeController = require('../controllers/building-type.controller');

module.exports = (server, db) => {
	const controller = buildingTypeController(db);

	server.get('/building-types', controller.findBuildingTypes);
};