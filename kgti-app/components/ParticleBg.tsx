"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticleBg() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={
        {
          fullScreen: false,
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: ["#00d4ff", "#a855f7", "#ffd700", "#ff2d95"] },
            links: {
              color: "#00d4ff",
              distance: 150,
              enable: true,
              opacity: 0.08,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "bounce" },
            },
            number: {
              density: { enable: true, area: 900 },
              value: 40,
            },
            opacity: {
              value: { min: 0.1, max: 0.5 },
              animation: {
                enable: true,
                speed: 0.5,
                sync: false,
              },
            },
            shape: { type: "circle" },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: false },
            },
            modes: {
              grab: { distance: 200, links: { opacity: 0.15 } },
            },
          },
        } as ISourceOptions
      }
    />
  );
}
