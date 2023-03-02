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
        const testBand = await Band.create({ name: 'KISS', genre: 'Rock' });
        result = await Band.findAll({raw:true})
        expect(result.length).toBe(1);
    })

    test('can create a Musician', async () => {
        const testMusician = await Musician.create({ name: 'George Michael', instrument: 'guitar' });
        result = await Band.findAll({raw: true})
        expect(result.length).toBe(1);
    })

    test('Associations from muscian to band', async()=>{
        const testBand = await Band.create({ name: '070', genre: 'Rock' });
        const testMusician = await Musician.create({ name: 'George Michael', instrument: 'guitar', BandId: testBand.id });
        const testAssociation = await testMusician.getBand();
        expect(testAssociation.name).toEqual(testBand.name);
    })

    test('Associations from band to muscians', async() => {
        const testBand = await Band.create({ name: 'The Boys', genre: 'Rock' });
        const testMusician1 = await Musician.create({ name: 'George Michael', instrument: 'guitar', BandId: testBand.id });
        const testMusician2 = await Musician.create({ name: 'Led Zepplin', instrument: 'guitar', BandId: testBand.id });
        const testAssociation = await testBand.getMusicians();
        const test1= testAssociation.length

        expect(test1).toBe(2);
        // expect(testAssociation[1]).toEqual(testMusician2);

    })
})