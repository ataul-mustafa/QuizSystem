const { Router } = require("express");
const router = Router();

/** import controllers */
const {getUserQuestions, getResultsForTecher, getResultsForStudent, getQuizId, getResult,
         storeResult, dropResult,
         compareUniqueId, registerUser, loginUser, logout, forgotPassword, resetPassword, 
         getUserDetails, updateUserPassword, updateUserProfile, getAllUser, getSingleUser,
         updateUserRole, deleteUser, getQuestions, insertQuestions, dropQuestions
} = require('../controllers/controller.js');

// import authentication and authorization middlewares

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth.js');

/** Questions Routes API */

router.route('/questions')
        .get(getQuestions) /** GET Request */
        .post(insertQuestions) /** POST Request */
        .delete(dropQuestions) /** DELETE Request */

router.route("/fetchQuestions").post(isAuthenticatedUser, getUserQuestions);

router.route("/teacher/getResults").post(isAuthenticatedUser, getResultsForTecher);

router.route("/student/getResults").post(isAuthenticatedUser, getResultsForStudent);

router.route("/teacher/quizIds").post(isAuthenticatedUser, getQuizId);

router.route('/result')
        .get(getResult)
        .post(storeResult)
        .delete(dropResult)

router.route('/uniqueId').post(isAuthenticatedUser, compareUniqueId);

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/me').get(isAuthenticatedUser, getUserDetails)
router.route('/password/update').put(isAuthenticatedUser, updateUserPassword)
router.route('/me/update').put(isAuthenticatedUser, updateUserProfile)
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
        .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
        .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

        

module.exports = router;