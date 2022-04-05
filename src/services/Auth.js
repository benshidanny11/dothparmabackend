import db from "../database/connection/_query";
import { generateToken } from "../utils/_auth";
//import Auth from "../middleware/Auth";
import bcrypt from "bcrypt";
import {
    getByEmail,
    create
} from "../database/queries/User";

class AuthService {
    async create(data) {
        const payload = {
            names: data[0],
            email: data[1],
            phonenumber: data[2],
            role: data[3],
        };
        let token = await generateToken(payload);
        let user = await db.query(create, data);
        return {
            user: user,
            token: token,
        };
    }

    async login(data) {
        try{
        let user = await db.query(getByEmail, [data[0]]);
        if (user.rowCount) {
            if (bcrypt.compareSync(data[1], user.rows[0].u_password)) {
                const payload = {
                    names: user.rows[0].u_name,
                    email: user.rows[0].u_email,
                    phonenumber: user.rows[0].u_phone,
                    role: user.rows[0].u_name,
                    userid: user.rows[0].u_id
                };
                let token = await generateToken(payload);
                return {
                    token: token,
                    user: user.rows,
                    message: "sussesfully logged in",
                };
            } else {
                return {
                    message: "password is incorrect",
                };
            }
        } else {
            return {
                message: "Invalid email",
            };
        }
    }catch(error){
        console.log(error)
        return error;
    }
    }


    // async updateUser(data) {
    //     let user = await db.query(update, data);
    //     if (user.rowCount) {
    //         return {
    //             message: "user updated",
    //             user: user,
    //         };
    //     } else {
    //         return {
    //             message: "oops! user not updated",
    //         };
    //     }
    // }
    // async updatePassword(data) {
    //     let user = await db.query(updatePassword, data);
    //     if (user.rowCount) {
    //         return {
    //             message: "password changed",
    //             status: 200,
    //         };
    //     } else {
    //         return {
    //             message: "oops! password not changed",
    //             status: 400,
    //         };
    //     }
    // }

    // async deleteuser(data) {
    //     let user = await db.query(deleteuser, data);
    //     if (user.rowCount) {
    //         return {
    //             status: 200,
    //             message: "user deleted",
    //         };
    //     } else {
    //         return {
    //             status: 400,
    //             message: "User doesn't exist",
    //         };
    //     }
    // }

    // async hideuser(data) {
    //     let user = await db.query(hideuser, data);
    //     if (user.rowCount) {
    //         return {
    //             status: 200,
    //             message: "user deleted",
    //         };
    //     } else {
    //         return {
    //             status: 400,
    //             message: "user not deleted",
    //         };
    //     }
    // }

    // async getAll(data) {
    //     const offset = (data[0] - 1) * 5;
    //     const totalUsersRes = await db.query(getTotalUsers);
    //     let users = await db.query(getAll, [offset]);
    //     if (users.rows.length != 0) {
    //         return {
    //             status: 200,
    //             users: users,
    //             message: "data found",
    //             totalPages: Math.ceil(totalUsersRes.rows[0].totaluses / 5)
    //         };
    //     } else {
    //         return {
    //             status: 400,
    //             message: "no data to display",
    //             users: [],
    //         };
    //     }
    // }

    // async findById(data) {
    //     let user = await db.query(getById, data);
    //     if (user.rowCount) {
    //         return {
    //             status: 200,
    //             message: "user found",
    //             user: user,
    //         };
    //     } else {
    //         return {
    //             status: 400,
    //             message: "user not found",
    //             user: [],
    //         };
    //     }
    // }

    // async searchUser(data) {
    //     let user = await db.query(searchUser, data);
    //     if (user.rowCount) {
    //         return {
    //             status: 200,
    //             message: "user found",
    //             user: user,
    //         };
    //     } else {
    //         return {
    //             status: 400,
    //             message: "user not found",
    //             user: [],
    //         };
    //     }
    // }

    // async findAllTeachers() {
    //     let teachers = await db.query(getByRole);
    //     if (teachers.rows.length != 0) {
    //         return {
    //             status: 200,
    //             message: "found",
    //             teachers: teachers,
    //         };
    //     } else {
    //         return {
    //             status: 400,
    //             message: "data not found",
    //             teachers: [],
    //         };
    //     }
    // }

    // async findByEmail(data) {
    //     let user = await db.query(getByEmail, data);
    //     if (user.rowCount) {
    //         return {
    //             status: 200,
    //             message: "user found",
    //             user: user,
    //         };
    //     } else {
    //         return {
    //             status: 400,
    //             message: "user not found",
    //             user: [],
    //         };
    //     }
    // }


}
export default new AuthService();