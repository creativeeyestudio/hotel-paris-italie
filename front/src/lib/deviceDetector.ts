import { DeviceType } from '@/types/DeviceType';
import { headers } from 'next/headers';

export async function getDeviceDetector(): Promise<DeviceType> {
  const deviceType = (await headers()).get('x-device-type') || 'desktop';

  return {
    mobile: deviceType === 'mobile',
    tablet: deviceType === 'tablet',
    desktop: deviceType === 'desktop',
  };
}
