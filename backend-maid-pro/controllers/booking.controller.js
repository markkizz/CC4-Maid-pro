const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = db => {
  return {
    createBooking: async (req, res) => {
      try {
        const { maidId } = req.params;
        const userBooking = await db.booking.findOne({
          where: {
            employer_id: req.user.id,
            maid_id: maidId
          }
        });
        if (userBooking && userBooking.dataValues.status !== 'ACCEPT')
          res.status(400).json({ errorMessage: "User already booked" });
        const result = await
          db.booking.create({
            customer_location: req.body.customer_location,
            work_date: req.body.work_date,
            work_hour: req.body.work_hour,
            status: 'WAIT_FOR_ACCEPTANCE',
            pay_slip_image: req.body.pay_slip_image,
            employer_id: req.user.id,
            maid_id: maidId
          });
        if (result.length === 0) {
          res.status(204).json({ result });
        } else {
          res.status(200).json({ result });
        }
      } catch (err) {
        if (err.message.includes("ECONNREFUSED")) {
          res.status(500).json({ errorMessage: "Database server error" });
        }
        res.status(400).json({ errorMessage: err.message });
      }
    },

    findBookingsByEmployerId: async (req, res) => {
      try {
        const result = await db.booking.findAll({
          where: {
            employer_id: req.params.employerId
          }
        });
        if (result.length === 0) {
          res.status(204).json(result);
        } else {
          res.status(200).json(result);
        }
      } catch (err) {
        if (err.message.includes("ECONNREFUSED")) {
          res.status(500).json({ errorMessage: "Database server error" });
        }
        res.status(400).json({ errorMessage: err.message });
      }
    },

    findBookingsByMaidId: async (req, res) => {
      try {
        const maid = req.user;
        if (maid.type !== "MAID")
          res.status(401).json({ errorMessage: "Unauthorized" });
        const result = await db.booking.findAll({
          where: {
            maidId: maid.id
          }
        });
      } catch (err) {
        if (err.message.includes("ECONNREFUSED")) {
          res.status(500).json({ errorMessage: "Database server error" });
        }
        res.status(400).json({ errorMessage: err.message });
      }
    }
  };
};
