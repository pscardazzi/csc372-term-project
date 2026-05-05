import express from "express";
import PostController from '../controllers/postController.js'
const router = express.Router();
import cors from "cors";

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

export default router;

