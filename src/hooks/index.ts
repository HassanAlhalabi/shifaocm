import { useMemo } from "react";

import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { GENDER } from "../helpers/enum";

export const useAppRouter = (route: RoutePath) => {
  return useRoute<RouteProp<RootStackParamList, route>>();
};

export const useAppNavigation = () =>
  useNavigation<NavigationProp<RootStackParamList>>();

export const useAgeLabels = (childAge: number) => {
  const labels = useMemo(() => {
    const ages = new Set([1, 2, 3, 4, 8, 10, 11, 12, 14, 16, 18, childAge]);
    const filteredUniqAges = [...Array.from(ages)].sort((a, b) =>
      a > b ? a : -1
    );

    return filteredUniqAges.map((age) => `${age}`);
  }, [childAge]);
  const childAgeIndex = labels.indexOf(`${childAge}`);
  return { labels, childAgeIndex };
};

export const useFakeLabels = (pointIndex: number, childAttribute: number) => {
  const fakePoints = [];
  fakePoints[pointIndex] = childAttribute;
  fakePoints.fill(0, 0, pointIndex);
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
  };
  weight: {
    childWeight: number;
    age: number;
  };
};
