import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@spc-28/pragyaan-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { calculateMinuteRead } from "../utils";
import { getTags } from "../utils/gemini";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        key: string;
        GEMINI_API_KEY: string;
    },
    Variables: {
        userId: string;
    }
}>();

const tagInstruction =  "You will be provided with a prompt which is in the form of innerHTML of an article you just have to tell the 3 tags which describe the given article. Just provide with the 3 tags. The tags should be from this Technology, AI, Machine, Cybersecurity, Web, Blockchain, Gadgets, Software, Programming, Mobile, Cloud, IoT, Reviews, Coding, Open, Data, SaaS, Startups, DevOps, Football, Basketball, Cricket, Tennis, Olympics, Esports, Fitness, Gym, Running, Extreme, Racing, Bodybuilding, Yoga, Swimming, MMA, Sports, Fashion, Travel, Health, Wellness, Self-care, Food, Recipes, Home, Minimalism, Skincare, Relationships, Mindfulness, Productivity, Parenting, DIY, Mental, Investing, Stock, Finance, Crypto, Business, Marketing, Entrepreneurship, Real, Economy, Passive, Hustles, Career, Freelancing, Remote, Leadership, Management, Psychology, Science, Space, Environment, Sustainability, Climate, Nature, History, Politics, News, Culture, Books, Movies, TV, Music, Photography, Art, Gaming, Anime, Reviews, Education, Learning, College, Study, Writing, Blogging, SEO, Social, Influencers, Motivation, Inspiration, Quotes, Philosophy, Religion, Ethics, Spirituality, Meditation, Mindset, Happiness, Guides, Adventure, Backpacking, Luxury, Budget, Road, Aviation, Cars, Motorcycles, Improvement, Gardening, Pets, Wildlife, Cooking, Baking, Nutrition, Weight, Vegan, Keto, Hacks, Time, Balance, Ethics, Trends, Exploration, Futurism, Robotics, Augmented, Virtual";
const descriptionInstruction = "You will be provided with a prompt which is in the form of innerHTML of an article, you just have to give description about the artcile in a very strict range of 50 to 55 words."


blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.key);
        if (user) {
            c.set("userId", user.id as string);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch (e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct1"
        })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const tags          =        await (getTags(body.content, tagInstruction, c.env.GEMINI_API_KEY));
    const description   =        await (getTags(body.content, descriptionInstruction, c.env.GEMINI_API_KEY));
    const minuteRead    =        calculateMinuteRead(body.content);

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId,
                minuteRead,
                thumbnail: "hjkgh",
                description: String(description),
                tags: String(tags),
                published: true,
                upVotes: 0
            }
        })
        return c.json({
            id: blog.id
        })
    }
    catch(e) {
        return c.json({
            message: e
        })
    }

})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        include: {
            author: true,
        }
    });

    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            include: {
                author: true,
            }
        })
        return c.json({
            blog
        })
    }
    catch (e) {
        c.status(411);
        return c.json({
            message: "Error while Fetching blog post"
        })
    }
})

blogRouter.put('/addLike', async (c) => {

    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: body.id,
            },
            data: {
                upVotes: {
                    increment: 1,
                },
            },
        })

        return c.json({
            updatedPost
        })
    }
    catch (e) {
        c.status(411);
        return c.json({
            message: "Error while Fetching blog post"
        })
    }

})

blogRouter.put('/addBookmark', async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: body.id,
            },
            data: {
                bookMarks: {
                    connect: {
                        id: c.get('userId')
                    }
                }
            },
            include: {
                bookMarks: true
            }
        })

        return c.json({
            updatedPost
        })
    }
    catch (e) {
        c.status(411);
        return c.json({
            message: "Error while Fetching blog post"
        })
    }
})


blogRouter.put('/:id', async (c) => {
    const body = await c.req.json();
    const id = c.req.param('id');
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct2"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where: {
            id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: blog.id
    })
})



