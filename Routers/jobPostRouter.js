import express from 'express';
import { getAllJobs, getSearch, postJob } from '../Controllers/jobPostController.js';

const router = express.Router();

router.post('/post-job',postJob);//to post new jobs
router.get('/getjobs/:id',getAllJobs);//to get the jobs for the user
router.get('/getsearch',getSearch);//to get the search

export default router;