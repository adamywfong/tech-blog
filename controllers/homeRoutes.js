const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name']
            }
          ],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', { 
      title: 'The Tech Blog',
      posts,
      logged_in: req.session.logged_in, 
      userId: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login', { 
    title: 'The Tech Blog'
  });
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {exclude: ['password']},
      include: [
        {
          model: Post,
          include: [{model:Comment, attribute: ['id']}]
        },
      ]
    });
    const user = userData.get({ plain: true });
    res.render('dashboard', {
      title: 'Your Dashboard',
      user,
      logged_in: req.session.logged_in,
      userId: req.session.user_id
    })
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: {exclude: ['password']},
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name']
            }
          ],
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render('post', {
      title: 'The Tech Blog',
      post,
      logged_in: req.session.logged_in
    })
    } catch (err) {
      res.status(500).json(err);
    }
});
  
module.exports = router;