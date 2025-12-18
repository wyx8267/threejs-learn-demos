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
  name?: string;
  size?: number;
}

interface Ceiling {
  points: Array<{
    x: number;
    z: number;
  }>;
  height: number;
}

interface Furniture {
  modelUrl: string,
  position: {
    x: number,
    y: number,
    z: number
  },
  rotation: {
    x: number,
    y: number,
    z: number
  },
}

export interface State {
  data: {
    walls: Array<Wall>,
    floors: Array<Floor>,
    ceilings: Array<Ceiling>,
    furnitures: Array<Furniture>
  };
}

export interface Action {
  setData(data: State['data']): void;
}

const useHouseStore = create<State & Action>((set, get) => {
  return {
    data,
    setData(data) {
      set(state => {
        return {
          ...state,
          data
        }
      })
    }
  };
});

export { useHouseStore };
