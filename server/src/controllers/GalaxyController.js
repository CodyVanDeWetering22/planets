import { Auth0Provider } from "@bcwdev/auth0provider";
import { galaxyService } from "../services/GalaxyService.js";
import BaseController from "../utils/BaseController.js";
import { planetsService } from "../services/PlanetsService.js";

export class GalaxyController extends BaseController {
    constructor() {
        super('api/galaxy')
        this.router
            .get('', this.getGalaxy)
            .get('/:galaxyId/planets', this.getPlanetsById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createGalaxy)
    }
    async getGalaxy(request, response, next) {
        try {
            const galaxy = await galaxyService.getGalaxy()
            return response.send(galaxy)
        } catch (error) {
            next(error)
        }
    }

    async createGalaxy(request, response, next) {
        try {
            const galaxyData = request.body
            const userInfo = request.userInfo
            galaxyData.creatorId = userInfo.id
            const galaxy = await galaxyService.createGalaxy(galaxyData)
            response.send(galaxy)
        } catch (error) {
            next(error)
        }
    }


    async getPlanetsById(request, response, next) {
        try {
            const galaxyId = request.params.galaxyId
            const planets = await planetsService.getPlanetsById(galaxyId)
            return response.send(planets)
        } catch (error) {
            next(error)
        }
    }

}