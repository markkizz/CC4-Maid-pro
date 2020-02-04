const Sequelize = require("sequelize");
const moment = require('moment');
const Op = Sequelize.Op;

module.exports = db => {
  return {
    createBooking: async (req, res) => {
      try {
        const { maidId } = req.params;
        const bookedUsers = await db.booking.findAll({
          where: { employer_id: req.user.id, maid_id: maidId },
          order: [['id', 'DESC']],
          limit: 1
        });
        const bookingStatus = bookedUsers.length && bookedUsers[0].dataValues.status;
        if (bookingStatus === 'WAIT_FOR_ACCEPTANCE') {
          res.status(422).json({ errorMessage: "User already booked" });
          return;
        }
        const workDate = moment(new Date(req.body.workDate)).format('YYYY-MM-DD');
        const workStartAt = moment(new Date(req.body.workStartAt)).format('hh:mm:ss');
        let photo = req.files.photo;
        let photoName = new Date().getTime() + ".jpeg";
        photo.mv("./uploads/" + photoName);
        const url = `http://localhost:8080/${photoName}`;
        const result = await db.booking.create({
          customer_location: req.body.customerLocation,
          work_date: `${workDate} ${workStartAt}`,
          work_hour: parseInt(req.body.workHour),
          status: "WAIT_FOR_ACCEPTANCE",
          pay_slip_image: url,
          employer_id: req.user.id,
          maid_id: maidId,
          building_type_id: req.body.buildingTypeId
        });
        if (result.length === 0) {
          res.status(204).json({ result });
        } else {
          res.status(201).json({ result });
        }
      } catch (err) {
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
        if (employer.type !== "EMPLOYER") res.status(400).json({ errorMessage: "Do not have permission to do" });
        const maids = await db.booking.findAll({
          where: {
            employer_id: employer.id
          },
          include: db.buildingType,
        });
        const buildingTypes = [];
        for (const maid of maids) {
          const buildingTypeId = maid.dataValues.building_type_id;
          const buildingType = await db.building_type.findOne({
            where: { id: buildingTypeId },
            attributes: ['type']
          });
          buildingTypes.push(buildingType);
        }
        const resultMaidId = maids.map(maid => maid.dataValues.maid_id);
        let maidData = [];
        for (let i = 0; i < resultMaidId.length; i++) {
          let maid = await db.user.findOne({
            where: { id: resultMaidId[i] },
            attributes: ["id", "username", "first_name", "last_name", "profile_img"]
          });
          maidData.push(maid.dataValues);
        }
        const newResult = maids.map((maid, i) => ({
          ...maid.dataValues,
          target_data: maidData[i],
          building_type: buildingTypes[i].dataValues.type
        }));

        if (newResult.length === 0) {
          res.status(204).json(newResult);
        } else {
          res.status(200).json(newResult);
        }
      } catch (err) {
        console.error(err);
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
          res.status(403).json({ errorMessage: "Do not have permission to do" });
        const employers = await db.booking.findAll({
          where: {
            maid_id: maid.id
          },
          include: db.buildingType
        });
        let buildingTypes = []
        for (const em of employers) {
          const buildingTypeId = em.dataValues.building_type_id;
          const buildingType = await db.building_type.findOne({
            where: { id: buildingTypeId },
            attributes: ['type']
          });
          buildingTypes.push(buildingType);
        }
        const resultEmployerId = employers.map(em => em.dataValues.employer_id);
        let employerData = [];
        for (let i = 0; i < resultEmployerId.length; i++) {
          let employer = await db.user.findOne({
            where: { id: resultEmployerId[i] },
            attributes: ["id", "username", "first_name", "last_name", "profile_img"]
          });
          employerData.push(employer.dataValues);
        }
        const newResult = employers.map((em, i) => ({
          ...em.dataValues,
          target_data: employerData[i],
          building_type: buildingTypes[i].dataValues.type
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
          res.status(403).json({ errorMessage: "Do not have permission to do" });
        let maidBooking = await db.booking.findAll({
          where: { maid_id: maid.id, employer_id: employerId }
        });
        maidBooking = maidBooking[maidBooking.length - 1]
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
          res.status(406).json({ message: "Already accept or employer reject" });
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
          res.status(403).json({ errorMessage: "Do not have permission to do" });
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
          res.status(406).json({ message: "Already reject" });
        }
      } catch (err) {
        if (err.message.includes("ECONNREFUSED")) {
          res.status(500).json({ errorMessage: "Database server error" });
        }
        res.status(400).json({ errorMessage: err.message });
      }
    },

    maidCompleteCleaning: async (req, res) => {
      try {
        const { maidId } = req.params;
        const employer = req.user;
        if (employer.type !== "EMPLOYER")
          res.status(403).json({ errorMessage: "Do not have permission to do" });
        const employerBooking = await db.booking.findOne({
          where: { employer_id: employer.id, maid_id: maidId }
        });
        if (
          Object.keys(employerBooking).length === 0 &&
          employerBooking.constructor === Object
        ) {
          res.status(204).json({ errorMessage: "no booking" });
        }
        if (employerBooking.dataValues.status === "ACCEPT") {
          await employerBooking.update({ status: "FINISHED" });
          res.status(200).json({ message: "Cleaning complete" });
        } else {
          res.status(406).json({ message: "Already complete" });
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
