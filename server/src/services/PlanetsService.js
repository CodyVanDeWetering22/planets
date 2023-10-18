import { dbContext } from "../db/DbContext.js"

class PlanetsService {
    async createPlanet(planetData) {
        const planet = await dbContext.Planets.create(planetData)
        await planet.populate('galaxy')
        return planet
    }


    async getPlanetsById(galaxyId) {
        const planets = await dbContext.Planets.find({ galaxyId: galaxyId }).populate('galaxy')
        return planets
    }
}

export const planetsService = new PlanetsService