import { InputHTMLAttributes } from "react";
import { UseControllerProps } from "react-hook-form";
import { IMaskMixinProps } from "react-imask/dist/mixin";

type FormSchema = ({
  name: string;
  type: "text" | "select";
  placeholder: string;
  options?: { value: string | number; label: string }[];
} & UseControllerProps &
  Partial<IMaskMixinProps>)[];
