export type AppRouteValues = (typeof App)[keyof typeof App]
export const App = {
	INDEX: '/',
} as const

export type HomeRouteValues = (typeof Home)[keyof typeof Home]
export const Home = {
	INDEX: '/app',
} as const

export type AccountRouteValues = (typeof Account)[keyof typeof Account]
export const Account = {
	INDEX: `${Home.INDEX}/accounts`,
} as const

export type CatchUpFridayRouteValues = (typeof CatchUpFriday)[keyof typeof CatchUpFriday]
export const CatchUpFriday = {
	INDEX: `${Home.INDEX}/catchup-fridays`,
} as const

export type GuildRouteValues = (typeof Guild)[keyof typeof Guild]
export const Guild = {
	INDEX: `${Home.INDEX}/guilds`,
	JOINED: `${Home.INDEX}/joined-guilds`,
} as const

export type LearningModuleRouteValues =
	(typeof LearningModule)[keyof typeof LearningModule]
export const LearningModule = {
	INDEX: `${Home.INDEX}/learning-modules`,
} as const

export type LessonMaterialRouteValues =
	(typeof LessonMaterial)[keyof typeof LessonMaterial]
export const LessonMaterial = {
	INDEX: `${Home.INDEX}/lesson-materials`,
} as const

export type ProjectRouteValues = (typeof Project)[keyof typeof Project]
export const Project = {
	INDEX: `${Home.INDEX}/projects`,
	JOINED: `${Home.INDEX}/joined-projects`,
} as const

export type TaskRouteValues = (typeof Task)[keyof typeof Task]
export const Task = {
	INDEX: `${Home.INDEX}/tasks`,
} as const

export type RouteGroupValues = (typeof RouteGroup)[keyof typeof RouteGroup]
export const RouteGroup = {
	ADMIN: 'admin',
	MENU: 'menu',
	MY_TASKS: 'myTasks',
	LESSON_ACTIVITIES: 'lessonActivities',
} as const
