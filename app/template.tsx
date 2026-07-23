'use client';

import React from 'react';
import { CinematicRouteLoader } from '../components/CinematicRouteLoader';

export default function Template({ children }: { children: React.ReactNode }) {
  return <CinematicRouteLoader>{children}</CinematicRouteLoader>;
}
