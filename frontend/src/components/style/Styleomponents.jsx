import { styled } from "@mui/material";
import { Link as LinkNavigate } from "react-router-dom";

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  right: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export const Link = styled(LinkNavigate)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 1rem;
  border-radius: 1.5rem;
  background-color: white;
`;
export const SearchField = styled("input")`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  border-radius: 1.5rem;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
export const CurveButton = styled("button")`
  width: 20%;
  height: 4rem;
  border-radius: 1.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.5rem;
  color: #fff;
`;
