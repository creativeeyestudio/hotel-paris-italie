'use client';

import { useSetDeviceTypeCookie } from '@/hooks/useSetDeviceTypeCookie';

export default function DeviceDetectorClient() {
  useSetDeviceTypeCookie();
  return null;
}
