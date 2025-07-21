import { DeviceType } from '@/types/DeviceType';
import { headers } from 'next/headers';

export function getDeviceDetector(): DeviceType {
  const deviceType = headers().get('x-device-type') || 'desktop';

  return {
    mobile: deviceType === 'mobile',
    tablet: deviceType === 'tablet',
    desktop: deviceType === 'desktop',
  };
}
