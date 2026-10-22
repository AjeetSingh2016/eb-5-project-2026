
"use client";

import { useEffect, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { feature } from "topojson-client";

import { COUNTRIES, ROUTES } from "@/data/worldDots";
import { sampleLandDots, type LandPoint } from "@/data/landDots";
import { FALLBACK_DOTS } from "@/data/globeDots";

/* ---------- Appearance ---------- */

const NAVY = "#041e3f";
const GOLD = "#d4a853";
const LAND_DOT = "#7c92b4";

const SPIN_SPEED = 0.7;
const CAMERA_ALTITUDE = 2.9;
const START_VIEW = { lat: 22, lng: 79 };
const SPIN_DELAY_MS = 1500;
const FIRST_TAKEOFF_S = 2;

const GLOBE_SURFACE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAIAAAD91JpzAAAAEElEQVR4nGO4+eQTEDFAKABKzgq9DF2I0AAAAABJRU5ErkJggg==";

/* ---------- Fallback land dots ---------- */

const FALLBACK_LAND: LandPoint[] = Array.from(
  { length: Math.floor(FALLBACK_DOTS.length / 2) },
  (_, i) => ({
    lng: FALLBACK_DOTS[2 * i],
    lat: FALLBACK_DOTS[2 * i + 1],
  })
);

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

/* ---------- Country markers and labels ---------- */

const rings: Ring[] = [
  ...Object.values(COUNTRIES)
    .filter((country) => country.kind === "origin")
    .map((country) => ({
      lat: country.lat,
      lng: country.lon,
      color: "4,30,63",
    })),

  ...ROUTES.map((route) => ({
    lat: COUNTRIES[route.to].lat,
    lng: COUNTRIES[route.to].lon,
    color: "212,168,83",
  })),
];

const labels: Label[] = Object.values(COUNTRIES)
  .filter((country) => country.name)
  .map((country) => ({
    lat: country.lat,
    lng: country.lon,
    text: country.name,
  }));

/* ---------- Flight calculations ---------- */

const D2R = Math.PI / 180;

type Vec3 = [number, number, number];

const toVec = (lon: number, lat: number): Vec3 => [
  Math.cos(lat * D2R) * Math.sin(lon * D2R),
  Math.sin(lat * D2R),
  Math.cos(lat * D2R) * Math.cos(lon * D2R),
];

const flights = ROUTES.map((route, index) => {
  const A = toVec(
    COUNTRIES[route.from].lon,
    COUNTRIES[route.from].lat
  );

  const B = toVec(
    COUNTRIES[route.to].lon,
    COUNTRIES[route.to].lat
  );

  const dot = Math.min(
    1,
    Math.max(
      -1,
      A[0] * B[0] + A[1] * B[1] + A[2] * B[2]
    )
  );

  const omega = Math.acos(dot);

  return {
    key: `${route.from}-${route.to}`,
    A,
    B,
    omega,
    lift: 0.06 + 0.12 * (omega / Math.PI),
    duration: 6 + omega * 2.6,
    delay: index * 1.1,
    repeatDelay: 1.4 + (index % 3) * 0.9,
  };
});

function flightPoint(
  flight: (typeof flights)[number],
  t: number
): Vec3 {
  const s = Math.sin(flight.omega) || 1;

  const w1 = Math.sin((1 - t) * flight.omega) / s;
  const w2 = Math.sin(t * flight.omega) / s;

  const radius =
    1 + flight.lift * Math.sin(Math.PI * t);

  return [
    (w1 * flight.A[0] + w2 * flight.B[0]) * radius,
    (w1 * flight.A[1] + w2 * flight.B[1]) * radius,
    (w1 * flight.A[2] + w2 * flight.B[2]) * radius,
  ];
}

const easeInOut = (p: number) =>
  p < 0.5
    ? 2 * p * p
    : 1 - Math.pow(-2 * p + 2, 2) / 2;

/* ---------- Plane icon ---------- */

const PLANE_PATH =
  "M1 9 8 7 14 1 16 2 14 8 22 12 22 14 13 13 9 21 7 21 8 13 1 13Z";

/* ---------- Camera types ---------- */

type CameraLike = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  projectionMatrix: {
    elements: number[];
  };
  matrixWorldInverse: {
    elements: number[];
  };
};

type LandTopology = {
  type: "Topology";
  objects: {
    land: unknown;
  };
  arcs: unknown[];
  transform?: {
    scale: [number, number];
    translate: [number, number];
  };
};

type GlobeControls = {
  autoRotate: boolean;
  autoRotateSpeed: number;
  enableZoom: boolean;
};

export default function GlobeScene({
  reduceMotion,
}: {
  reduceMotion: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);

  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const spinTimer = useRef<number | undefined>(undefined);

  const [size, setSize] = useState({
    w: 0,
    h: 0,
  });

  const [landDots, setLandDots] =
    useState<LandPoint[]>(FALLBACK_LAND);

  /* ---------- Clear the delayed spin timer ---------- */

  useEffect(() => {
    return () => {
      if (spinTimer.current !== undefined) {
        window.clearTimeout(spinTimer.current);
      }
    };
  }, []);

  /* ---------- Measure the globe container ---------- */

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

  /* ---------- Load real land geometry ---------- */

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

        // Explicitly type the downloaded JSON instead of leaving
        // it as unknown.
        const topology =
          (await response.json()) as LandTopology;

        if (cancelled) return;

        if (
          !topology ||
          topology.type !== "Topology" ||
          !topology.objects ||
          !("land" in topology.objects)
        ) {
          throw new Error("Invalid land TopoJSON structure.");
        }

        /*
         * topojson-client's overloaded TypeScript definitions
         * can infer the input as unknown in some configurations.
         * The JSON is structurally validated above, so isolate
         * the compatibility cast to this conversion call.
         */
        const shapes = feature(
          topology as never,
          topology.objects.land as never
        ) as {
          type: string;
          features?: Parameters<typeof sampleLandDots>[0];
        };

        const features =
          shapes.type === "FeatureCollection" &&
          shapes.features
            ? shapes.features
            : ([shapes] as unknown as Parameters<
                typeof sampleLandDots
              >[0]);

        const dots = sampleLandDots(features);

        if (cancelled) return;

        if (dots.length > 200) {
          setLandDots(dots);
        } else {
          console.error(
            "Globe: land data produced too few dots.",
            dots.length
          );
        }
      } catch (error: unknown) {
        if (!cancelled) {
          console.error(
            "Globe: could not load land data. Using fallback dots.",
            error
          );
        }
      }
    }

    void loadLand();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------- Animated flight paths and planes ---------- */

  useEffect(() => {
    const canvas = overlayRef.current;
    const ctx = canvas?.getContext("2d");
    const { w, h } = size;

    if (!canvas || !ctx || !w || !h) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const planePath = new Path2D(PLANE_PATH);
    const startTime = performance.now();

    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);

      ctx.clearRect(0, 0, w, h);

      const globe = globeRef.current;

      if (!globe) return;

      const cam = globe.camera() as unknown as CameraLike;

      const center = globe.getCoords(0, 0, 0);

      const radius = Math.hypot(
        center.x,
        center.y,
        center.z
      );

      const view = cam.matrixWorldInverse.elements;
      const projection = cam.projectionMatrix.elements;

      /* Project a 3D point onto the canvas. */

      const place = (v: Vec3) => {
        const r = Math.hypot(v[0], v[1], v[2]);

        const latitude = Math.asin(v[1] / r) / D2R;
        const longitude = Math.atan2(v[0], v[2]) / D2R;

        const point = globe.getCoords(
          latitude,
          longitude,
          r - 1
        );

        const vx =
          view[0] * point.x +
          view[4] * point.y +
          view[8] * point.z +
          view[12];

        const vy =
          view[1] * point.x +
          view[5] * point.y +
          view[9] * point.z +
          view[13];

        const vz =
          view[2] * point.x +
          view[6] * point.y +
          view[10] * point.z +
          view[14];

        const cx =
          projection[0] * vx +
          projection[4] * vy +
          projection[8] * vz +
          projection[12];

        const cy =
          projection[1] * vx +
          projection[5] * vy +
          projection[9] * vz +
          projection[13];

        const cw =
          projection[3] * vx +
          projection[7] * vy +
          projection[11] * vz +
          projection[15] || 1;

        return {
          x: ((cx / cw + 1) / 2) * w,
          y: ((1 - cy / cw) / 2) * h,

          near:
            point.x * cam.position.x +
              point.y * cam.position.y +
              point.z * cam.position.z >
            radius * radius,
        };
      };

      /* Draw only the visible sections of a route. */

      const strokeRoute = (
        flight: (typeof flights)[number],
        from: number,
        to: number,
        steps: number
      ) => {
        ctx.beginPath();

        let penDown = false;

        for (let k = 0; k <= steps; k++) {
          const t = from + ((to - from) * k) / steps;
          const screenPoint = place(flightPoint(flight, t));

          if (screenPoint.near) {
            if (penDown) {
              ctx.lineTo(screenPoint.x, screenPoint.y);
            } else {
              ctx.moveTo(screenPoint.x, screenPoint.y);
            }

            penDown = true;
          } else {
            penDown = false;
          }
        }

        ctx.stroke();
      };

      const seconds =
        (now - startTime) / 1000 - FIRST_TAKEOFF_S;

      for (const flight of flights) {
        /* Faint route line. */

        ctx.strokeStyle = "rgba(4,30,63,0.28)";
        ctx.lineWidth = 1.3;
        ctx.lineCap = "round";

        strokeRoute(flight, 0, 1, 56);

        /* Calculate the plane's progress. */

        let progress = 0.5;

        if (!reduceMotion) {
          const local = seconds - flight.delay;

          if (local < 0) continue;

          const cycle =
            flight.duration + flight.repeatDelay;

          const cycleProgress = local % cycle;

          if (cycleProgress > flight.duration) continue;

          progress = cycleProgress / flight.duration;
        }

        const easedProgress = easeInOut(progress);

        const edge = Math.max(
          0,
          Math.min(
            1,
            progress / 0.1,
            (1 - progress) / 0.1
          )
        );

        /* Gold trail behind the plane. */

        ctx.strokeStyle = `rgba(212,168,83,${0.95 * edge})`;
        ctx.lineWidth = 3;

        strokeRoute(
          flight,
          Math.max(0, easedProgress - 0.12),
          easedProgress,
          14
        );

        /* Plane position and direction. */

        const here = place(
          flightPoint(flight, easedProgress)
        );

        if (!here.near) continue;

        const ahead = place(
          flightPoint(
            flight,
            Math.min(1, easedProgress + 0.012)
          )
        );

        const angle = Math.atan2(
          ahead.y - here.y,
          ahead.x - here.x
        );

        ctx.save();

        ctx.globalAlpha = 0.25 + 0.75 * edge;
        ctx.translate(here.x, here.y);
        ctx.rotate(angle);

        const scale = 1.15 * (0.6 + 0.4 * edge);

        ctx.scale(scale, scale);
        ctx.translate(-11, -11);

        ctx.fillStyle = NAVY;
        ctx.strokeStyle = "#f6f8fb";
        ctx.lineWidth = 0.9;

        ctx.fill(planePath);
        ctx.stroke(planePath);

        ctx.restore();
      }
    };

    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, [size, reduceMotion]);

  /* ---------- Configure the globe ---------- */

  const onReady = () => {
    const globe = globeRef.current;

    if (!globe) return;

    /*
     * Guard against versions or wrappers where controls()
     * is not exposed as a callable method.
     */
    const controlsMethod = (
      globe as unknown as {
        controls?: () => GlobeControls;
      }
    ).controls;

    let controls: GlobeControls | undefined;

    if (typeof controlsMethod === "function") {
      controls = controlsMethod.call(globe);
    }

    if (controls) {
      controls.autoRotate = false;
      controls.autoRotateSpeed = SPIN_SPEED;
      controls.enableZoom = false;
    }

    globe.pointOfView(
      {
        ...START_VIEW,
        altitude: CAMERA_ALTITUDE,
      },
      0
    );

    if (!reduceMotion && controls) {
      if (spinTimer.current !== undefined) {
        window.clearTimeout(spinTimer.current);
      }

      spinTimer.current = window.setTimeout(() => {
        controls.autoRotate = true;
      }, SPIN_DELAY_MS);
    }
  };

  /* ---------- Render ---------- */

  return (
    <div
      ref={wrapRef}
      className="pointer-events-auto relative h-full w-full cursor-grab active:cursor-grabbing"
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
          pointLat={(d: object) =>
            (d as LandPoint).lat
          }
          pointLng={(d: object) =>
            (d as LandPoint).lng
          }
          pointColor={() => LAND_DOT}
          pointRadius={0.22}
          pointAltitude={0.006}
          pointResolution={5}
          pointsMerge
          /* Pulsing rings */
          ringsData={reduceMotion ? [] : rings}
          ringLat={(d: object) =>
            (d as Ring).lat
          }
          ringLng={(d: object) =>
            (d as Ring).lng
          }
          ringColor={(d: object) => (t: number) =>
            `rgba(${(d as Ring).color},${1 - t})`
          }
          ringMaxRadius={3.2}
          ringPropagationSpeed={1.4}
          ringRepeatPeriod={1900}
          /* Country labels */
          labelsData={labels}
          labelLat={(d: object) =>
            (d as Label).lat
          }
          labelLng={(d: object) =>
            (d as Label).lng
          }
          labelText={(d: object) =>
            (d as Label).text
          }
          labelColor={() => NAVY}
          labelSize={0.9}
          labelDotRadius={0.35}
          labelResolution={2}
          labelAltitude={0.012}
          onGlobeReady={onReady}
        />
      )}

      {/* The overlay canvas draws animated flights above the globe. */}
      <canvas
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
    </div>
  );
}
