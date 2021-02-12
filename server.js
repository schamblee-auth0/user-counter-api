const express = require('express');
const storage = require('node-persist');

const app = express();
const port = process.env.PORT || 8000;

app.get('/', async (req, res) => {
  try {
    await storage.init();
    const userCount = await storage.getItem('userCount');
    res.send({userCount: userCount});
  } catch (e) {
    console.error(e)
  }
});

app.post('/', async (req, res) => {
  try {
    await storage.init();
    let oldUserCount = await storage.getItem('userCount')
    oldUserCount++;
    const newUserCount = await storage.setItem('userCount', oldUserCount)
    const userCount = newUserCount.content.value;
    res.send({userCount});
  } catch (e) {
    console.error(e)
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
