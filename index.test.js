const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const testBand = await Band.create({ name: 'George', instrument: 'cowbell' });
        expect(testBand.name).toBe('George');
    })

    test('can create a Musician', async () => {
        const testMusician = await Musician.create({ name: 'George', genre: 'hyperpop' });
        expect(testMusician.name).toBe('George');
    })
})