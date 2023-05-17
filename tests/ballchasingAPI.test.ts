import { fetchGroups, searchGroupId } from "../src/ballchasingAPI";
import { mockResponse } from "./testHelpers";



describe("Ballchasing Api", () => {

    /*
    These tests depend on mockResponse from testHelpers.ts

    Please see the mockresponse for more details on existing mocked groups
    */

    it("Fetches the groups from ballchasing API", async () => {

        global.fetch = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve(mockResponse)
        })


        const response = await fetchGroups()

        expect(response).toBeDefined()
        expect(response[0].id).toBe("12345Test")

    })


    it("Parses the group fetch response into: [possibleMatch, [other, results]]", async()=>{

        global.fetch = jest.fn().mockImplementationOnce(() => {
            return Promise.resolve(mockResponse)
        })


        const response = await fetchGroups()

        const [matchId, allResults] = searchGroupId('Challengers',response)

        expect(matchId).toBe('12345Test')
        expect(allResults[0]).toBe('Challengers')
        expect(allResults[1]).toBe('league2')


    })


})



