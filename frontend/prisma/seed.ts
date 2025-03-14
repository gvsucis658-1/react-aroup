import { PrismaClient, Location, JobType } from '@prisma/client'

const prisma = new PrismaClient()

const jobPostData = [
  {
    title: 'Senior Software Engineer',
    team: 'Engineering',
    location: Location.REMOTE,
    type: JobType.FULL_TIME,
    deadline: new Date('2024-05-30'),
  },
  {
    title: 'Product Manager',
    team: 'Product',
    location: Location.HYBRID,
    type: JobType.FULL_TIME,
    deadline: new Date('2024-05-15'),
  },
  {
    title: 'UX Design Intern',
    team: 'Design',
    location: Location.ONSITE,
    type: JobType.INTERNSHIP,
    deadline: new Date('2024-06-01'),
  },
  {
    title: 'DevOps Engineer',
    team: 'Infrastructure',
    location: Location.REMOTE,
    type: JobType.CONTRACT,
    deadline: new Date('2024-05-20'),
  },
  {
    title: 'Marketing Specialist',
    team: 'Marketing',
    location: Location.HYBRID,
    type: JobType.PART_TIME,
    deadline: new Date('2024-05-25'),
  },
  {
    title: 'Frontend Developer',
    team: 'Engineering',
    location: Location.ONSITE,
    type: JobType.FULL_TIME,
    deadline: new Date('2024-06-15'),
  },
  {
    title: 'Data Scientist',
    team: 'Analytics',
    location: Location.REMOTE,
    type: JobType.FULL_TIME,
    deadline: new Date('2024-05-28'),
  },
  {
    title: 'Technical Writer',
    team: 'Documentation',
    location: Location.HYBRID,
    type: JobType.CONTRACT,
    deadline: new Date('2024-06-10'),
  },
  {
    title: 'QA Engineer',
    team: 'Quality Assurance',
    location: Location.ONSITE,
    type: JobType.FULL_TIME,
    deadline: new Date('2024-05-22'),
  },
  {
    title: 'HR Coordinator',
    team: 'Human Resources',
    location: Location.HYBRID,
    type: JobType.PART_TIME,
    deadline: new Date('2024-06-05'),
  }
]

export async function main() {
  console.log('Start seeding ...')
  for (const jobPost of jobPostData) {
    const job = await prisma.jobPost.create({
      data: jobPost,
    })
    console.log(`Created job post with id: ${job.id}`)
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })