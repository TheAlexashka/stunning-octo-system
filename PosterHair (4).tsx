import { LINDEN_FEMALE_HAIRSTYLES, LINDEN_WAVE_HAIRSTYLES, LINDEN_WAVE2_HAIRSTYLES, LINDEN_WOMENS_DESIGNS, LINDEN_WOMENS_HAIR_LABELS, isLindenFemaleHair } from './catalog';
import { mirrorCurl, resolvePosterCurl } from './engine';

export interface WaveCheck { name: string; passed: boolean }

/** Pure collection checks; visual/native-head tests are also required. */
export function checkLindenWomen(): WaveCheck[] {
  const ids = LINDEN_FEMALE_HAIRSTYLES;
  const designs = ids.map(id => LINDEN_WOMENS_DESIGNS[id]);
  const surfaces = designs.flatMap(d => [...d.front, ...d.back]);
  const coils = surfaces.flatMap(s => s.coils ?? []);
  const bad = (d: string) => !d || /NaN|Infinity|undefined/.test(d);
  return [
    { name: '13 selected variants: WAVE 3 + WAVE2 10', passed: ids.length === 13 && LINDEN_WAVE_HAIRSTYLES.length === 3 && LINDEN_WAVE2_HAIRSTYLES.length === 10 },
    { name: 'all permanent IDs unique and hair-only', passed: new Set(ids).size === 13 && ids.every(id => id.startsWith('hair-poster-')) },
    { name: 'both teddy-bob and sculpted-sleek variants retained', passed: ['hair-poster-1938-teddy-bob', 'hair-poster-1940-sculpted-sleek'].every(id => !!LINDEN_WOMENS_DESIGNS[id] && !!LINDEN_WOMENS_DESIGNS[`${id}-wave`] && LINDEN_WOMENS_DESIGNS[id].front[0].d !== LINDEN_WOMENS_DESIGNS[`${id}-wave`].front[0].d) },
    { name: 'front and back artwork for every variant', passed: designs.every(d => d.front.length > 0 && d.back.length > 0 && d.front[0].d && d.back[0].d) },
    { name: 'finite static contours and local transforms', passed: surfaces.every(s => (!s.d || !bad(s.d)) && (!s.transform || !/NaN|Infinity|undefined/.test(s.transform))) },
    { name: 'curl generator finite at every extreme', passed: coils.every(c => [60,100,150].every(t => [70,100,140].every(v => { const p = resolvePosterCurl(c,t,v); return [p.body,p.groove,p.shade,p.sheen,...p.strands].every(d => !bad(d)); }))) },
    { name: 'double mirroring restores the curl', passed: coils.every(c => { const d = mirrorCurl(mirrorCurl(c)); return Math.abs(d.x-c.x)<1e-8 && d.y===c.y && (d.rotation??0)===(c.rotation??0) && !!d.mirrored===!!c.mirrored; }) },
    { name: 'curl generation deterministic', passed: coils.every(c => JSON.stringify(resolvePosterCurl(c)) === JSON.stringify(resolvePosterCurl(c))) },
    { name: 'both version labels explicit', passed: ['hair-poster-1938-teddy-bob', 'hair-poster-1940-sculpted-sleek'].every(id => LINDEN_WOMENS_HAIR_LABELS[id as typeof ids[number]].endsWith('WAVE2') && LINDEN_WOMENS_HAIR_LABELS[`${id}-wave` as typeof ids[number]].endsWith('WAVE')) },
    { name: 'unselected hairstyles are not registered', passed: ['hair-poster-1937-crescent-bob','hair-poster-1939-cossack-curls','hair-poster-1939-quill-waves','hair-poster-1939-snood-rolls','hair-poster-1938-braided-coils'].every(id => !isLindenFemaleHair(id)) },
  ];
}
