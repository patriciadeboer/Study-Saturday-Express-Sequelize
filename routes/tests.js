const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const allTests= await Test.findAll();
    res.send(allTests)
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    //when using findAll need brackets
    const [getTest]= await Test.findAll({
      where:{
        id:req.params.id,
      }
    })
    res.send(getTest)
    // const getTest= await Test.findById(req.params.id)
    // res.send(getTest)
  } catch (err) {
    next(err);
  }
});

router.post('/student/:studentId', async (req, res, next) => {
  try {
    const [getStudent]= await Student.findAll({
      where:{
        id:req.params.studentId
      }
    })

    const createTest = await Test.create(req.body)

    await createTest.setStudent(getStudent)

    res.status(201).send(createTest)
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteTest = await Test.destroy({
      where:{
        id:req.params.id,
      }
    })
    res.status(204).send()
  } catch (err) {
    next(err);
  }
});
