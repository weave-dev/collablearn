export type AppRouteValues = (typeof App)[keyof typeof App]
export const App = {
	INDEX: '/',
} as const

export type HomeRouteValues = (typeof Home)[keyof typeof Home]
export const Home = {
	INDEX: '/app',
} as const

export type GuildRouteValues = (typeof Guild)[keyof typeof Guild]
export const Guild = {
	INDEX: `${Home.INDEX}/guilds`,
} as const
