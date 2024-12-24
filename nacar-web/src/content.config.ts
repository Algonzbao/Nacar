import { defineCollection, z } from "astro:content";

const team = defineCollection({
    schema: ({ image }) => z.object({
        name: z.string(),
        position: z.string(),
        image: image(),
        linkedin: z.string().url(),
    })
})

const events = defineCollection({
    schema: ({ image }) => z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        img: image(),
        gallery: z.array(image())
    })
})

const shields = defineCollection({
    schema: ({ image }) => z.object({
        id: z.number(),
        name: z.string(),
        image: image(),
    })
})

export const collections = { team, events, shields }