

let currentListener: (() => void) | null = null;

function signal<T>(value: T) {
    let _value = value;
    const subscribers = new Set<(value: T) => void>();

    function func() {
        if (currentListener) {
            subscribers.add(currentListener);
        }
        return _value;
    }

    func.set = function (newValue: T) {
        if (_value !== newValue) {
            _value = newValue;
            subscribers.forEach(subscriber => subscriber(_value));
        }
    }

    return func;
}

function computed<T>(computeFn: () => T) {
    let _value: T;
    const subscribers = new Set<(value: T) => void>();

    const recompute = () => {
        _value = computeFn();
        subscribers.forEach(subscriber => subscriber(_value));
    }

    const onDependencyChange = () => {
        recompute();
    }

    currentListener = onDependencyChange;
    _value = computeFn();
    currentListener = null;

    function func() {
        if (currentListener) {
            subscribers.add(currentListener);
        }
        return _value;
    }

    return func;
}

function effect(effectFn: () => void) {
    currentListener = effectFn;
    effectFn();
    currentListener = null;
}

const s = signal(1);

const double = computed(() => {
    const val = s();
    return val * 2;
});
effect(() => {
    console.log("Signal value:", s());
})

effect(() => {
    console.log("Computed double value:", double());
});

s.set(2); // Should trigger the effect and log "Signal value: 2"
s.set(3); // Should trigger the effect and log "Signal value: 3"

export {}
