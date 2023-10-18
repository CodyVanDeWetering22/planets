import { dbContext } from "../db/DbContext.js"

class GalaxyService {

    async createGalaxy(galaxyData) {
        const galaxy = await dbContext.Galaxy.create(galaxyData)
        return galaxy
    }
    async getGalaxy() {
        const galaxy = await dbContext.Galaxy.find()
        return galaxy
    }
}

export const galaxyService = new GalaxyService()