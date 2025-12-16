import { mapKey } from "@/lib/map";
import { inject } from "vue";

const useMap = () => {
  const map = inject(mapKey);

  if (!map) {
    throw new Error("useMap must be used within a MapProvider");
  }

  return map;
};

export default useMap;
