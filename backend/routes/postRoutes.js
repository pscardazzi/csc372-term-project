const express = require('express');
const PostController = require('../controllers/postController');
const router = express.Router();
const cors = require('cors');

const corsOptions = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Allow cookies and authentication headers
};

router.use(cors(corsOptions));

router.get('/', PostController.fetchAllPosts);
router.get('/:id', PostController.fetchPostById);
router.post('/', PostController.createPost);
router.put('/:id', PostController.changePost);
router.delete('/:id', PostController.removePost);

module.exports = router;

