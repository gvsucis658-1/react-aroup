## Job Board

An application to Create, Read, Update and Delete Job applications.

Live URL: [Azure Container App Link](https://jobs-nextjs-app.bluehill-d8a95635.westus2.azurecontainerapps.io/)


Used Technologies:
- Next.js
- Prisma
- Azure
- PostGreSQL
- TypeScript


For this project, I have tried out React Server Components using app router in NextJS. This is my first time using a server action to fetch and modify the data. 

Interesting thing about server components is, the React routes get rendered on the server, and for this reason we don't need to have an API in between. For the data fetching, I have used Prisma ORM.

As we are using the lower tier of the database and container apps, the loading might be a little slow, please be patient. 🙏

**Routes:**

| Route | Description |
| --- | --- |
| /| Home page |
| /jobPost | List of all jobs |
| /jobPost/:id | Details of a specific job with Update and Delete options |
| /jobPost/new | Form to create a new job |
| /jobPost/:id/update | Form to edit a specific job |

The actions are located in `app/jobPost/actions.ts`. You can check out the server components following the routes on the above table. For example: `jobPost/:id/update` page will be on `jobPost/[id]/update.tsx`.

For running locally:

- Add a .env file with `DATABASE_URL=xyz` and **email me** for the value `xyz`
- Run `npm install`
- Run `npm run dev`
