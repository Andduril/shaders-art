"use client";

import "@/materials/bubbles.material";

import { BubblesShaderMaterial } from "@/materials/bubbles.material";
import { ComponentPropsWithoutRef, RefObject } from "react";
import CustomMaterial, { ShaderCompiledEvent } from "./CustomMaterial";

type BubblesMaterialProps =
  ComponentPropsWithoutRef<"bubblesShaderMaterial"> & {
    onCompiled?: (e: ShaderCompiledEvent) => void;
    ref: RefObject<InstanceType<typeof BubblesShaderMaterial> | null>;
  };

const BubblesMaterial = ({
  ref,
  onCompiled,
  ...props
}: BubblesMaterialProps) => {
  return (
    <CustomMaterial materialRef={ref} onCompiled={onCompiled}>
      <bubblesShaderMaterial ref={ref} {...props} />
    </CustomMaterial>
  );
};

export default BubblesMaterial;
