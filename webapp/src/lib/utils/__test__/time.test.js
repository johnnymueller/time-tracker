import * as time from '../time';

describe('#getDuration', () => {
    const scenarios = [
        { input: 10, expected: '00:00:10' },
        { input: 1800, expected: '00:30:00' },
        // { input: 86401, expected: '24:00:01' },
    ];

    scenarios.forEach(({ input, expected }) => {
        describe(`when the input is ${input} secs`, () => {
            it(`should return "${expected}"`, () => {
                expect(time.getDuration(input)).toEqual(expected);
            });
        });
    });

    describe('when the input is greater than a day', () => {
        it('should throw an exception', () => {
            try {
                time.getDuration(86401)
            } catch(error) {
                expect(error.message).toEqual('invalid input');
            }
        });
    });
});