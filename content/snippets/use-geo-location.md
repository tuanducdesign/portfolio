---
title: useGeoLocation
description: Get current user position with Geolocation API
icon: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg
tags:
  - react
  - javascript
  - typescript
  - geolocation
---

```ts
import { useEffect, useRef, useState } from 'react';

type GeoState =
  | {
      status: 'idle';
    }
  | {
      status: 'success';
      state: GeolocationPosition;
    }
  | {
      status: 'error';
      error: GeolocationPositionError;
    };

type UseGeoLocationOptions = {
  /**
   * Watch the user location
   * @default false
   */
  watch?: boolean;
} & PositionOptions;

export const useGeoLocation = ({
  watch = false,
  ...options
}: UseGeoLocationOptions) => {
  const [state, setState] = useState<GeoState>({ status: 'idle' });
  const watchId = useRef<number>();

  useEffect(() => {
    const onSuccess: PositionCallback = res => {
      setState(prev => ({
        ...prev,
        status: 'success',
        state: res,
        error: null,
      }));
    };
    const onError: PositionErrorCallback = err => {
      setState(prev => ({
        ...prev,
        status: 'error',
        error: err,
        state: null,
      }));
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    if (watch) {
      watchId.current = navigator.geolocation.watchPosition(
        onSuccess,
        onError,
        options,
      );
    }

    return () => {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [watch]);

  return state;
};
```

## References

- https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
