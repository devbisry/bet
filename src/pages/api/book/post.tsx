import { paramCase } from 'change-case';
// next
import { NextApiRequest, NextApiResponse } from 'next';
// utils
import cors from 'src/utils/cors';
import connectMongo from '../../../lib/dbConnect';
import Blog from '../../../models/blog'

// _mock
// import { posts } from 'src/_mock/_blog';

// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await cors(req, res);
    await connectMongo();
    const posts = await Blog.find({});
    const { title } = req.query;

    const post = posts.find((_post) => paramCase(_post.title) === title);

    if (!post) {
      return res.status(404).json({
        message: 'Post not found!',
      });
    }

    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
}
