import { body } from 'express-validator'

export const authorsValidation = [body("name").exists().withMessage("field mandatory"), body("surname").exists().withMessage("field mandatory"), body("email").exists().withMessage("field mandatory")]