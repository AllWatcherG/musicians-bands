const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

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
        result = await Musician.findAll({raw: true})
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

    test('BandSong many to many', async() =>{
        // Create Bands and Songs associated with them
        const band1 = await Band.create({ name: 'The Beatles', genre: "Rock" });
        const band2 = await Band.create({ name: 'The Rolling Stones', genre: "Rock" });
        const song1 = await Song.create({ title: 'Yesterday', year: 1990});
        const song2 = await Song.create({ title: 'Paint It Black', year: 1990});
        const song3 = await Song.create({ title: 'Stairway to Heaven', year:1991 });
        const song4 = await Song.create({ title: 'Paranoid', year: 1991 });

        // Associate Bands with Songs through BandSong
        await band1.addSong(song1);
        await band1.addSong(song2);
        await band2.addSong(song2);

        //Assocuat Songs with Bands through Band Song
        await song3.addBand(band1);
        await song4.addBand(band2);
        await song4.addBand(band1)

        const associatedSongs1 = await band1.getSongs();
        const associatedSongs2 = await band2.getSongs();

        const associatedBands = await song4.getBands();

        expect(associatedSongs1.length).toBe(4);
        expect(associatedSongs2.length).toBe(2);
        expect(associatedBands.length).toBe(2)
    })

    test('Eager Loading', async() => {
        const band4 = await Band.create({ name: 'Bring Me The Horizon', genre: "Alt" });
        const musician4 = await Musician.create({ name: 'George Michael', instrument: 'guitar', BandId: band4.id });
        const musician5 = await Musician.create({ name: 'Yeat', instrument: 'gekker', BandId: band4.id });
        const song6 = await Song.create({ title: 'Paint It Black', year: 1990});
        const song7 = await Song.create({ title: 'Stairway to Heaven', year:1991 });
        const song8 = await Song.create({ title: 'Paranoid', year: 1991 });
        await band4.addSong(song6);
        await band4.addSong(song7);
        await band4.addSong(song8);

        const bandWithMusicians = await Band.findOne({
            where: { id: band4.id },
            include: [{model: Musician}, {model: Song}],
          });
        testBMLength = bandWithMusicians.Musicians.length
        testBSLength = bandWithMusicians.Songs.length
        expect(bandWithMusicians.id).toBe(band4.id);
        expect(bandWithMusicians.name).toBe(band4.name);
        expect(testBMLength).toBe(2)
        expect(testBSLength).toBe(3)
    })
})