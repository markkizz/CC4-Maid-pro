const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = db => {
  return {
    createBooking: async (req, res) => {
      try {
        const { maidId } = req.params;
        const bookedUsers = await db.booking.findAll({
          where: {
            employer_id: req.user.id,
            maid_id: maidId
          },
          order: [['id', 'DESC']],
          limit: 1
        });

        const bookingStatus = bookedUsers && bookedUsers[0].dataValues.status;
        if (bookingStatus === 'WAIT_FOR_ACCEPTANCE') {
          res.status(400).json({ errorMessage: "User already booked" });
        } else {
          const result = await db.booking.create({
            customer_location: req.body.customerLocation,
            work_date: req.body.workDate,
            work_hour: req.body.workHour,
            status: "WAIT_FOR_ACCEPTANCE",
            pay_slip_image: req.body.paySlipImage,
            employer_id: req.user.id,
            maid_id: maidId,
          });
          if (result.length === 0) {
            res.status(204).json({ result });
          } else {
            res.status(200).json({ result });
          }
        }
      } catch (err) {
        console.error(err);
        if (err.message.includes("ECONNREFUSED")) {
          res.status(500).json({ errorMessage: "Database server error" });
        }
        res.status(400).json({ errorMessage: err.message });
      }
    },

    // employer history
    findBookingsByEmployerId: async (req, res) => {
      try {
        const employer = req.user;
        if (employer.type !== "EMPLOYER")
          res.status(400).json({ errorMessage: "Unauthorized" });
        const result = await db.booking.findAll({
          where: {
            employer_id: employer.id
          }
        });
        const resultMaidId = result.map(maid => maid.dataValues.maid_id);
        let maidData = [];
        for (let i = 0; i < resultMaidId.length; i++) {
          let maid = await db.user.findOne({
            where: { id: resultMaidId[i] },
            attributes: ["username", "first_name", "last_name", "profile_img"]
          });
          maidData.push(maid.dataValues);
        }
        const newResult = result.map((maid, i) => ({
          ...maid.dataValues,
          target_data: maidData[i]
        }));
        if (newResult.length === 0) {
          res.status(204).json(newResult);
        } else {
          res.status(200).json(newResult);
        }
      } catch (err) {
        if (err.message.includes("ECONNREFUSED")) {
          res.status(500).json({ errorMessage: "Database server error" });
        }
        res.status(400).json({ errorMessage: err.message });
      }
    },
    // maid history
    findBookingsByMaidId: async (req, res) => {
      try {
        const maid = req.user;
        if (maid.type !== "MAID")
          res.status(401).json({ errorMessage: "Unauthorized" });
        const result = await db.booking.findAll({
          where: {
            maid_id: maid.id
          }
        });
        const resultEmployerId = result.map(em => em.dataValues.employer_id);
        let employerData = [];
        for (let i = 0; i < resultEmployerId.length; i++) {
          let employer = await db.user.findOne({
            where: { id: resultEmployerId[i] },
            attributes: ["username", "first_name", "last_name", "profile_img"]
          });
          employerData.push(employer.dataValues);
        }
        const newResult = result.map((em, i) => ({
          ...em.dataValues,
          target_data: employerData[i]
        }));
        if (newResult.length === 0) {
          res.status(204).json(newResult);
        } else {
          res.status(200).json(newResult);
        }
      } catch (err) {
        if (err.message.includes("ECONNREFUSED")) {
          res.status(500).json({ errorMessage: "Database server error" });
        }
        res.status(400).json({ errorMessage: err.message });
      }
    },

    maidAcceptBooking: async (req, res) => {
      try {
        const { employerId } = req.params;
        const maid = req.user;
        if (maid.type !== "MAID")
          res.status(401).json({ errorMessage: "Unauthorized" });
        const maidBooking = await db.booking.findOne({
          where: { maid_id: maid.id, employer_id: employerId }
        });
        if (
          Object.keys(maidBooking).length === 0 &&
          maidBooking.constructor === Object
        ) {
          res.status(204).json({ errorMessage: "no booking" });
        }
        if (maidBooking.dataValues.status === "WAIT_FOR_ACCEPTANCE") {
          await maidBooking.update({ status: "ACCEPT" });
          res.status(200).json({ message: "accpect complete" });
        } else {
          res
            .status(406)
            .json({ message: "Already accept or employer reject" });
        }
      } catch (err) {
        if (err.message.includes("ECONNREFUSED")) {
          res.status(500).json({ errorMessage: "Database server error" });
        }
        res.status(400).json({ errorMessage: err.message });
      }
    },

    maidRejectBooking: async (req, res) => {
      try {
        const { employerId } = req.params;
        const { reject_note } = req.body;
        const maid = req.user;
        if (maid.type !== "MAID")
          res.status(401).json({ errorMessage: "Unauthorized" });
        const maidBooking = await db.booking.findOne({
          where: { maid_id: maid.id, employer_id: employerId }
        });
        if (
          Object.keys(maidBooking).length === 0 &&
          maidBooking.constructor === Object
        ) {
          res.status(204).json({ errorMessage: "no booking" });
        }
        if (maidBooking.dataValues.status === "WAIT_FOR_ACCEPTANCE") {
          await maidBooking.update({ status: "REJECT", reject_note });
          res.status(200).json({ message: "reject complete" });
        } else {
          res
            .status(406)
            .json({ message: "Already reject" });
        }
      } catch (err) {
        if (err.message.includes("ECONNREFUSED")) {
          res.status(500).json({ errorMessage: "Database server error" });
        }
        res.status(400).json({ errorMessage: err.message });
      }
    }
  };
};
