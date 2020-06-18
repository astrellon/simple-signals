// Listener for when a signal is dispatched.
// Can return false to stop the next signal from triggering.
export type SignalListener<T> = (value: T) => void | boolean;

// A function used to remove a listener from the signal.
export type RemoveListener = () => void;

/**
 * A signal represents a single kind of event.
 * Signals also have a type associated with them.
 *
 * Currently TypeScript does not support variadic generics which would make it
 * easier to allow multiple argument listeners and triggers.
 * This should be coming in TypeScript 4.
 *
 * Signals can be listened for and triggered.
 */
export default class Signal<T>
{
    private readonly listeners: SignalListener<T>[] = [];

    /**
     * Returns the number of listeners.
     */
    public length = () => this.listeners.length;

    /**
     * Adds a new listener to this signal, this will be called when the `trigger` method
     * is called.
     *
     * @param listener A listener function.
     * @returns A function to remove the listener from the signal.
     */
    public add(listener: SignalListener<T>) : RemoveListener
    {
        this.listeners.push(listener);

        return () =>
        {
            const index = this.listeners.indexOf(listener)
            if (index >= 0)
            {
                this.listeners.splice(index, 1);
            }
        }
    }

    /**
     * Triggers all the listeners with the value given.
     *
     * @param value The value to pass to all the listeners
     */
    public trigger(value: T)
    {
        for (const listener of this.listeners)
        {
            if (listener(value) === false)
            {
                break;
            }
        }
    }
}