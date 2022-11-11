import { Router } from "express";
import userCrtl from "../conrollers/users.controller.js";

const route = Router()

route.post('/register', userCrtl.register)

export default route

