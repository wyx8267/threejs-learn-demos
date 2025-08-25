import { create } from "zustand";
import data from "./house2";

interface Wall {
  position: {
    x: number;
    y: number;
    z: number;
  };
  width: number;
  height: number;
  depth: number;
  rotationY?: number;
  normal: {
    x: number;
    y: number;
    z: number;
  };
  windows?: Array<{
    leftBottomPosition: {
      left: number;
      bottom: number;
    };
    width: number;
    height: number;
  }>;
  doors?: Array<{
    leftBottomPosition: {
      left: number;
      bottom: number;
    };
    width: number;
    height: number;
  }>;
}

interface Floor {
  points: Array<{
    x: number;
    z: number;
  }>;
  textureUrl?: string;
}

interface Ceiling {
  points: Array<{
    x: number;
    z: number;
  }>;
  height: number;
}

export interface State {
  data: {
    walls: Array<Wall>;
    floors: Array<Floor>;
    ceilings: Array<Ceiling>;
  };
}

const useHouseStore = create<State>((set, get) => {
  return {
    data
  };
});

export { useHouseStore };
