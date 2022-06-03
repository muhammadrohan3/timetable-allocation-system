const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Timetable = require('../../model/TimeTable')
const { check, validationResult } = require('express-validator');

const Slot = require('../../model/Slot');

// @route   GET api/timetable
// @desc    Get all slots
// @access  private
router.get('/', async (req, res) => {
  try {
    const slots = await Slot.find();
    res.json(slots);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/timetable/:id
// @desc    Delete slot by ID
// @access  private
router.delete('/:id', async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) {
      return res.status(404).json({ msg: 'Slot Not Found' });
    }
    await slot.remove();
    res.json({ msg: 'Slot Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/timetable/
// @desc    Delete all slots
// @access  private
router.delete('/', async (req, res) => {
  try {
    await Slot.deleteMany();
    res.json('All slots deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/timetable/slots v1 [Has try catch in and outside the map]. v2 in employee api
// @desc    Add slots
// @access  private
router.post('/slots', auth, async (req, res) => {
  const sheet = req.body;
  const skippedEntries = [];

  try {
    /* console.log(sheet); */
    for (slot in sheet) {
      const startTime = sheet[slot][Object.keys(sheet[slot])[0]];
      const endTime = sheet[slot][Object.keys(sheet[slot])[1]];
      const dayOfTheWeek = sheet[slot][Object.keys(sheet[slot])[2]];
      const module = sheet[slot][Object.keys(sheet[slot])[3]];
      const venue = sheet[slot][Object.keys(sheet[slot])[4]];
      let group = '',
        sessionType = '',
        staffRequirement = '';
      if (sheet[slot][Object.keys(sheet[slot])[5]][0] == 'Y') {
        group = sheet[slot][Object.keys(sheet[slot])[5]];
        sessionType = sheet[slot][Object.keys(sheet[slot])[6]];
        staffRequirement = sheet[slot][Object.keys(sheet[slot])[7]];
      } else {
        sessionType = sheet[slot][Object.keys(sheet[slot])[5]];
        staffRequirement = sheet[slot][Object.keys(sheet[slot])[6]];
      }

      let found = await Slot.findOne({ startTime, dayOfTheWeek, group });
      if (found) {
        /* console.log(found + ' was found'); */
        continue;
      }

      slot = new Slot({
        startTime,
        endTime,
        dayOfTheWeek,
        module,
        venue,
        group,
        sessionType,
        staffRequirement,
      });

      await slot.save();
    }
  } catch (error) {
    console.error(error.message);
  }
});

router.post('/createTimeTable' , async(req,res)=>
{
    req.body.timetable.forEach(async (item)=>{
      try {
        let result = await new Timetable({
          module : item.module, 
          startTime : item.startTime, 
          endTime : item.endTime, 
          empName : item.empName, 
          empNo : item.empNo , 
          sessionType : item.sessionType,
          venue : item.venue, 
          day : item.dayOfTheWeek,
          slotID : item._id
        }).save()
        let result2 = await Slot.updateOne({_id : item._id} ,{assigned : true})
      } catch (error) {
        console.log(error)
      }
      
    })
    res.status(200).send("added")
})

router.post('/deleteSlots' , async(req , res)=>
{
  try {
    await Timetable.deleteMany({slotID : req.body.slotID})
    const test3 = await Slot.findByIdAndUpdate(req.body.slotID ,{$set : {assigned : false}}) 
    
    
    res.status(200).send("result")
  } catch (error) {
    res.status(500).send("internal server error")
  }
})
router.get('/getTimeTable' , async (req, res)=>
{
  try {
    const result = await Timetable.find()
    res.status(200).send(result)
  } catch (error) {
    
  }
})
module.exports = router;
