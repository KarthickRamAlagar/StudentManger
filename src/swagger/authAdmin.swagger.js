/**
 * @swagger
 * /api/v1/EduManager/authAdmin/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Auth Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */

/**
 * @swagger
 * /api/v1/EduManager/authAdmin/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Auth Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserIdParam'
 *     responses:
 *       200:
 *         description: User fetched successfully
 */

/**
 * @swagger
 * /api/v1/EduManager/authAdmin/users/{id}/role:
 *   patch:
 *     summary: Update user role
 *     tags:
 *       - Auth Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRoleRequest'
 *     responses:
 *       200:
 *         description: Role updated successfully
 */

/**
 * @swagger
 * /api/v1/EduManager/authAdmin/users/{id}/status:
 *   patch:
 *     summary: Update user status
 *     tags:
 *       - Auth Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateStatusRequest'
 *     responses:
 *       200:
 *         description: Status updated successfully
 */
