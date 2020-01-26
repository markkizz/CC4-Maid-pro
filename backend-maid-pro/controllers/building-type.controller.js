module.exports = (db) => {
  return {
    findBuildingTypes: async (req, res) => {
      try {
        const result = await db.building_type.findAll();
        if (result.length === 0) {
          res.status(204).json();
        } else {
          res.json(result);
        }
      } catch (ex) {
        console.error(ex);
        if (ex.message.includes("ECONNREFUSED")) {
          res.status(500).json({ errorMessage: 'Database Server Error' });
        }
        res.status(400).json({ errorMessage: ex.message });
      }
    }
  }
};