import type { Map } from "mapbox-gl";
import type { InjectionKey } from "vue";

export const mapKey = Symbol() as InjectionKey<Map>;
