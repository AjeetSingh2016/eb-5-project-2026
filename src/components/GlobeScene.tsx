
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { feature } from "topojson-client";

import { COUNTRIES, ROUTES } from "@/data/worldDots";
import { sampleLandDots, type LandPoint } from "@/data/landDots";
import { FALLBACK_DOTS } from "@/data/globeDots";

/* ---------- Globe styling ---------- */
const GOLD = "#d4a853";
const LAND_DOT = "#a9c4e8";
const COMET = "#f0c966";
const SPIN_SPEED = 0.7;
const CAMERA_ALTITUDE = 2.9;
const START_VIEW = { lat: 22, lng: 79 };
const SPIN_DELAY_MS = 1500;

const GLOBE_SURFACE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAEElEQVR4nGPgt8oDIgYIBQASlgLd36YByAAAAABJRU5ErkJggg==";

/* ---------- Types ---------- */
type Arc = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: [string, string];
  stroke: number;
  dashLength: number;
  dashGap: number;
  dashInitialGap: number;
  dashTime: number;
};

type Ring = {
  lat: number;
  lng: number;
  color: string;
};

type Label = {
  lat: number;
  lng: number;
  text: string;
};

type LandGeometry = {
  type: string;
  arcs?: unknown;
  geometries?: LandGeometry[];
  coordinates?: unknown;
  properties?: Record<string, unknown>;
};

type LandTopology = {
  type: "Topology";
  objects: Record<string, LandGeometry>;
  arcs: number[][][];
  transform?: {
    scale: [number, number];
    translate: [number, number];
  };
};

/* ---------- Fallback land dots ---------- */
const FALLBACK_LAND: LandPoint[] = Array.from(
  { length: Math.floor(FALLBACK_DOTS.length / 2) },
  (_, i) => ({
    lng: FALLBACK_DOTS[2 * i],
    lat: FALLBACK_DOTS[2 * i + 1],
  })
);

/* ---------- Build animated routes ---------- */
function buildArcs(reduceMotion: boolean): Arc[] {
  return ROUTES.flatMap((route, i) => {
    const from = COUNTRIES[route.from];
    const to = COUNTRIES[route.to];

    const base: Arc = {
      startLat: from.lat,
      startLng: from.lon,
      endLat: to.lat,
      endLng: to.lon,
      color: [
        "rgba(240,201,102,0.35)",
        "rgba(240,201,102,0.35)",
      ],
      stroke: 0.14,
      dashLength: 1,
      dashGap: 0,
      dashInitialGap: 0,
      dashTime: 0,
    };

    const comet: Arc = {
      ...base,
      color: [COMET, COMET],
      stroke: 0.55,
      dashLength: 0.22,
      dashGap: 1.78,
      dashInitialGap: (i / Math.max(ROUTES.length, 1)) * 2,
      dashTime: reduceMotion ? 0 : 5200 + i * 450,
    };

    return [base, comet];
  });
}

/* ---------- Pulsing rings ---------- */
const rings: Ring[] = [
  ...Object.values(COUNTRIES)
    .filter((country) => country.kind === "origin")
    .map((country) => ({
      lat: country.lat,
      lng: country.lon,
      color: "169,196,232",
    })),

  ...ROUTES.map((route) => ({
    lat: COUNTRIES[route.to].lat,
    lng: COUNTRIES[route.to].lon,
    color: "212,168,83",
  })),
];

/* ---------- Country labels ---------- */
const labels: Label[] = Object.values(COUNTRIES)
  .filter((country) => country.name)
  .map((country) => ({
    lat: country.lat,
    lng: country.lon,
    text: country.name,
  }));

export default function GlobeScene({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const spinTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [landDots, setLandDots] = useState<LandPoint[]>(FALLBACK_LAND);

  const arcs = useMemo(() => buildArcs(reduceMotion), [reduceMotion]);

  /* Clear timer on unmount */
  useEffect(() => {
    return () => {
      if (spinTimer.current !== undefined) {
        clearTimeout(spinTimer.current);
      }
    };
  }, []);

  /* Measure globe container */
  useEffect(() => {
    const element = wrapRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;

      setSize({
        w: Math.round(entry.contentRect.width),
        h: Math.round(entry.contentRect.height),
      });
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /* Load land geometry without topojson-specification */
  useEffect(() => {
    let cancelled = false;

    async function loadLand() {
      try {
        const response = await fetch("/land-110m.json");

        if (!response.ok) {
          throw new Error(
            `/land-110m.json returned ${response.status}`
          );
        }

        const topology = (await response.json()) as LandTopology;

        if (cancelled) return;

        const landObject = topology.objects?.land;

        if (!landObject) {
          throw new Error(
            "The topology file does not contain a land object."
          );
        }

        const shapes = feature(
          topology as Parameters<typeof feature>[0],
          landObject as Parameters<typeof feature>[1]
        );

        const features =
          shapes.type === "FeatureCollection" && shapes.features
            ? shapes.features
            : [shapes];

        const dots = sampleLandDots(features);

        if (cancelled) return;

        if (dots.length > 200) {
          setLandDots(dots);
        } else {
          console.error(
            "Globe: land data loaded but produced too few dots.",
            dots.length
          );
        }
      } catch (error: unknown) {
        if (!cancelled) {
          console.error("Globe: could not load land data.", error);
        }
      }
    }

    void loadLand();

    return () => {
      cancelled = true;
    };
  }, []);

  /* Configure initial camera view and rotation */
  const onReady = () => {
    const globe = globeRef.current;
    if (!globe) return;

    const controls = globe.controls() as unknown as {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableZoom: boolean;
    };

    controls.autoRotate = false;
    controls.autoRotateSpeed = SPIN_SPEED;
    controls.enableZoom = false;

    globe.pointOfView(
      {
        ...START_VIEW,
        altitude: CAMERA_ALTITUDE,
      },
      0
    );

    if (spinTimer.current !== undefined) {
      clearTimeout(spinTimer.current);
    }

    if (!reduceMotion) {
      spinTimer.current = setTimeout(() => {
        controls.autoRotate = true;
      }, SPIN_DELAY_MS);
    }
  };

  return (
    <div
      ref={wrapRef}
      className="pointer-events-auto h-full w-full cursor-grab active:cursor-grabbing"
    >
      {size.w > 0 && size.h > 0 && (
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={GLOBE_SURFACE}
          showAtmosphere
          atmosphereColor={GOLD}
          atmosphereAltitude={0.16}
          /* Land dots */
          pointsData={landDots}
          pointLat={(d: object) => (d as LandPoint).lat}
          pointLng={(d: object) => (d as LandPoint).lng}
          pointColor={() => LAND_DOT}
          pointRadius={0.22}
          pointAltitude={0.006}
          pointResolution={5}
          pointsMerge
          /* Route arcs and travelling comets */
          arcsData={arcs}
          arcStartLat={(d: object) => (d as Arc).startLat}
          arcStartLng={(d: object) => (d as Arc).startLng}
          arcEndLat={(d: object) => (d as Arc).endLat}
          arcEndLng={(d: object) => (d as Arc).endLng}
          arcColor={(d: object) => (d as Arc).color}
          arcStroke={(d: object) => (d as Arc).stroke}
          arcDashLength={(d: object) => (d as Arc).dashLength}
          arcDashGap={(d: object) => (d as Arc).dashGap}
          arcDashInitialGap={(d: object) =>
            (d as Arc).dashInitialGap
          }
          arcDashAnimateTime={(d: object) => (d as Arc).dashTime}
          arcAltitudeAutoScale={0.4}
          /* Pulsing rings */
          ringsData={reduceMotion ? [] : rings}
          ringLat={(d: object) => (d as Ring).lat}
          ringLng={(d: object) => (d as Ring).lng}
          ringColor={(d: object) => (t: number) =>
            `rgba(${(d as Ring).color},${1 - t})`
          }
          ringMaxRadius={3.2}
          ringPropagationSpeed={1.4}
          ringRepeatPeriod={1900}
          /* Country labels */
          labelsData={labels}
          labelLat={(d: object) => (d as Label).lat}
          labelLng={(d: object) => (d as Label).lng}
          labelText={(d: object) => (d as Label).text}
          labelColor={() => "#ffffff"}
          labelSize={0.9}
          labelDotRadius={0.35}
          labelResolution={2}
          labelAltitude={0.012}
          onGlobeReady={onReady}
        />
      )}
    </div>
  );
}
