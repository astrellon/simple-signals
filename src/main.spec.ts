import Signal from ".";

test('basic functionality', () =>
{
    const numberSignal = new Signal<number>();

    let timesCalled = 0;
    let triggeredNumber = 5;

    expect(numberSignal.length()).toBe(0);

    numberSignal.add((num) =>
    {
        expect(num).toBe(triggeredNumber);
        timesCalled++;
    });
    expect(numberSignal.length()).toBe(1);
    const removeListener = numberSignal.add((num) => { timesCalled++; } );
    expect(numberSignal.length()).toBe(2);

    expect(timesCalled).toBe(0);

    numberSignal.trigger(triggeredNumber);
    expect(timesCalled).toBe(2);

    triggeredNumber = 10;
    numberSignal.trigger(triggeredNumber);
    expect(timesCalled).toBe(4);

    removeListener();

    expect(numberSignal.length()).toBe(1);
    triggeredNumber = 15;
    numberSignal.trigger(triggeredNumber);
    expect(timesCalled).toBe(5);
});

test('cancelling listeners', () =>
{
    const stringSignal = new Signal<string>();

    let timesCalled = 0;

    stringSignal.add((value) => { timesCalled++; });
    const removeStopper = stringSignal.add((value) =>
    {
        timesCalled++;
        return value !== 'stop';
    });
    stringSignal.add((value) => { timesCalled++; });

    stringSignal.trigger('go');
    expect(timesCalled).toBe(3);
    stringSignal.trigger('stop');
    expect(timesCalled).toBe(5);
    stringSignal.trigger('go');
    expect(timesCalled).toBe(8);

    expect(stringSignal.length()).toBe(3);

    removeStopper();
    expect(stringSignal.length()).toBe(2);

    removeStopper();
    expect(stringSignal.length()).toBe(2);

    stringSignal.trigger('go');
    expect(timesCalled).toBe(10);
    stringSignal.trigger('stop');
    expect(timesCalled).toBe(12);
})