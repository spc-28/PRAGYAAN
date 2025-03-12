import { PrismaClient } from '@prisma/client/edge';
import { Hono } from 'hono';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { signinInput, signupInput } from '@spc-28/pragyaan-common';
import { comparePassword, hashPassword } from '../utils';

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        key: string
    }
}>();


userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const pass = await hashPassword(body.password);

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: pass,
                firstName: body.firstName,
                lastName: body.lastName
            }
        })
        const jwt = await sign({
            id: user.id
        }, c.env.key)
        return c.text(jwt)
    }
    catch (e) {
        console.log(e);
        c.status(411);
        return c.text('Invalid')
    }
})


userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })
        if (!user) {
            c.status(403);
            return c.json({
                message: "Incorrect credentials"
            })
        }
        const res = await comparePassword(body.password, user.password)
        if (!res) {
            c.status(403);
            return c.json({
                message: "Unauthorized Access"
            })
        }
        const jwt = await sign({
            id: user.id
        }, c.env.key);
        return c.text(jwt);
    }
    catch (e) {
        console.log(e);
        c.status(411);
        return c.text('Invalid');
    }
})

userRouter.get("/", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.key);

        if (user) {
            const res = await prisma.user.findUnique({
                where: {
                    id: user.id as string
                },
                include: {
                    posts: true,
                    bookMarks: {
                        include: {
                            author: true
                        }
                    }
                }
            })

            c.status(200);
            return c.json(res);
        }
        else {
            throw new Error("Unauthorized")
        }
    }
    catch (e) {
        c.status(404);
        return c.text('Invalid');
    }
})

userRouter.put('/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.key);

        if (user) {
            const body = await c.req.json();
            const res = await prisma.user.update({
                where: {
                    id: user.id as string
                },
                data: {
                    profile: body.profile
                }
            })

            c.status(200);
            return c.json(res);
        }
        else {
            throw new Error("Unauthorized")
        }
    }
    catch (e) {
        c.status(404);
        return c.text('Invalid');
    }

})