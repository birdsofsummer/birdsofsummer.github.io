import { say, } from "/js/fp/q.js"
import {
    loading,
    router,
    store,
} from "/js/api/api.js"
import {
    echo,
    listen,
    sendMessage,
    showNotification,
    showNotification1,
    urlBase64ToUint8Array,
    ask_perm,
    get_vapidPublicKey,
    notify,
    notify1,
    notify_m,
    receiveMessage,
    register_sub,
    reg_sw,
    reg_sw1,
    send_push,
    bwork,
    swork,
    test_chan,
    test_work,
    work,
} from '/js/msg/index.js'

const {
//		combineLatest,
//		concat,
//		merge,
//		onErrorResumeNext,
//		race,
//		zip
		ArgumentOutOfRangeError,
		AsyncSubject,
		BehaviorSubject,
		ConnectableObservable,
		EMPTY,
		EmptyError,
		GroupedObservable,
		NEVER,
	//	Notification,
		ObjectUnsubscribedError,
		Observable,
		ReplaySubject,
		Scheduler,
		Subject,
		Subscriber,
		Subscription,
		TimeoutError,
		UnsubscriptionError,
		VirtualAction,
		VirtualTimeScheduler,
		ajax,
		animationFrameScheduler,
		asapScheduler,
		asyncScheduler,
		bindCallback,
		bindNodeCallback,
//		config,
		defer,
		empty,
		forkJoin,
		from,
		fromEvent,
		fromEventPattern,
		generate,
		identity,
		iif,
		interval,
		isObservable,
		never,
		noop,
		observable,
		of,
		operators,
		pairs,
		pipe,
		queueScheduler,
		range,
		testing,
		throwError,
		timer,
		using,
		webSocket
     } = rxjs
const {
        audit,
        auditTime,
        buffer,
        bufferCount,
        bufferTime,
        bufferToggle,
        bufferWhen,
        catchError,
        combineAll,
        combineLatest,
        concat,
        concatAll,
        concatMap,
        concatMapTo,
        count,
        debounce,
        debounceTime,
        defaultIfEmpty,
        delay,
        delayWhen,
        dematerialize,
        distinct,
        distinctUntilChanged,
        distinctUntilKeyChanged,
        elementAt,
        endWith,
        every,
        exhaust,
        exhaustMap,
        expand,
        filter,
        finalize,
        find,
        findIndex,
        first,
        flatMap,
        groupBy,
        ignoreElements,
        isEmpty,
        last,
        map,
        mapTo,
        materialize,
        max,
        merge,
        mergeAll,
        mergeMap,
        mergeMapTo,
        mergeScan,
        min,
        multicast,
        observeOn,
        onErrorResumeNext,
        pairwise,
        partition,
        pluck,
        publish,
        publishBehavior,
        publishLast,
        publishReplay,
        race,
        reduce,
        refCount,
        repeat,
        repeatWhen,
        retry,
        retryWhen,
        sample,
        sampleTime,
        scan,
        sequenceEqual,
        share,
        shareReplay,
        single,
        skip,
        skipLast,
        skipUntil,
        skipWhile,
        startWith,
        subscribeOn,
        switchAll,
        switchMap,
        switchMapTo,
        take,
        takeLast,
        takeUntil,
        takeWhile,
        tap,
        throttle,
        throttleTime,
        throwIfEmpty,
        timeInterval,
        timeout,
        timeoutWith,
        timestamp,
        toArray,
    //    window,
        windowCount,
        windowTime,
        windowToggle,
        windowWhen,
        withLatestFrom,
        zip,
        zipAll
}=operators


const init=async ()=>{
    window.addEventListener('load', ()=>Notification.requestPermission(say('perm')))
    window.addEventListener("message",notify_m, false);
    await reg_sw('/sw.js')
    loading("stop")
}

init()

