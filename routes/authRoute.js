import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { signIn, signUp } from '../controllers/authController.js';
import { validateSignUp } from '../middleware/validateSignUp.js';
import { validateSignIn } from '../middleware/validateSignIn.js';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 3, // Max 3 API Hits each IP per 15 Minutes
    handler: (req, res) => {
        res.status(400).json({ success: false, message: 'Too many requests from this IP, please try again after 15 minutes' })
    }
})

const router = Router();

router.post('/sign-up', validateSignUp, signUp);

router.post('/sign-in', limiter, validateSignIn, signIn);

export default router;