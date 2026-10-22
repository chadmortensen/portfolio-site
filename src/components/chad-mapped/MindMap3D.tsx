import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import type { MapNode } from "./types";
import { ERAS } from "./groups";
import { MAP_3D } from "./map3d.config";

export type MindMap3DHandle = { zoom: (factor: number) => void; reset: () => void };

type Props = {
  nodes: MapNode[];
  themes: string[];
  selected: string | null;
  group: string | null;
  focus: Set<string> | null;
  onSelect: (id: string | null) => void;
  onGroup: (key: string) => void;
  onClear: () => void;
};

type Point = { x: number; y: number; z: number; vx: number; vy: number; vz: number; fixed: boolean };
type Edge = [string, string];

// Colors and sizes come from map3d.config.ts.
const INK = new THREE.Color(MAP_3D.stories.focusedColor);
const NODE = new THREE.Color(MAP_3D.stories.color);
const LINE = new THREE.Color().setHSL(0, 0, 0.8);
const EDGE = new THREE.Color(MAP_3D.links.color);
const ACCENT = new THREE.Color(MAP_3D.accent);
const HOME_DISTANCE = MAP_3D.camera.distance;
const HORIZONTAL = MAP_3D.shape === "horizontal";
const yearToY = (year: number) => (year - 2010) * 10;
const HOME_TARGET = HORIZONTAL ? new THREE.Vector3(0, 10, 0) : new THREE.Vector3(0, -10, 0);
const HOME_CAMERA = HORIZONTAL ? new THREE.Vector3(0, 90, HOME_DISTANCE) : new THREE.Vector3(0, 30, HOME_DISTANCE);

const roleX = (start: number, i: number) =>
  MAP_3D.spacing === "even" ? (i - (ERAS.length - 1) / 2) * MAP_3D.roleGap : (start - 2010) * MAP_3D.yearSpacing;

/** Where each role sits on the thread: left to right by year, or up a helix. */
const rolePoint = (start: number, i: number): number[] => {
  if (HORIZONTAL) return [roleX(start, i), 0, Math.sin(i * 1.3) * MAP_3D.wave];
  const a = i * 0.95 + 0.4;
  return [Math.cos(a) * 100, yearToY(start), Math.sin(a) * 100];
};

/** Roles sit on the thread; stories branch off their roles and themes settle around them. */
function layout(nodes: MapNode[], themes: string[]) {
  let seed = 7;
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const points = new Map<string, Point>();
  const add = (id: string, [x, y, z]: number[], fixed = false) => points.set(id, { x, y, z, vx: 0, vy: 0, vz: 0, fixed });
  add("center", [0, 0, 0], true);
  ERAS.forEach((era, i) => add(`era:${era.key}`, rolePoint(era.start, i), true));
  const usedThemes = themes.filter((t) => nodes.some((n) => n.themes.includes(t)));
  usedThemes.forEach((theme, i) => {
    const a = (i / usedThemes.length) * Math.PI * 2;
    if (!HORIZONTAL) return add(`theme:${theme}`, [Math.cos(a) * 200, (random() - 0.5) * 80, Math.sin(a) * 200]);
    // Themes start above and below the thread, near the years their stories come from.
    const spots = nodes.filter((n) => n.themes.includes(theme)).flatMap((n) => ERAS.flatMap((e, j) => (n.companies.includes(e.key) ? [roleX(e.start, j)] : [])));
    const x = spots.length ? spots.reduce((a, b) => a + b, 0) / spots.length : 0;
    const anchor = [x, Math.cos(a) * MAP_3D.spread.theme, Math.sin(a) * MAP_3D.spread.theme * 0.6];
    add(`anchor:${theme}`, anchor, true);
    add(`theme:${theme}`, anchor);
  });
  nodes.forEach((n) => add(n.id, [(random() - 0.5) * 200, (random() - 0.5) * 200, (random() - 0.5) * 200]));

  const springs: [string, string, number, number][] = [];
  const edges: Edge[] = [];
  const ids = new Set(nodes.map((n) => n.id));
  nodes.forEach((n) => {
    const eras = n.companies.filter((c) => points.has(`era:${c}`));
    (eras.length ? eras.map((c) => `era:${c}`) : ["center"]).forEach((target) => {
      springs.push([n.id, target, 0.03, MAP_3D.spread.story]);
      if (target !== "center") edges.push([n.id, target]);
    });
    n.themes.forEach((t, i) => {
      if (!points.has(`theme:${t}`)) return;
      springs.push([n.id, `theme:${t}`, i ? 0.008 : 0.02, 40]);
      edges.push([n.id, `theme:${t}`]);
    });
    n.related.forEach((r) => {
      if (!ids.has(r) || r < n.id) return;
      springs.push([n.id, r, 0.004, 60]);
      edges.push([n.id, r]);
    });
  });
  usedThemes.forEach((t) =>
    springs.push(HORIZONTAL ? [`theme:${t}`, `anchor:${t}`, 0.01, 0] : [`theme:${t}`, "center", 0.004, MAP_3D.spread.theme]),
  );

  const list = [...points.values()];
  for (let step = 0; step < 420; step++) {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const a = list[i];
        const b = list[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        const d2 = dx * dx + dy * dy + dz * dz + 25;
        const f = 900 / d2 / Math.sqrt(d2);
        a.vx += dx * f; a.vy += dy * f; a.vz += dz * f;
        b.vx -= dx * f; b.vy -= dy * f; b.vz -= dz * f;
      }
    }
    for (const [s, t, k, rest] of springs) {
      const a = points.get(s)!;
      const b = points.get(t)!;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dz = b.z - a.z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
      const f = (k * (d - rest)) / d;
      a.vx += dx * f; a.vy += dy * f; a.vz += dz * f;
      b.vx -= dx * f; b.vy -= dy * f; b.vz -= dz * f;
    }
    for (const p of list) {
      if (p.fixed) { p.vx = p.vy = p.vz = 0; continue; }
      p.vx *= 0.6; p.vy *= 0.6; p.vz *= 0.6;
      p.x += p.vx; p.y += p.vy; p.z += p.vz;
    }
  }
  return { points, edges, usedThemes };
}

const label = (className: string, text: string, sub?: string) => {
  const el = document.createElement("div");
  el.className = className;
  el.textContent = text;
  if (sub) {
    const small = document.createElement("small");
    small.textContent = sub;
    el.appendChild(small);
  }
  return el;
};

const MindMap3D = forwardRef<MindMap3DHandle, Props>(function MindMap3D({ nodes, themes, selected, group, focus, onSelect, onGroup, onClear }, ref) {
  const hostRef = useRef<HTMLDivElement>(null);
  const { points, edges, usedThemes } = useMemo(() => layout(nodes, themes), [nodes, themes]);
  const handlers = useRef({ onSelect, onGroup, onClear, selected });
  handlers.current = { onSelect, onGroup, onClear, selected };
  const scene = useRef<{
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    spheres: Map<string, THREE.Mesh<THREE.SphereGeometry, THREE.MeshLambertMaterial>>;
    nodeLabels: Map<string, HTMLElement>;
    themeLabels: Map<string, HTMLElement>;
    eraLabels: Map<string, HTMLElement>;
    baseLines: THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial>;
    focusLines: THREE.LineSegments<THREE.BufferGeometry, THREE.LineBasicMaterial>;
  } | null>(null);
  // What the animation loop eases toward: the branch in focus, and where the camera frames it.
  const goal = useRef<{ selected: string | null; focus: Set<string> | null; frame: { target: THREE.Vector3; distance: number } | null; eras: Set<string> }>({ selected: null, focus: null, frame: null, eras: new Set() });

  useImperativeHandle(ref, () => ({
    zoom(factor) {
      const s = scene.current;
      if (!s) return;
      const offset = s.camera.position.clone().sub(s.controls.target);
      offset.setLength(Math.min(1400, Math.max(160, offset.length() * factor)));
      s.camera.position.copy(s.controls.target).add(offset);
    },
    reset() {
      const s = scene.current;
      if (!s) return;
      s.controls.target.copy(HOME_TARGET);
      s.camera.position.copy(HOME_CAMERA);
    },
  }));

  useEffect(() => {
    const host = hostRef.current!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);
    const labels = new CSS2DRenderer();
    labels.domElement.className = "cm-3d-labels";
    host.appendChild(labels.domElement);

    const world = new THREE.Scene();
    world.add(new THREE.AmbientLight(0xffffff, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(200, 300, 400);
    world.add(sun);
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 5000);
    camera.position.copy(HOME_CAMERA);
    const controls = new OrbitControls(camera, labels.domElement);
    controls.target.copy(HOME_TARGET);
    controls.enableDamping = true;
    controls.autoRotate = MAP_3D.autoRotate && !reduceMotion;
    controls.autoRotateSpeed = 0.5;
    controls.minDistance = 160;
    controls.maxDistance = 1400;
    let rotate = MAP_3D.autoRotate && !reduceMotion;
    let flying: { target: THREE.Vector3; distance: number } | null = null;
    controls.addEventListener("start", () => {
      rotate = false;
      flying = null;
    });
    const ease = reduceMotion ? 1 : 0.12;

    const at = (id: string) => {
      const p = points.get(id)!;
      return new THREE.Vector3(p.x, p.y, p.z);
    };

    // dashed year line, for the helix shape
    const showAxis = MAP_3D.showYearAxis && !HORIZONTAL;
    const axis = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, yearToY(1993), 0), new THREE.Vector3(0, yearToY(2027), 0)]),
      new THREE.LineDashedMaterial({ color: LINE, dashSize: 4, gapSize: 4 }),
    );
    axis.computeLineDistances();
    world.add(axis);
    axis.material.transparent = true;
    axis.visible = showAxis;
    (showAxis ? [1995, 2005, 2015, 2025] : []).forEach((year) => {
      const tick = new CSS2DObject(label("cm-3d-year", String(year)));
      tick.position.set(0, yearToY(year), 0);
      world.add(tick);
    });
    const helix = new THREE.CatmullRomCurve3(ERAS.map((e) => at(`era:${e.key}`)));
    // The roles thread: a solid tube so it reads as the spine of the map.
    const thread = new THREE.Mesh(new THREE.TubeGeometry(helix, 240, MAP_3D.thread.thickness, 8, false), new THREE.MeshLambertMaterial({ color: MAP_3D.thread.color, transparent: true }));
    world.add(thread);

    const sphereGeometry = new THREE.SphereGeometry(1, 20, 14);
    const spheres = new Map<string, THREE.Mesh<THREE.SphereGeometry, THREE.MeshLambertMaterial>>();
    const eraLabels = new Map<string, HTMLElement>();
    const eraMeshes = new Map<string, THREE.Mesh<THREE.SphereGeometry, THREE.MeshLambertMaterial>>();
    ERAS.forEach((era) => {
      const mesh = new THREE.Mesh(sphereGeometry, new THREE.MeshLambertMaterial({ color: MAP_3D.roles.color, transparent: true }));
      mesh.scale.setScalar(MAP_3D.roles.size);
      mesh.position.copy(at(`era:${era.key}`));
      world.add(mesh);
      eraMeshes.set(era.key, mesh);
      const el = label("cm-3d-era", era.label, era.years);
      const obj = new CSS2DObject(el);
      obj.position.copy(mesh.position).add(new THREE.Vector3(0, -14, 0));
      world.add(obj);
      eraLabels.set(era.key, el);
    });
    const themeLabels = new Map<string, HTMLElement>();
    usedThemes.forEach((theme) => {
      const el = label("cm-3d-theme", theme);
      el.setAttribute("role", "button");
      el.tabIndex = 0;
      el.dataset.theme = theme;
      el.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && handlers.current.onGroup(theme));
      const obj = new CSS2DObject(el);
      obj.position.copy(at(`theme:${theme}`));
      world.add(obj);
      themeLabels.set(theme, el);
    });
    const nodeLabels = new Map<string, HTMLElement>();
    const labelObjects = new Map<string, CSS2DObject>();
    nodes.forEach((n) => {
      const mesh = new THREE.Mesh(sphereGeometry, new THREE.MeshLambertMaterial({ color: NODE, transparent: true }));
      mesh.scale.setScalar(MAP_3D.stories.size);
      mesh.position.copy(at(n.id));
      mesh.userData.id = n.id;
      world.add(mesh);
      spheres.set(n.id, mesh);
      const el = label("cm-3d-label", n.title.length > 42 ? `${n.title.slice(0, 41).trimEnd()}…` : n.title);
      const obj = new CSS2DObject(el);
      obj.position.copy(mesh.position).add(new THREE.Vector3(0, 9, 0));
      world.add(obj);
      nodeLabels.set(n.id, el);
      labelObjects.set(n.id, obj);
    });

    const segments = (list: Edge[]) => new THREE.BufferGeometry().setFromPoints(list.flatMap(([a, b]) => [at(a), at(b)]));
    const baseLines = new THREE.LineSegments(segments(edges), new THREE.LineBasicMaterial({ color: EDGE, transparent: true, opacity: MAP_3D.links.opacity }));
    const focusLines = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.8 }));
    world.add(baseLines, focusLines);
    scene.current = { camera, controls, spheres, nodeLabels, themeLabels, eraLabels, baseLines, focusLines };

    // Shift the scene left when the details card takes the right side of a wide screen.
    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      labels.setSize(w, h);
      camera.aspect = w / h;
      if (w > 1100) camera.setViewOffset(w, h, 200, 0, w, h);
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    // A click (not a drag) selects a story, or clears the selection on empty space.
    const raycaster = new THREE.Raycaster();
    let down: { x: number; y: number } | null = null;
    const onDown = (e: PointerEvent) => (down = { x: e.clientX, y: e.clientY });
    const onUp = (e: PointerEvent) => {
      if (!down || Math.abs(e.clientX - down.x) + Math.abs(e.clientY - down.y) > 5) return;
      down = null;
      // Orbit controls capture the pointer, so find the theme pill under it by position.
      const pill = document.elementsFromPoint(e.clientX, e.clientY).find((el) => el instanceof HTMLElement && el.dataset.theme) as HTMLElement | undefined;
      if (pill && !pill.classList.contains("is-dim")) return handlers.current.onGroup(pill.dataset.theme!);
      const rect = renderer.domElement.getBoundingClientRect();
      const pointer = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects([...spheres.values()].filter((m) => m.visible))[0];
      const id = hit?.object.userData.id as string | undefined;
      if (id) handlers.current.onSelect(handlers.current.selected === id ? null : id);
      else handlers.current.onClear();
    };
    const onMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const pointer = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const id = raycaster.intersectObjects([...spheres.values()].filter((m) => m.visible))[0]?.object.userData.id as string | undefined;
      labels.domElement.style.cursor = id ? "pointer" : "grab";
      nodeLabels.forEach((el, key) => el.classList.toggle("is-hover", key === id));
    };
    labels.domElement.addEventListener("pointerdown", onDown);
    labels.domElement.addEventListener("pointerup", onUp);
    labels.domElement.addEventListener("pointermove", onMove);

    const home = { target: controls.target.clone(), position: camera.position.clone() };
    let framed: object | null = null;
    const desired = new THREE.Vector3();
    const fade = (material: THREE.Material, to: number) => (material.opacity += (to - material.opacity) * ease);
    let frame = 0;
    const tick = () => {
      const { selected: picked, focus: lit, frame: view } = goal.current;
      // Fly to a new branch, or back to where the visitor was before focusing.
      if (view !== framed) {
        if (view && !framed) { home.target.copy(controls.target); home.position.copy(camera.position); }
        flying = view ?? { target: home.target.clone(), distance: home.position.distanceTo(home.target) };
        framed = view;
      }
      controls.autoRotate = rotate && !lit;
      if (flying) {
        controls.target.lerp(flying.target, ease);
        desired.copy(camera.position).sub(controls.target).setLength(flying.distance).add(controls.target);
        camera.position.lerp(desired, ease);
        if (controls.target.distanceTo(flying.target) < 0.5 && Math.abs(camera.position.distanceTo(controls.target) - flying.distance) < 1) flying = null;
      }
      spheres.forEach((mesh, id) => {
        const on = !lit || lit.has(id);
        const { size: base, focusedSize, selectedSize } = MAP_3D.stories;
        const size = id === picked ? selectedSize : lit && on ? focusedSize : base;
        mesh.scale.setScalar(mesh.scale.x + (size - mesh.scale.x) * ease);
        fade(mesh.material, on ? 1 : 0);
        mesh.visible = mesh.material.opacity > 0.02;
        labelObjects.get(id)!.position.copy(mesh.position).add(new THREE.Vector3(0, mesh.scale.x + 5, 0));
      });
      // Outside the focused branch everything fades away, the roles thread included.
      eraMeshes.forEach((mesh, key) => {
        fade(mesh.material, !lit || goal.current.eras.has(key) ? 1 : 0);
        mesh.visible = mesh.material.opacity > 0.02;
      });
      fade(thread.material, lit ? 0 : 1);
      fade(axis.material, lit ? 0 : 1);
      fade(baseLines.material, lit ? 0 : MAP_3D.links.opacity);
      thread.visible = thread.material.opacity > 0.02;
      controls.update();
      renderer.render(world, camera);
      labels.render(world, camera);
      frame = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      world.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
      host.replaceChildren();
      scene.current = null;
    };
  }, [nodes, points, edges, usedThemes]);

  // Selection and filters: light up the focus set, dim the rest.
  useEffect(() => {
    const s = scene.current;
    if (!s) return;
    // Frame the branch: the focused stories plus the selected story's themes and roles.
    const pick = selected ? nodes.find((n) => n.id === selected) : undefined;
    let frame = null;
    if (focus) {
      const ids = [...focus];
      if (group) ids.push(`theme:${group}`);
      if (pick) ids.push(...pick.themes.map((t) => `theme:${t}`), ...pick.companies.map((c) => `era:${c}`));
      const spots = ids.map((id) => points.get(id)).filter(Boolean).map((p) => new THREE.Vector3(p!.x, p!.y, p!.z));
      const box = new THREE.Box3().setFromPoints(spots);
      const sphere = box.getBoundingSphere(new THREE.Sphere());
      frame = { target: sphere.center, distance: Math.min(1100, Math.max(200, sphere.radius * 3)) };
    }
    // The themes and roles that stay in view with the branch.
    const keepThemes = new Set(pick ? pick.themes : group ? [group] : []);
    const keepEras = new Set(pick ? pick.companies : group && ERAS.some((e) => e.key === group) ? [group] : nodes.filter((n) => focus?.has(n.id)).flatMap((n) => n.companies));
    goal.current = { selected, focus, frame, eras: keepEras };
    hostRef.current?.classList.toggle("is-focus", Boolean(focus));
    s.spheres.forEach((mesh, id) => mesh.material.color.copy(id === selected ? ACCENT : focus?.has(id) ? INK : NODE));
    const showAll = focus && focus.size <= 14;
    s.nodeLabels.forEach((el, id) => {
      el.classList.toggle("is-on", Boolean(id === selected || (showAll && focus.has(id))));
      el.classList.toggle("is-sel", id === selected);
    });
    s.themeLabels.forEach((el, theme) => {
      el.classList.toggle("is-on", theme === group);
      el.classList.toggle("is-dim", Boolean(focus && !keepThemes.has(theme)));
    });
    s.eraLabels.forEach((el, key) => el.classList.toggle("is-dim", Boolean(focus && !keepEras.has(key))));
    // Only lines whose both ends stay in view, so nothing trails off into faded space.
    const shown = (id: string) =>
      Boolean(focus?.has(id)) || (id.startsWith("theme:") && keepThemes.has(id.slice(6))) || (id.startsWith("era:") && keepEras.has(id.slice(4)));
    const lit = focus ? edges.filter(([a, b]) => (selected ? a === selected || b === selected : focus.has(a) || focus.has(b)) && shown(a) && shown(b)) : [];
    s.focusLines.geometry.dispose();
    s.focusLines.geometry = new THREE.BufferGeometry().setFromPoints(
      lit.flatMap(([a, b]) => [a, b].map((id) => { const p = points.get(id)!; return new THREE.Vector3(p.x, p.y, p.z); })),
    );
  }, [focus, selected, group, nodes, edges, points]);

  return <div ref={hostRef} className="cm-3d" aria-label="3D map of career eras, themes and stories" role="group" />;
});

export default MindMap3D;
