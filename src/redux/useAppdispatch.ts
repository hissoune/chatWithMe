import { useDispatch } from "react-redux";
import { AppDispatch } from "./strore";
import { useCallback } from "react";

export default function useAppDispatch() {
  const dispatch = useDispatch<AppDispatch>();
  return useCallback(dispatch, [dispatch]);
}