import { createSchema, list } from '@keystone-next/keystone/schema';
import { checkbox, password, relationship, text, timestamp } from '@keystone-next/fields';
import { select } from '@keystone-next/fields';

export const lists = createSchema({
  Person: list({
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true }),
      password: password({ isRequired: true }),
    },
  }),
  Post: list({
    fields: {
      title: text({ isRequired: true }),
      status: select({
        dataType: "enum",
        options: [
          { label: "Draft", value: "draft" },
          { label: "Published", value: "published" },
        ],
      }),
      content: text(),
      publishDate: timestamp(),
      author: relationship({ ref: "Author.posts", many: false }),
    },
  }),
  Author: list({
    fields: {
      name: text({ isRequired: true }),
      email: text({ isRequired: true, isUnique: true }),
      posts: relationship({ ref: "Post.author", many: true }),
    },
  })
});