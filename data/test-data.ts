export default class TestData {
    /**
     * Test Data Combinations
     * 1.   DropDwon
     *        1 Tokyo CURA Healthcare Center
     *        2 Hongkong CURA Healthcare Center
     *        3 Seoul CURA Healthcare Center
     * 2.   Health care program
     *       1   Medicare
     *       2   Medicaid
     *       3   None
     * 
     * 3.   Different date 
     *      1  10/10/2024
     *      2  07/11/2012
     *      3  04/12/2010
     * 
     * 
     */
    static makeAppointmentTestData() {
        return [
            { testid: "TC001", facility: "Tokyo CURA Healthcare Center", hcp: "Medicare", visiteDate: "10/10/2024" },
            { testid: "TC002", facility: "Hongkong CURA Healthcare Center", hcp: "Medicaid", visiteDate: "07/11/2012" },
            { testid: "TC003", facility: "Hongkong CURA Healthcare Center", hcp: "None", visiteDate: "04/12/2010" }

        ]
    }

    static apiPostRequestData() {
        return [{

            title: 'vinod',
            body: 'prakash',
            userId: 1,
        },
        {

            title: 'Vishal',
            body: 'prakash',
            userId: 1,
        },

        {

            title: 'rav',
            body: 'prakash',
            userId: 1,
        },
        {
            userId: 1,
            title: 'sunt aut facere'
        }
        ]
    }
}