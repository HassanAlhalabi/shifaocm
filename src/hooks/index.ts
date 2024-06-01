import { useMemo } from "react";

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { GENDER } from "../helpers/enum";
import data from "../../data.json";
import { sortNumbersAsc } from "../helpers";

export const useAppRouter = (route: RoutePath) => {
  return useRoute<RouteProp<RootStackParamList, route>>();
};

export const useAppNavigation = () =>
  useNavigation<NavigationProp<RootStackParamList>>();

export const useAgeLabels = (childAge: number) => {
  let isNewLabel = false;
  const labels = useMemo(() => {
    const ages = new Set([
      2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ]);
    if (ages.has(childAge)) {
      return [...Array.from(ages)].map((age) => `${age}`);
    }
    isNewLabel = true;
    ages.add(childAge);
    const filteredUniqAges = [...Array.from(ages)].sort((a, b) =>
      a > b ? a : -1
    );

    return filteredUniqAges.map((age) => `${age}`);
  }, [childAge]);
  const childAgeIndex = labels.indexOf(`${childAge}`);
  return { labels, childAgeIndex, isNewLabel };
};

export const useHeightData = (
  gender: GENDER,
  pointIndex: number,
  isNewValue: boolean
) => {
  const genderName = gender === GENDER.MALE ? "male" : "female";

  const minHeights = useMemo(() => {
    const heightData = data.height[genderName].min;

    let newMinHeight = null;
    if (isNewValue) {
      newMinHeight =
        (Number(heightData[pointIndex - 1]) + Number(heightData[pointIndex])) /
        2;
    }

    const filteredUniqueMinHeights = [...Array.from(heightData), newMinHeight]
      .filter((height) => height)
      .sort(sortNumbersAsc);

    return filteredUniqueMinHeights;
  }, [pointIndex, gender]);

  const avgHeights = useMemo(() => {
    const heightData = data.height[genderName].avg;

    let newAvgHeight = null;
    if (isNewValue) {
      newAvgHeight =
        (Number(heightData[pointIndex - 1]) + Number(heightData[pointIndex])) /
        2;
    }

    const filteredUniqueAvgHeights = [...Array.from(heightData), newAvgHeight]
      .filter((height) => height)
      .sort(sortNumbersAsc);

    return filteredUniqueAvgHeights;
  }, [pointIndex, gender]);

  const maxHeights = useMemo(() => {
    const heightData = data.height[genderName].max;

    let newMaxHeight = null;
    if (isNewValue) {
      newMaxHeight =
        (Number(heightData[pointIndex - 1]) + Number(heightData[pointIndex])) /
        2;
    }

    const filteredUniqueMaxHeights = [...Array.from(heightData), newMaxHeight]
      .filter((height) => height)
      .sort(sortNumbersAsc);

    return filteredUniqueMaxHeights;
  }, [pointIndex, gender]);

  return { minHeights, maxHeights, avgHeights };
};

export const useWeightData = (
  gender: GENDER,
  pointIndex: number,
  isNewValue: boolean
) => {
  const genderName = gender === GENDER.MALE ? "male" : "female";

  const minWeights = useMemo(() => {
    const weightData = data.weight[genderName].min;

    let newMinWeight = null;
    if (isNewValue) {
      newMinWeight =
        (Number(weightData[pointIndex - 1]) + Number(weightData[pointIndex])) /
        2;
    }

    const filteredUniqueMinWeights = [...Array.from(weightData), newMinWeight]
      .filter((weight) => weight)
      .sort(sortNumbersAsc);

    return filteredUniqueMinWeights;
  }, [pointIndex, gender]);

  const avgWeights = useMemo(() => {
    const weightData = data.weight[genderName].avg;

    let newAvgWeight = null;
    if (isNewValue) {
      newAvgWeight =
        (Number(weightData[pointIndex - 1]) + Number(weightData[pointIndex])) /
        2;
    }

    const filteredUniqueAvgWeights = [...Array.from(weightData), newAvgWeight]
      .filter((weight) => weight)
      .sort(sortNumbersAsc);

    return filteredUniqueAvgWeights;
  }, [pointIndex, gender]);

  const maxWeights = useMemo(() => {
    const weightData = data.weight[genderName].max;

    let newMaxWeight = null;
    if (isNewValue) {
      newMaxWeight =
        (Number(weightData[pointIndex - 1]) + Number(weightData[pointIndex])) /
        2;
    }

    const filteredUniqueMaxWeights = [...Array.from(weightData), newMaxWeight]
      .filter((weight) => weight)
      .sort(sortNumbersAsc);

    return filteredUniqueMaxWeights;
  }, [pointIndex, gender]);

  return { minWeights, maxWeights, avgWeights };
};

export const useFakeLabels = (
  pointIndex: number,
  childAttribute: number,
  min: number
) => {
  const fakePoints = [];
  fakePoints[pointIndex] = childAttribute;
  fakePoints.fill(min, 0, pointIndex);
  return fakePoints;
};

export type RoutePath = keyof RootStackParamList;

export type RootStackParamList = {
  Home: undefined;
  ChildForm: undefined;
  Results: {
    futureHeight: number;
    childHeight: number;
    childWeight: number;
    age: number;
    gender: GENDER;
  };
  height: {
    childHeight: number;
    age: number;
    gender: GENDER;
  };
  weight: {
    childWeight: number;
    age: number;
    gender: GENDER;
  };
};
