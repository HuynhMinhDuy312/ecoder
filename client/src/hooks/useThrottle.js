import { useEffect, useCallback, useRef } from 'react';

import _ from 'lodash';

function useThrottle(cb, delay) {
    const cbRef = useRef(cb);
    // use mutable ref to make useCallback/throttle not depend on `cb` dep
    useEffect(() => {
        cbRef.current = cb;
    });
    return useCallback(
        _.throttle((...args) => cbRef.current(...args), delay),
        [delay]
    );
}

export default useThrottle;
