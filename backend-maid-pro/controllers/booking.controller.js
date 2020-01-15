module.exports = (db) => {
  return {
    createBooking: async (req, res) => {
      try {
        const result = await
          db.booking.create({
            work_at: req.body.work_at,
            work_hour: req.body.work_hour,
            status: 'WAIT_FOR_ACCEPTANCE',
            pay_slip_image: req.body.pay_slip_image,
            employer_id: req.body.employer_id,
            maid_id: req.body.maid_id
          });
        if (result.length === 0) {
          res.status(204).json({ result })
        } else {
          res.status(200).json({ result })
        }
      } catch (err) {
        if (err.message.includes('ECONNREFUSED')) {
          res.status(500).json({ errorMessage: 'Database server error' })
        }
        res.status(400).json({ errorMessage: err.message })
      }
    },
  }
};
