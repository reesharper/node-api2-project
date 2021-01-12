const Db = require('./db-helpers');
const express = require('express');
const router = express.Router()


router.get('/', (req, res) => {
  Db.find()
    .then(db => {
      res.status(200).json(db);
    })
    .catch(error => {
      res.status(500).json({ message: 'The posts information could not be retrieved.' })
    })
})

router.get('/:id', (req, res) => {
  Db.findById(req.params.id)
    .then(db => {
      if (db) {
        res.status(200).json(db);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'The post information could not be retrieved.', });
    });
});

router.get('/:id/comments', (req, res) => {
  Db.findPostComments(req.params.id)
    .then(comments => {
      if (comments.length > 0) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'The comments information could not be retrieved.', });
    });
});

router.post('/', (req, res) => {
  const post = req.body
  if(!post.title || !post.content) {
    res.status(400).json({ message: 'Please provide title and contents for the post.' })
  } else {
    Db.insert(post)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was an error while saving the post to the database', });
      });
  }
});

router.post('/:id/comments', (req, res) => {
  Db.findById(req.params.id)
  Db.insertComment(req.body)
    .then(db => {
      if (db) {
        res.status(201).json(db);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error adding the comment', });
    });
});

router.delete('/:id', (req, res) => {
  Db.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been deleted' });
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'The post could not be removed', });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Db.update(req.params.id, changes)
    .then(db => {
      if (db) {
        res.status(200).json(db);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'The post information could not be modified.', });
    });
});

module.exports = router