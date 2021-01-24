const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const { User, Item } = require('../db/models')
const config = require('../config.json');

// Todo: separate these into Users and Items resolver classes/files...

module.exports = {

    async getItems({ limit }, ctx) {
        if (!ctx.user) 
            throw new Error('Not authenticated.')

        const items = await Item.findAll({
            //include: [ { model: User } ]
        }, { order: [
            ['id', 'DESC']
        ]});

        return items;
    },

    async addItem({ title }, ctx) {
        try {
            if (!ctx.user) 
                throw new Error('Not authenticated.')

            const item = await Item.create({
                title: title,
                userEmail: ctx.user.email
            })

            return {
                id: item.id,
                title: item.title,
                createdAt: item.createdAt,
                userEmail: item.userEmail
            }
        } catch (error) {
            throw new Error(error.message)
        }
    },

    async signup({ email, password }, ctx) {
        try {
            let user = User.findOne({ where: { email }})
            if (user) {
                throw new Error('User already exists');
            }

            user = await User.create({
                email,
                password: await bcrypt.hash(password, 10)
            })

            return {
                success: true,
                message: "Authentication successful"
            }
        } catch (error) {
            throw new Error(error.message)
        }
    },

    async login({ email, password }, ctx) {
        try {
            const user = await User.findOne({ where: { email }})
            if (!user) {
                throw new Error('No user with that email')
            }

            const isValid = await bcrypt.compare(password, user.password)
            if (!isValid) {
                throw new Error('Incorrect password')
            }

            const token = jsonwebtoken.sign(
                { email: user.email }, 
                config.jwtSecret,
                { expiresIn: '1d' }
            )

            return { 
                token, 
                user: {
                    id: user.id,
                    email: user.email
                }  
            }
        } catch (error) {
            throw new Error(error.message)
        }
    },

    async resetPassword({ email }, ctx) {
        try {
            let resetToken = jsonwebtoken.sign(
                { email: email }, 
                config.jwtSecret,
                { expiresIn: '1d' }
            )

            const user = await User.findOne({ where: { email }})
            if (!user) {
                throw new Error('No user with that email')
            }

            user.update({
                resetToken: resetToken
            })

            // Todo: use some service to send emails... 
            
            return {
                success: true,
                message: "Please check your email (todo) ..."
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

}